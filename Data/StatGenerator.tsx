import getAllActivitiesForUser from '@/Data/GetAllActivities'
import {useEffect, useState} from 'react'
import {useAuth} from '@/contexts/AuthContext'
import { useAppContext } from '@/contexts/AppContext'
import {ButtonState, ActivitySummary, Activity} from '@/Types/ActivityTypes'
import getFiltered from './HandleTime'
import { act } from 'react-test-renderer'
import { DateTime } from 'luxon'
import { normalize } from '@rneui/themed'
import FetchDayActivities from './FetchDayActivities'

interface ValueCounts {
  [key: string]: number;
}

const countValues = (array: string[]): ValueCounts => {
  return array.reduce((acc: ValueCounts, value: string) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
};

function StatGenerator() {
  const {customActivities, justActivities = [], updateState, setFinalArray, state, dateIncrement} = useAppContext();
  const {user} = useAuth();
  const [todayActs, setTodayActs] = useState<Activity[]>([])
  const {tagDurationSum = []} = state
  const [textKeys, setTextKeys] = useState<string[]>([]);
  const [morningKeys, setMorningKeys] = useState<string[]>([])
  const [afternoonKeys, setAfternoonKeys] = useState<string[]>([])
  const [eveningKeys, setEveningKeys] = useState<string[]>([])

  const getLocalHours = (time: number) => {
    if (!time) return 0;
    const date = new Date(time * 1000);
    return date.getHours();
  }

  const createTODStats = () => {
    const relevantActivities = justActivities.filter(act => act && act.timeBlock?.startTime > 1722988800);
    const morningActs = relevantActivities.filter(act => getLocalHours(act.timeBlock?.startTime) >= 4 && getLocalHours(act.timeBlock?.startTime) < 12);
    const afternoonActs = relevantActivities.filter(act => getLocalHours(act.timeBlock?.startTime) >= 12 && getLocalHours(act.timeBlock?.startTime) < 19);
    const eveningActs = relevantActivities.filter(act => {
      const hr = getLocalHours(act.timeBlock?.startTime);
      return (hr >= 19 && hr < 24) || (hr >= 0 && hr < 4);
    });

    const safeTextMap = (arr: typeof morningActs) => arr.map(a => a?.button?.text || '');

    const morningText = safeTextMap(morningActs);
    const afternoonText = safeTextMap(afternoonActs);
    const eveningText = safeTextMap(eveningActs);

    const sortedKeys = (texts: string[]) => {
      const counts = countValues(texts);
      const entries = Object.entries(counts).sort(([, a], [, b]) => b - a).slice(0, 9);
      return Object.keys(Object.fromEntries(entries));
    }

    setMorningKeys(sortedKeys(morningText));
    setAfternoonKeys(sortedKeys(afternoonText));
    setEveningKeys(sortedKeys(eveningText));
  }

  const createDurationSummary = () => {
    const relevantActivities = justActivities.filter(act => act && act.timeBlock?.startTime > 1722988800 && act.timeBlock?.duration !== undefined && act.button?.text !== "Sleeping");
    const activityText = relevantActivities.map(a => a.button?.text || '');

    const totalTimePerActivity = relevantActivities.reduce<Record<string, number>>((acc, activity) => {
      const key = activity.button?.text || 'Unknown';
      acc[key] = (acc[key] || 0) + (activity.timeBlock?.duration || 0) / 3600;
      return acc;
    }, {});

    const result: ActivitySummary[] = Object.entries(totalTimePerActivity).map(([text, totalDuration]) => ({ text, totalDuration }));
    updateState({ durationSummary: result });

    const entries = Object.entries(countValues(activityText)).sort(([, a], [, b]) => b - a).slice(0, 9);
    setTextKeys(Object.keys(Object.fromEntries(entries)));
  }

  const createTagDurationSum = () => {
    const relevantActs = justActivities.filter(a => a && a.timeBlock?.duration !== undefined && a.button?.text !== "Sleeping");

    const totalDurationPerTag = relevantActs.reduce<Record<string, number>>((acc, act) => {
      const tag = act.button?.tags?.[0];
      const normalized = tag ? tag.trim().toLowerCase() : "null";
      if (normalized !== "null") {
        acc[normalized] = (acc[normalized] || 0) + (act.timeBlock?.duration || 0) / 3600;
      }
      return acc;
    }, {});

    const result: ActivitySummary[] = Object.entries(totalDurationPerTag).map(([text, totalDuration]) => ({ text, totalDuration }));
    updateState({ tagDurationSum: result });
  }

  const createFinalArray = () => {
    let correspondingKeys: string[] = textKeys;
    const hr = new Date().getHours();
    if (hr >= 4 && hr < 12 && morningKeys.length) correspondingKeys = morningKeys;
    else if (hr >= 12 && hr < 19 && afternoonKeys.length) correspondingKeys = afternoonKeys;
    else if ((hr >= 19 || hr < 4) && eveningKeys.length) correspondingKeys = eveningKeys;

    const primaryButtons = customActivities.filter(b => correspondingKeys.includes(b?.text || ''));
    const fillerButtons = customActivities.filter(b => !textKeys.includes(b?.text || '')).slice(0, 9 - primaryButtons.length);
    setFinalArray([...primaryButtons, ...fillerButtons]);
  }

  const createWeekDurationStats = () => {
    const oneWeekAgo = Math.floor(Date.now() / 1000) - 604800;
    const relevant = justActivities.filter(a => a && a.timeBlock?.startTime > oneWeekAgo && a.timeBlock?.duration && a.button?.text !== "Sleeping");

    const totals = relevant.reduce<Record<string, number>>((acc, act) => {
      const key = act.button?.text || 'Unknown';
      acc[key] = (acc[key] || 0) + act.timeBlock.duration / 3600;
      return acc;
    }, {});

    const result: ActivitySummary[] = Object.entries(totals).map(([text, totalDuration]) => ({ text, totalDuration }));
    updateState({ weekDurationSummary: result });
  }

  const createDailyAverageStats = () => {
    const filtered = justActivities.filter(a => a?.timeBlock?.duration && a?.button?.text !== "Sleeping");
    const times = filtered.map(a => a?.timeBlock?.startTime).filter(Boolean);
    if (!times.length) return;

    const minStart = Math.min(...times);
    let maxStart = Math.min(Math.max(...times), Math.floor(Date.now() / 1000));

    const minDate = DateTime.fromSeconds(minStart);
    const maxDate = DateTime.fromSeconds(maxStart);

    let emptyDayCount = 0;
    for (let x = minStart; x < maxStart; x += 86400) {
      if (times.filter(t => t > x && t < x + 86400).length < 2) emptyDayCount++;
    }

    const daySpan = maxDate.startOf('day').diff(minDate.startOf('day'), 'days').days;
    const validDays = Math.max(1, daySpan - emptyDayCount);

    const avg = tagDurationSum.map(item => ({ text: item.text, totalDuration: item.totalDuration / validDays }));
    updateState({ avgTimeByTag: avg });
  }

  const analyzeTodayStats = () => {
    const relevant = todayActs.filter(a => a?.timeBlock?.duration && a?.button?.text !== "Sleeping");

    const totals = relevant.reduce<Record<string, number>>((acc, act) => {
      const tag = act?.button?.tags?.[0];
      const norm = tag ? tag.trim().toLowerCase() : "null";
      if (norm !== "null") {
        acc[norm] = (acc[norm] || 0) + (act.timeBlock?.duration || 0) / 3600;
      }
      return acc;
    }, {});

    const result: ActivitySummary[] = Object.entries(totals).map(([text, totalDuration]) => ({ text, totalDuration }));
    updateState({ todayTagDurationSum: result });
  }

  const createSleepStats = () => {
    const relevant = justActivities.filter(a => a && a.timeBlock?.startTime > 1722988800);
    const allSleep = justActivities.filter(a => a?.button?.text === "Went To Bed");
    const allWake = justActivities.filter(a => a?.button?.text === "Woke Up");

    const sleepTimes = allSleep.map(a => a?.timeBlock?.startTime).filter(Boolean);
    const wakeTimes = allWake.map(a => a?.timeBlock?.startTime).filter(Boolean);

    const sleepHours = sleepTimes.map(t => new Date(t * 1000).getHours());
    const wakeHours = wakeTimes.map(t => new Date(t * 1000).getHours());

    function avg(arr: number[]) {
      const sum = arr.reduce((a, b) => a + (b < 4 ? b + 24 : b), 0);
      let average = sum / arr.length;
      return average > 24 ? average - 24 : average;
    }

    const generateDateArray = () => {
      let stats: any[] = [], durs: [string, number][] = [];
      for (let offset = -12; offset <= 0; offset++) {
        let element = getFiltered(offset);
        const [label,, start, end] = element;

        const sleeps = sleepTimes.filter(t => t > start && t < end);
        const wakes = wakeTimes.filter(t => t > start && t < end);
        const acts = relevant.filter(a => a.timeBlock?.startTime > start && a.timeBlock?.startTime < end && a.timeBlock?.duration);
        const durSum = acts.reduce((sum, a) => sum + (a.timeBlock?.duration || 0), 0);

        stats.push([label, wakes, sleeps]);
        durs.push([label, durSum]);
      }
      return { summaryStats: stats, summaryDurs: durs };
    }

    const { summaryStats, summaryDurs } = generateDateArray();
    const avgSleep = avg(sleepHours);
    const avgWake = avg(wakeHours);
    const totalDur = summaryDurs.reduce((a, [, dur]) => a + dur, 0);
    const avgDur = totalDur / 12;

    updateState({ sleepSum: summaryStats, summaryDurs, avgSleepTime: avgSleep, avgWakeTime: avgWake, avgLoggedTimeDaily: avgDur });
  }

  useEffect(() => {
    if (justActivities?.length) {
      createDurationSummary();
      createWeekDurationStats();
      createTagDurationSum();
      createDailyAverageStats();
    }
  }, [justActivities]);

  useEffect(() => {
    createFinalArray();
  }, [eveningKeys]);

  useEffect(() => {
    if (justActivities?.length) {
      createSleepStats();
    }
  }, []);

  useEffect(() => {
    createTODStats();
  }, [justActivities]);

  useEffect(() => {
    setTimeout(() => {
      if (justActivities && user) {
        FetchDayActivities(user, dateIncrement, justActivities, setTodayActs, true);
      }
    }, 50);
  }, [dateIncrement, justActivities]);

  useEffect(() => {
    if (todayActs?.length) {
      analyzeTodayStats();
    }
  }, [todayActs]);

  return {
    finalArray: useAppContext().finalArray,
    state: useAppContext().state,
  };
}

export { StatGenerator };
