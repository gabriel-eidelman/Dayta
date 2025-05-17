import { JournalSuggestion } from "@/components/JournalingSuggestions"
import { useAppContext } from "@/contexts/AppContext";   
import { ButtonState } from "@/Types/ActivityTypes";
import uuid from 'react-native-uuid';
import { Activity } from "@/Types/ActivityTypes";

  const addActivityFromSuggestion = (suggestion: JournalSuggestion, addActivity: (activity: Activity) => void) => {
    // suggestion MUST have a time block and a text property. the rest is optional (e.g. media, tags, etc.)
    const buttonState: ButtonState = {
      text: suggestion.text,
      tags: [],
      pressed: false,
      keywords: [suggestion.text],
    }
    if(suggestion.timeblock) {
        console.log("Time block: ", suggestion.timeblock)
    console.log("Start time: ", suggestion.timeblock.startTime)
    console.log("Duration: ", suggestion.timeblock.duration)
    console.log("End time: ", suggestion.timeblock.endTime)
    const block = {
      startTime: suggestion.timeblock.startTime,
      duration: suggestion.timeblock.duration,
      endTime: suggestion.timeblock.endTime,
    };
        const activity: Activity = {id: uuid.v4() as string, button: buttonState, timeBlock: block}
        addActivity(activity);
    }
  }

  export default addActivityFromSuggestion;