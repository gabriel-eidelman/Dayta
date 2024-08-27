import { StyleSheet, View, Dimensions, FlatList, Text, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useState, useEffect, useRef } from 'react';
import {AntDesign, MaterialIcons, Ionicons, Feather, MaterialCommunityIcons} from '@expo/vector-icons';
import MyModal from '@/components/MyModal'
import { useAppContext } from '@/contexts/AppContext';
import {useAuth} from '@/contexts/AuthContext'
import FetchDayActivities from '@/Data/FetchDayActivities'
import ActivityDescribeModal from '@/components/ActivityDescribeModal'
import {DateTime} from 'luxon'
import {Activity, ActivityWithEnd} from '@/Types/ActivityTypes';
import HandleSubmitEditing from '@/Data/HandleSubmitEditing';

// import { getSunriseSunset } from '@/utils/DateTimeUtils';

// Get screen width. This is for more responsive layouts
const { width, height } = Dimensions.get('window');
const buttonWidth = width/6.25

const convertUnixToTimeString = (startTime: number, endTime: number, isInput: boolean): string => {
  // Create Date objects from the Unix timestamps
  const startDate = new Date(startTime * 1000); // Convert seconds to milliseconds
  const endDate = new Date(endTime * 1000);

  // Get hours and minutes in local time
  let startHours = startDate.getHours();
  let endHours = endDate.getHours();
  const startMinutes = startDate.getMinutes();

  // Determine AM or PM
  const periodStart = startHours < 12 ? 'AM' : 'PM';
  const periodEnd = endHours < 12 ? 'AM' : 'PM';

  // Convert hours from 24-hour to 12-hour format
  startHours = startHours % 12;
  startHours = startHours ? startHours : 12; // Hour '0' should be '12'

  // Format minutes to always have two digits
  const formattedMinutes = startMinutes < 10 ? `0${startMinutes}` : `${startMinutes}`;

  // Construct the formatted time string
  if (!isInput) {
    if (endTime > 0) {
      return `${startHours}:${formattedMinutes}`;
    } else {
      // return `${startHours}:${formattedMinutes} ${periodStart}`;
      return `${startHours}:${formattedMinutes} ${periodStart}`;

    }
  } else {
    if(startHours>=10) {
      return `${startHours}:${formattedMinutes}${periodStart}`;
      }
      else {
        return `0${startHours}:${formattedMinutes}${periodStart}`
      };
  }
};

interface ActivityItemProps {
  activity: ActivityWithEnd;
  onRemove: (activity: Activity) => void 
  timeState:(boolean | string)[];
  dateIncrement: number,
  updateActivity: any,
  moveActivity: any,
  onTimeTap: (activity: Activity) => void
  onTap: (activity: Activity) => void
}

