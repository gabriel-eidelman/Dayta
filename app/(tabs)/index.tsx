import { StyleSheet, View, Dimensions, FlatList, Text, TouchableOpacity, PanResponder, Animated, KeyboardAvoidingView} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useState, useEffect, useRef } from 'react';
import {AntDesign, MaterialIcons, Ionicons, Feather, MaterialCommunityIcons, FontAwesome5} from '@expo/vector-icons';
import JournalCustomHabit from '@/components/Modals/JournalCustomHabit'
import AddHabitModal from '@/components/Modals/AddHabit'
import { useAppContext } from '@/contexts/AppContext';
import {useAuth} from '@/contexts/AuthContext'
import FetchDayActivities from '@/Data/FetchDayActivities'
import ActivityDescribeModal from '@/components/Modals/ActivityDescribeModal'
import {DateTime} from 'luxon'
import {Activity, ActivityWithEnd} from '@/Types/ActivityTypes';
import uuid from 'react-native-uuid'
import NoStartTimeModal from '@/components/Deprecated/NoStartTimeModal';
// import CalendarConnect from '@/components/CalendarConnect';
// import CalendarInformation from '@/components/CalendarInformation'
import {storage} from '@/utils/mmkvStorage';
import { JournalSuggestion, showSuggestionsPicker } from "@/components/JournalingSuggestions";
import scheme from '@/utils/colorScheme';
import layout_styles from '@/styles/reusable/layoutStyles';
import font_styles from '@/styles/reusable/typography';
import ActivityItem from '@/components/ActivityItem';
import addActivityFromSuggestion from '@/Data/AddActivityFromSuggestion';
import { getSunriseSunset, generateISODate } from '@/utils/DateTimeUtils';
import Toast from 'react-native-toast-message';

// Get screen width. This is for more responsive layouts
const { width, height } = Dimensions.get('window');
const buttonWidth = width/6.25

