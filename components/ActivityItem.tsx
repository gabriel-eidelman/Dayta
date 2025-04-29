import {View, Text, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import React, { useState } from 'react';
import { Feather, MaterialCommunityIcons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import unixTimeToString from '@/utils/unixTimeToString';
import HandleSubmitEditing from '@/Data/HandleSubmitEditing';
import {Activity, ActivityWithEnd} from '@/Types/ActivityTypes';
import layout_styles from '@/styles/layoutStyles';
import scheme from '@/utils/colorScheme';
import font_styles from '@/styles/typography';


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
    let specialButton = false;
    let sunrise = false;
    let sunset = false;
    let rout = false;
    if(activity.button.text=='Woke Up' || activity.button.text=='Went To Bed' || activity.button.text=='Coffee') {
      specialButton=true
    }
    if(activity.parentRoutName && activity.parentRoutName!=="sun") {
      rout = true
    }
    else if(activity.button.text=='Sunrise' || activity.button.text=="Sunset") {
      sunrise = true;
    }
    // const morningCutoff = justActivities.filter()
    // if(activity.timeBlock.startTime>=)
  
    const [inputValue, setInputValue] = useState<string>(unixTimeToString(activity.timeBlock.startTime, activity.timeBlock.endTime, true));
    const [input2Value, setInput2Value] = useState<string>(unixTimeToString(activity.timeBlock.endTime, 0, true));
  
    const maxLength = 7;
    const handleInputChange = (text: string) => {
     setInputValue(text); 
    };
    const handleInput2Change = (text: string) => {
      setInput2Value(text); 
     };
     let Cat: string[] = []
     if(activity.button.category && activity.button.category.length>0) {
      Cat = activity.button.category.map(cat => cat.toLowerCase())
     }
  
     const iconMapping: { [key: string]: JSX.Element } = {
      "sunlight": <Feather name="sun" style={styles.category} />,
      "coffee": <Feather name="coffee" style={styles.category} />,
      "intense activity": <MaterialCommunityIcons name="dumbbell" style={styles.category} />,
      "workout": <MaterialCommunityIcons name="dumbbell" style={styles.category} />,
      "exercise": <MaterialCommunityIcons name="dumbbell" style={styles.category} />,
      "light activity": <FontAwesome5 name="heartbeat" style={styles.category} />,
      "mental stimulation": <FontAwesome5 name="brain" style={styles.category} />,
      "meditation": <MaterialCommunityIcons name="meditation" style={styles.category} />,
      "electronics": <MaterialIcons name="phone-iphone" style={styles.category} />,
      "dopamine rush": <FontAwesome5 name="bolt" style={styles.category} />
      // Add more categories and corresponding JSX elements here
    };
  
    
    return (
     
      <View>
  
          <View style={layout_styles.activityContainer}>
            <TouchableOpacity onPress={() => onTap(activity)} style={layout_styles.allTouchables}>
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
                  <>
                    <Text style={styles.timeText}>{unixTimeToString(activity.timeBlock.startTime, activity.timeBlock.endTime, false)}</Text>
                      <Text style={styles.timeText}> - </Text>
                      <Text style={styles.timeText}>{unixTimeToString(activity.timeBlock.endTime, 0, false)}
                    </Text>
                  </>
                  )}
                </View>
              </TouchableOpacity>
  
              <View style={styles.touchableActivity}>
                <Text style={styles.activityName}>{activity.button.text}</Text>
              </View>
                {/* <View style={styles.indexCategories}>
                {Cat.length>0 ? Cat.map((cat) => (
                    <View key={cat}>
                      {iconMapping[cat] || <Feather name="help-circle" style={styles.category} />}
                    </View>
                  )) : <></>}  
                  </View> */}
            {/* <TouchableOpacity onPress={() => onRemove(activity)} style={styles.touchableDelete}>
              <MaterialIcons name="delete" size={width / 15} color="grey" />
            </TouchableOpacity> */}
          </TouchableOpacity>
        </View>
      </View>
  );}

  const styles = StyleSheet.create({
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
        color: scheme.mutedDarkGray || '#666666', // Fallback to ensure mutedDarkGray is applied
      },
      activityName: {
        flex: 3,
        fontSize: 16,
        fontWeight: 'bold',
        color: scheme.strongDarkGray
      },
      category: { 
        fontSize: 15,
        color: 'red',
      },
      touchableActivity: {
        // flexShrink: 1,
        // flexWrap: 'nowrap',
        // marginHorizontal: 2,
      
      },
  });

  export default ActivityItem