const ActivityItem = ({ activity, onRemove, timeState, dateIncrement, updateActivity, moveActivity, onTimeTap, onTap }: ActivityItemProps) => {
  let specialButton = false
  if(activity.button.text=='Woke Up' || activity.button.text=='Went To Bed' || activity.button.text=='Coffee' || activity.parentRoutName) {
    specialButton=true
  }

  const [inputValue, setInputValue] = useState<string>(convertUnixToTimeString(activity.timeBlock.startTime, activity.timeBlock.endTime, true));
  const [input2Value, setInput2Value] = useState<string>(convertUnixToTimeString(activity.timeBlock.endTime, 0, true));

  const maxLength = 7;
  const handleInputChange = (text: string) => {
   setInputValue(text); 
  };
  const handleInput2Change = (text: string) => {
    setInput2Value(text); 
   };
   let Cat: string[] = []
   if(activity.button.category && activity.button.category.length>0) {
    Cat = activity.button.category
   }

   const iconMapping: { [key: string]: JSX.Element } = {
    sunlight: <Feather name="sun" style={styles.category} />,
    coffee: <Feather name="coffee" style={styles.category} />,
    exercise: <MaterialCommunityIcons name="dumbbell" style={styles.category} />,
    meditation: <MaterialCommunityIcons name="meditation" style={styles.category} />,
    // Add more categories and corresponding JSX elements here
  };
  return (
  
    <View style={specialButton ? styles2.activityContainer : styles.activityContainer}>
    <TouchableOpacity onPress={() => onTap(activity)} style={styles.allTouchables}>
        <TouchableOpacity onPress={() => onTimeTap(activity)} style={styles.touchableTime}>
          <View style={styles.timeContainer}>
            {(timeState[0] && activity.id==timeState[1]) ? 
            (
              <>
                <TextInput         
                value={inputValue}
                onChangeText={handleInputChange}
                maxLength={maxLength}
                keyboardType="default" 
                onSubmitEditing={() => HandleSubmitEditing(inputValue, input2Value, maxLength, activity, dateIncrement, updateActivity, moveActivity)}
                returnKeyType="done"
                style={styles.timeText} />
                <Text style={styles.timeText}> - </Text>
                <TextInput         
                value={input2Value}
                onChangeText={handleInput2Change}
                maxLength={maxLength}
                keyboardType="default"
                onSubmitEditing={() => HandleSubmitEditing(inputValue, input2Value, maxLength, activity, dateIncrement, updateActivity, moveActivity)}
                returnKeyType="done" 
                style={styles.timeText} />
              </>
            ) : 
            (
            <><Text style={styles.timeText}>{convertUnixToTimeString(activity.timeBlock.startTime, activity.timeBlock.endTime, false)}</Text>
              <Text style={styles.timeText}> - </Text>
              <Text style={styles.timeText}>{convertUnixToTimeString(activity.timeBlock.endTime, 0, false)}</Text></>
            )}
          </View>
        </TouchableOpacity>
        <View style={styles.touchableActivity}>
          <Text style={styles.activityName}>{activity.button.text}</Text>
          </View>
          <View style={{}}>
          {Cat.length>0 ? Cat.map((cat) => (
              <View key={cat}>
                {iconMapping[cat] || <Feather name="help-circle" style={styles.category} />}
              </View>
            )) : <></>}  
            </View>
      <TouchableOpacity onPress={() => onRemove(activity)} style={styles.touchableDelete}>
        <MaterialIcons name="delete" size={width / 15} color="black" />
      </TouchableOpacity>
      </TouchableOpacity>
    </View>
);}