function Journal() {

  /* STATE VARIABLES */
  const { user } = useAuth();
  const [dbActivities, setDbActivities] = useState<Activity[]>([]);
  const [version, setVersion] = useState(0)
  const [activityInfo, setActivityInfo] = useState<Activity>()
  const [sunriseTime, setSunriseTime] = useState<number>(0);
  const [sunsetTime, setSunsetTime] = useState<number>(0);
  // const [authToken, setAuthToken] = useState<string | null>(null)
  // const [showAuth, setShowAuth] = useState<boolean>(false);
  const [suggestion, setSuggestion] = useState<JournalSuggestion | null>(null);
  const [error, setError] = useState<string | null>(null);
  /* Animations */
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleSwipe = (direction: number) => {
  Animated.sequence([
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }),
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }),
  ]).start();

  setDateIncrement(prev => prev + direction);
};

  const panResponder = useRef(
  PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return Math.abs(gestureState.dx) > 20; // Trigger only if horizontal swipe
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx > 50) {
        handleSwipe(-1); // Swipe right: go back
      } else if (gestureState.dx < -50) {
        handleSwipe(1); // Swipe left: go forward
      }
    },
  })
).current;
/* Animation End */

  const storedToken = storage.getString('AuthToken')

  // if(!storedToken) {
  //   setShowAuth(true)
  // }
  // useEffect(() => {
  //   if(authToken) {
  //   storage.set('AuthToken', authToken)  
  //   setShowAuth(false);
  //   }
  // }, [authToken])

  const handleShowPicker = async () => {
    console.log("showing picker");
    try {
      const selected = await showSuggestionsPicker();
      setSuggestion(selected);
      console.log('Selected suggestion:', selected);
      console.log('Selected suggestion:', selected.text);
      console.log('Selected suggestion:', selected.timeblock);
      if(selected.timeblock) {
        addActivityFromSuggestion(selected, addActivity);
      }
      else {
        Toast.show({
          type: 'error',
          text1: 'No Time Block',
          text2: 'Activity was not added because no time block was provided.',
        });
      }

      console.log("suggestions set");
    } catch (error) {
      console.error('Error showing picker:', error);
    }
  };

  // const loadSuggestions = async () => {
  //   try {
  //     setError(null);
  //     const data = await fetchSuggestion();
  //     setSuggestion(data);
  //   } catch (err: any) {
  //     setError(err.message);
  //   }
  // };

  // Decompose later
  const sunriseActivity: ActivityWithEnd = {
    id: uuid.v4() as string,
    parentRoutName: 'sun',  // Optional field to identify special types
    button: 
      { text: 'Sunrise', 
        iconLibrary: "materialIcons", 
        icon: "brunch-dining", 
        keywords: ['Eating', 'Meal'], 
        pressed: false, 
        tags: ['Food/Drink'] 
      },
 
    timeBlock: {
      startTime: sunriseTime,  // Unix timestamp
      endTime: sunriseTime,    // You might want to use the same value for both
      duration: 0,
    },
  };

  const sunsetActivity: ActivityWithEnd = {
    id: uuid.v4() as string,
    parentRoutName: 'sun',  // Optional field to identify special types
    button: 
      { text: 'Sunset', 
        iconLibrary: "materialIcons", 
        icon: "brunch-dining", 
        keywords: ['Eating', 'Meal'], 
        pressed: false, 
        tags: ['Food/Drink'] 
      },
 
    timeBlock: {
      startTime: sunsetTime,  // Unix timestamp
      endTime: sunsetTime,    // You might want to use the same value for both
      duration: 0,
    },
  };
  const filteredWithEnd: ActivityWithEnd[] = dbActivities.filter(
    (act): act is Activity & { timeBlock: { endTime: number } } => act.timeBlock.endTime !== null
  );
  const withSunriseSunset: ActivityWithEnd[] = [...filteredWithEnd, sunriseActivity, sunsetActivity]
  withSunriseSunset.sort((a, b) => a.timeBlock.endTime - b.timeBlock.endTime);

  const noEnd: Activity[] = dbActivities.filter((act) => act.timeBlock.endTime == null || !(act.timeBlock.endTime>0))
  const generateSunriseSunset = () => {
      const timeZone = 'America/Los_Angeles'; // Replace with the user's time zone
      const today = generateISODate(dateIncrement, timeZone);
      const todayDate = new Date(today)
      const {sunrise, sunset} = getSunriseSunset(todayDate, timeZone)

      const sunriseDate = new Date(sunrise);
      const sunsetDate = new Date(sunset)
      const sunriseUnix = Math.floor(sunriseDate.getTime() / 1000)
      const sunsetUnix = Math.floor(sunsetDate.getTime() / 1000)
      setSunriseTime(sunriseUnix);
      setSunsetTime(sunsetUnix);
      
  }

  useEffect(() => {
    if(activityInfo) {
      setActivityDescribeVisible(true);
    }
    }, [activityInfo])
  const { addActivity, justActivities, removeActivity, updateActivity, moveActivity, dateIncrement, setDateIncrement } = useAppContext();

  const [isTimeTapped, setTimedTapped] = useState<(boolean | string)[]>([false, ""]);
  const [localTime, setLocalTime] = useState<DateTime>(DateTime.local().plus({ days: dateIncrement }))
  const [noStartModalVisible, setNoStartModalVisible] = useState<boolean>(false);
  const remove = (act: Activity) => {
    removeActivity(act);
    setVersion(prevVersion => prevVersion + 1)
  }
  useEffect(() => {
    generateSunriseSunset();
    // loadSuggestions();
}, [dateIncrement])
  const [activityDescribeVisible, setActivityDescribeVisible] = useState<boolean>(false);
  useEffect(() => {
    //this is terrible architecture; I should absolutely not be reading from the database on every date increment and every little update. 
        //I should instead read from local storage more.
        if(justActivities.length>0) {
          FetchDayActivities(user, dateIncrement, justActivities, setDbActivities, true)
        }

    setLocalTime(DateTime.local().plus({ days: dateIncrement }))
    setTimedTapped([false, ""])
  }, [user, dateIncrement, justActivities, version]);

  //toggle the state of the modal
    const [modalVisible, setModalVisible] = useState(false);
    const [addHabitModalVisible, setAddHabitModalVisible] = useState(false);
    const toggleModal = () => {setModalVisible(!modalVisible); setTimedTapped([false, ""]);}
    const toggleAddHabitModal = () => {setAddHabitModalVisible(!addHabitModalVisible);}
    const flatListRef = useRef<FlatList>(null);
    useEffect(() => {
      const timer = setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: false });
      }, 1); // Slight delay to ensure list is rendered
  
      // Clean up the timer if the component unmounts
      setTimedTapped([false, ""])
      return () => clearTimeout(timer);
    }, [dbActivities]); // Empty dependency array ensures this runs only on initial render

    const timeTapped = (activity: Activity) => {
      setTimedTapped([true, activity.id]);
    }
    const activityTapped = (activity: Activity) => {
      setTimedTapped([false, ""])
      if(activity.button.text=="Multi-Activity") {
        alert('multiActivity')
      }
      else {
        if(activityInfo==activity) {
          setActivityDescribeVisible(true);
        }
        else {
          setActivityInfo(activity)

        }
      }
    }
    const handleAppleTrigger = () => {
      setAddHabitModalVisible(false); // Dismiss RN modal
      setTimeout(async () => {
        await handleShowPicker(); // Call native UI after modal is gone
      }, 300); // Wait for animation to finish
    }
    const handleCustomHabitPress = () => {
      setAddHabitModalVisible(false);
      setTimeout(() => {
        toggleModal();
      }, 300);
    }
    // const toggleNoStartModal = () => {
    //   setNoStartModalVisible(true);
    // }
  return (
      <View style={[layout_styles.layoutContainer]}>
        {/* Global Modals */}
        <AddHabitModal isOpen={addHabitModalVisible} onApplePickerPress={handleAppleTrigger} onCustomHabitPress={handleCustomHabitPress} onClose={toggleAddHabitModal} />
        {activityInfo && (<ActivityDescribeModal style={{flex: 1}} ActivityDescribeVisible={activityDescribeVisible} Info={activityInfo as Activity} onClose={() => setActivityDescribeVisible(false)} onTapOut={() => setActivityDescribeVisible(false)}/>)}
        <NoStartTimeModal visible={noStartModalVisible} onClose={() => setNoStartModalVisible(false)} remove={remove} otherArray={noEnd}/>
        <JournalCustomHabit visible={modalVisible} onClose={toggleModal} />
        {/* Layout Start */}
        <View style={layout_styles.contentContainer} >
          <View style={layout_styles.titleContainer}>
            <Text style={font_styles.headerStyle}>Journal</Text>
          </View>
          <View style={layout_styles.bodyContainer}>
            <View style={layout_styles.headerContainer}>
              {/* <TouchableOpacity onPress={() => setDateIncrement(dateIncrement-1)}>
                      <View style={styles.incrementButtonContainer}>
                        <Ionicons name="return-up-back" size={height/27} color="#F5F5F5"/>
                      </View>
              </TouchableOpacity>    */}
              <Text style={styles.dateText}>{localTime.toFormat('cccc LLLL d')}</Text>
              {/* <TouchableOpacity onPress={() => setDateIncrement(dateIncrement+1)}>
                    <View style={styles.incrementButtonContainer}>
                      <Ionicons name="return-up-forward" size={height/27} color="#F5F5F5"/>
                    </View>
              </TouchableOpacity> */}
            </View>
            {/* {showAuth ? <CalendarConnect authToken={authToken} setAuthToken={setAuthToken} /> : <></>} */}
            {/* <CalendarInformation authToken={authToken}/> */}
            {/* <Button title="Refresh Suggestions" onPress={loadSuggestions} /> */}

            {/* <ScrollView style={{ padding: 20 }}>
              <Button title="Refresh Suggestions" onPress={loadSuggestions} />
              {error && <Text style={{ color: "red" }}>Error: {error}</Text>}

                <View style={{ marginVertical: 10 }}>
                  <Text style={{color: 'white'}}>📌 {suggestion!=null ? suggestion.text : "No Suggestion"}</Text>
                </View>
          </ScrollView> */}
          
            {/* {suggestion!=null && (
              <View style={styles.suggestionContainer}>
                <Text style={styles.suggestionText}>
                  Selected: {suggestion.text}
                </Text> 
                {suggestion.category && (
                  <Text>Category: {suggestion.category}</Text>
                )}
              </View>
            )} */}
            <Animated.View
            {...panResponder.panHandlers}
            style={{ flex: 1, opacity: fadeAnim }}>
            {withSunriseSunset.length>0 ? 
            <KeyboardAvoidingView 
            behavior= {'padding'}
            keyboardVerticalOffset={80} 
            style={{marginBottom: 80}}>

            <FlatList 
            ref={flatListRef}
            data={withSunriseSunset}
            renderItem={({ item }) => <ActivityItem activity={item} onRemove={remove} timeState={isTimeTapped} dateIncrement={dateIncrement} updateActivity={updateActivity} moveActivity={moveActivity} onTimeTap={timeTapped} onTap={activityTapped}/>}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            />
            </KeyboardAvoidingView>
              : <>
                {/* <ThemedText type="subtitle">
                  Add Your First Activity For The Day!
                </ThemedText> */}
              </>}
              </Animated.View>

            {/* <View style={styles.calendarButtonContainer}>
              <TouchableOpacity onPress={toggleNoStartModal}>
                <AntDesign name="calendar" size={width/8} color="grey" />
              </TouchableOpacity>
            </View> */}
            <View style={layout_styles.plusButtonContainer}>
              <TouchableOpacity onPress={toggleAddHabitModal}>
                <AntDesign name="pluscircle" size={width/5} color={scheme.plusButton} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* <View style={styles.otherButtonContainer}>
          <TouchableOpacity onPress={toggleNoStartModal}>
            <MaterialIcons name="other-houses" size={width/8} color="grey" />
          </TouchableOpacity>
        </View> */}
      </View>
  );
}

