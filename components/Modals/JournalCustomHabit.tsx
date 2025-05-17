import React, {useState, useEffect} from 'react';
import {
  Modal,
  View,
  Text,
  ModalProps,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import TimeModal from './SetTimeModal';
import layout_styles from '@/styles/reusable/layoutStyles';
import font_styles from '@/styles/reusable/typography';
import HabitSearch from '../Custom/HabitSearch';
import styles from '@/styles/journalCustomHabitStyles';
import TimeDropdown from '../TimeHandling/TimeDropdown';
import {createTimeBlock, formatNewTime, generateTimeString} from '@/utils/DateTimeUtils'
import {useAppContext} from '@/contexts/AppContext'
import {useAuth} from '@/contexts/AuthContext'
import FetchDayActivities from '@/Data/FetchDayActivities'
import {ButtonState, Activity, TimeBlock, ActivityWithEnd} from '@/Types/ActivityTypes'
import {Button} from '@rneui/themed'
import uuid from 'react-native-uuid';
import {TimeSelection} from '@/Types/TimeType';

const MultiButton: ButtonState = {text: 'Multi-Activity', iconLibrary: "fontAwesome5", keywords: [], tags: [], icon: "tasks", pressed: false}


interface JournalCustomHabitProps extends ModalProps {
  visible: boolean;
  onClose: () => void;
}

const { height } = Dimensions.get('window');

const JournalCustomHabit: React.FC<JournalCustomHabitProps> = ({ visible, onClose, ...modalProps }) => {

// State Variables
const [showStartTimePicker, setShowStartTimePicker] = useState(false);
const [showEndTimePicker, setShowEndTimePicker] = useState(false);
const [startTime, setStartTime] = useState<TimeSelection>({ hour: '09', minute: '00', period: 'AM' });
const [endTime, setEndTime] = useState<TimeSelection>({ hour: '10', minute: '00', period: 'AM' });
const [hasInitialized, setHasInitialized] = useState(false);
const { addActivity, customActivities, justActivities, dateIncrement, customRoutines, addRoutineActivities} = useAppContext();
const [selectedActivity, setSelectedActivity] = useState<ButtonState | null>(null);
const [multiActivity, setMultiActivity] = useState<ButtonState[] | null>(null);
const {user} = useAuth();
const [dbActivities, setDbActivities] = useState<Activity[]>([]);

const onClick = (text: string) => {
        Keyboard.dismiss();
        const activity = customActivities.find((item: ButtonState) => item.text===text)
          
        if(activity) {
          setSelectedActivity(activity);
        }
  };

  useEffect(() => {
    FetchDayActivities(user, dateIncrement, justActivities, setDbActivities, false)
  }, [hasInitialized, user, justActivities]);

  useEffect(() => {
    if(dbActivities) {

  const filteredWithEnd: ActivityWithEnd[] = dbActivities.filter(
    (act): act is Activity & { timeBlock: { endTime: number } } => act.timeBlock.endTime !== null
  );

  // Sort the filtered activities by endTime
  const sortedActivities = filteredWithEnd.sort(
    (a, b) => (a.timeBlock.endTime || 0) - (b.timeBlock.endTime || 0)
  );
  
    setHasInitialized(false);
  }
  //just by adding dbActivities to the useEffecthook, I am able to 
  }, [hasInitialized, dbActivities]);

    const handleSubmit = (block: TimeBlock) => {

      setTimeout(() => {
        if(selectedActivity) {
        selectedActivity.id="notimportant"
        const activity = {id: uuid.v4() as string, button: selectedActivity as ButtonState, timeBlock: block};
        addActivity(activity);
        }
        else if(multiActivity) {
          let actArray = []
          for(let i=0; i<multiActivity.length; i++) {
          multiActivity[i].id="notimportant"
          actArray[i] = {id: uuid.v4() as string, button: multiActivity[i] as ButtonState, timeBlock: block};
          
          }
          const multiTask = {id: uuid.v4() as string, button: MultiButton as ButtonState, timeBlock: block, Multi: actArray};
          addActivity(multiTask);
        }
        else {
          console.log("no selected activity")
        }
      }, 0);
      setSelectedActivity(null);
      onClose();
    }

  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
      {...modalProps}
    >
    {/* Time Modal Start*/}
    <TimeModal visible={showStartTimePicker} onClose={() => setShowStartTimePicker(false)}>
      <TimeDropdown
        selectedTime={startTime}
        onChange = {setStartTime}
      />
    </TimeModal>
    <TimeModal visible={showEndTimePicker} onClose={() => setShowEndTimePicker(false)}>
      <TimeDropdown
        selectedTime={endTime}
        onChange={setEndTime}
      />
    </TimeModal>
    {/* Time Modal End*/}
    {/* Main Modal */}
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.wrapper}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{flex: 1}}>
            <TouchableWithoutFeedback onPress={() => {setShowStartTimePicker(false); setShowEndTimePicker(false); setSelectedActivity(null); onClose()}}>
              <View style={styles.backdrop} />
            </TouchableWithoutFeedback>

            <View style={styles.overlay}>
              <SafeAreaView>
                {/* Header */}
                <View style={styles.headerRow}>
                  <Pressable onPress={onClose}>
                    <Text style={styles.cancelText}>Cancel</Text>
                  </Pressable>
                  <Text style={font_styles.headerStyle}>Add Habit</Text>
                  <View style={{ width: 60 }} />
                </View>

                {/* Choose Habit */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>{selectedActivity==null ? "Choose a Habit" : selectedActivity.text}</Text>
                  <View style={styles.searchArea}>
                    <HabitSearch onClick={onClick} />
                  </View>
                </View>

                {/* Time Pickers */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Time</Text>
                  <View style={styles.timeContainer}>
                    {/* Start Time, End Time Display */}
                    <Pressable onPress={() => {setShowEndTimePicker(false); setShowStartTimePicker(prev => !prev)}}>
                      <View style={styles.timeText}>
                        <Text>Start</Text>
                        <Text>{formatNewTime(startTime)}</Text>
                      </View>
                    </Pressable>
                    <Pressable onPress={() => {setShowStartTimePicker(false); setShowEndTimePicker(prev => !prev)}}>
                      <View style={styles.timeText}>
                        <Text>End</Text>
                        <Text>{formatNewTime(endTime)}</Text>
                      </View>
                    </Pressable>
                  </View>
                </View>
              </SafeAreaView>
              <View style={styles.addButtonContainer}>
                  <Button title="Add" size="sm" onPress={() => handleSubmit(createTimeBlock(generateTimeString(startTime), generateTimeString(endTime), dateIncrement))}/>
            </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default JournalCustomHabit;