function Journal() {
  // const timeZone = 'America/Los_Angeles'; // Replace with the user's time zone
  // const times = getSunriseSunset(new Date(), timeZone)

  const { user } = useAuth();
  const [dbActivities, setDbActivities] = useState<Activity[]>([]);
  const filteredWithEnd: ActivityWithEnd[] = dbActivities.filter(
    (act): act is Activity & { timeBlock: { endTime: number } } => act.timeBlock.endTime !== null
  );
  const [version, setVersion] = useState(0)
  const [activityInfo, setActivityInfo] = useState<Activity>()

  useEffect(() => {
    if(activityInfo) {
      setActivityDescribeVisible(true);
      console.log('act info set, opening activitydescribe ', activityInfo)
    }
    }, [activityInfo])
  const { justActivities, removeActivity, updateActivity, moveActivity, dateIncrement, setDateIncrement } = useAppContext();

  const [isTimeTapped, setTimedTapped] = useState<(boolean | string)[]>([false, ""]);
  const [localTime, setLocalTime] = useState<DateTime>(DateTime.local().plus({ days: dateIncrement }))
  const remove = (act: Activity) => {
    removeActivity(act);
    setVersion(prevVersion => prevVersion + 1)
  }
  const [activityDescribeVisible, setActivityDescribeVisible] = useState<boolean>(false);
  useEffect(() => {
    //this is terrible architecture; I should absolutely not be reading from the database on every date increment and every little update. 
        //I should instead read from local storage more.
        if(justActivities.length>0) {
          FetchDayActivities(user, dateIncrement, justActivities, setDbActivities)
        }

    setLocalTime(DateTime.local().plus({ days: dateIncrement }))
    setTimedTapped([false, ""])
  }, [user, dateIncrement, justActivities, version]);

  //toggle the state of the modal
    const [modalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {setModalVisible(!modalVisible); setTimedTapped([false, ""]);}
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
    // console.log('DbActivities for index: ', dbActivities)
  return (
    
      <View style={styles.layoutContainer}>
        <MyModal visible={modalVisible} onClose={toggleModal} />
        {activityInfo && (<ActivityDescribeModal style={styles.durationModal} ActivityDescribeVisible={activityDescribeVisible} Info={activityInfo as Activity} onClose={() => setActivityDescribeVisible(false)} onTapOut={() => setActivityDescribeVisible(false)}/>)}

        <View style={styles.contentContainer} >
              <View style={{alignItems: 'center'}}>
                <ThemedText type="titleText" style={{fontSize: width/12}}>My Journal</ThemedText>
              </View>
        <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => setDateIncrement(dateIncrement-1)}>
                <View style={styles.incrementButtonContainer}>
                  <Ionicons name="return-up-back" size={height/27} color="black"/>
                </View>
        </TouchableOpacity>   
        <ThemedText type="subtitle" style={styles.titleContainer}>{localTime.toFormat('cccc')}</ThemedText>
        <TouchableOpacity onPress={() => setDateIncrement(dateIncrement+1)}>
              <View style={styles.incrementButtonContainer}>
                <Ionicons name="return-up-forward" size={height/27} color="black"/>
              </View>
        </TouchableOpacity>
        </View>
        {filteredWithEnd.length>0 ? 
        <KeyboardAvoidingView 
        behavior= {'padding'}
        keyboardVerticalOffset={80} 
        style={{marginBottom: 80}}>
        <FlatList 
        ref={flatListRef}
        data={filteredWithEnd}
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
        </View>
        <View style={styles.plusButtonContainer}>
          <TouchableOpacity onPress={toggleModal}>
            <AntDesign name="pluscircle" size={width/6.25} color="black" />
          </TouchableOpacity>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
 //colors darkcyan, mintcream, bisque
 layoutContainer: {
  flex: 1,
  paddingTop: height/18,
  backgroundColor: 'darkcyan',
  position: 'relative', // Container must be relative for absolute positioning of child
},
contentContainer: {
  flex: 1,
  paddingBottom: height/9, // Space at the bottom to accommodate the button
},
headerContainer: {
  marginHorizontal: width/13,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
titleContainer: {
  padding: 10,
},
dateContainer: {
  alignItems: 'center'
},
incrementButtonContainer: {
  backgroundColor: 'white'
},
container: {
  flex: 1,
  backgroundColor: '#f0f0f0',
  paddingTop: 20,
},
listContent: {
  paddingHorizontal: 20,
},
activityContainer: {
  flex: 1,
  backgroundColor: '#fff',
  borderRadius: 10,
  padding: 15,
  marginTop: 10,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 4 },
  flexDirection: 'row',
  alignItems: 'center',
},
category: { 
  fontSize: 15,
  color: 'red',
},
detailsContainer: {
  flex: 1, // Allows this section to take up the remaining space
},
allTouchables: {
  flex: 1,
  flexDirection: 'row',
},
touchableActivity: {
  flexShrink: 1,
  marginHorizontal: 10,
},
touchableDelete: {
  marginLeft: 'auto'
},
touchableTime: {

},
timeContainer: {
  flexDirection: 'row',
  flexWrap: 'nowrap',
  // borderColor: 'yellow',
  // borderWidth: 3
},
timeText: {
  fontSize: 13,
  flexWrap: 'nowrap',
  color: '#333',
},
activityName: {
  flex: 3,
  fontSize: 16,
  fontWeight: 'bold',
},
durationModal: {
  flex: 1
},
plusButtonContainer: {
    position: 'absolute', // Absolute positioning to overlay everything
    bottom: height/40.6, // Space from the bottom of the container
    left: (width / 2) - (buttonWidth / 2), // Center horizontally more precisely
    width: buttonWidth
},
});

const styles2 = StyleSheet.create({
  activityContainer: {
    flex: 1,
    backgroundColor: 'darkturquoise',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
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

export default Journal;