const styles = StyleSheet.create({
 //colors darkcyan, mintcream, bisque
 layoutContainer: {
  flex: 1,
  paddingTop: height/10,
  backgroundColor: scheme.background,
  position: 'relative', // Container must be relative for absolute positioning of child
},
contentContainer: {
  flex: 1,
  paddingBottom: '10%', // Space at the bottom to accommodate the button
},
headerContainer: {
  marginHorizontal: width/13,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
},
dateText: {
  paddingTop: height/30,
  paddingBottom: height/40,
  color: scheme.mutedDarkGray, // Fallback to ensure mutedDarkGray is applied
  fontSize: width/20,
  textAlign: 'center',
},
dateContainer: {
  alignItems: 'center',
},
incrementButtonContainer: {
  backgroundColor: '#1B1B1B'
},
container: {
  flex: 1,
  backgroundColor: '#f0f0f0',
  paddingTop: 20,
},
listContent: {
  display: 'flex',
  flexDirection: 'column',
  gap: 15,
  paddingHorizontal: 36,
},
detailsContainer: {
  flex: 1, // Allows this section to take up the remaining space
},
indexCategories: {
  marginLeft: 'auto'
},
calendarButtonContainer: {
  position: 'absolute', // Absolute positioning to overlay everything
  bottom: height/40.6, // Space from the bottom of the container
  right: width-buttonWidth-20, // Center horizontally more precisely
  width: buttonWidth
},
otherButtonContainer: {
  position: 'absolute', // Absolute positioning to overlay everything
  bottom: height/40.6, // Space from the bottom of the container
  left: width-buttonWidth-20, // Center horizontally more precisely
  width: buttonWidth
},
title: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 20,
},
suggestionContainer: {
  marginTop: 20,
  padding: 15,
  backgroundColor: '#e1f5fe',
  borderRadius: 8,
  width: '100%',
},
suggestionText: {
  fontSize: 16,
  fontWeight: '500',
},
});

const styles2 = StyleSheet.create({
  activityContainer: {
    flex: 1,
    backgroundColor: '#222222',
    borderRadius: 2,
    padding: 15,
    // marginTop: 10,
    borderColor: 'lightgrey',
    borderWidth: 0.1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeContainer: {
    flex: 2.5,
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
})

const styles3 = StyleSheet.create({
  activityContainer: {
    flex: 1,
    backgroundColor: '#222222',
    borderRadius: 2,
    padding: 15,
    // marginTop: 10,
    borderColor: 'lightgrey',
    borderWidth: 0.1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    flexDirection: 'row',
    alignItems: 'center',
  },
})

const styles4 = StyleSheet.create({
  activityContainer: {
    flex: 1,
    backgroundColor: '#222222',
    borderRadius: 2,
    padding: 15,
    // marginTop: 10,
    borderColor: 'lightgrey',
    borderWidth: 0.1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export default Journal;
