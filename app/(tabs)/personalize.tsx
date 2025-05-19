import {useAppContext, AppProvider} from '@/contexts/AppContext'
import {ButtonState} from '@/Types/ActivityTypes'
import {useAuth} from '@/contexts/AuthContext'
import {useState, useRef, useEffect} from 'react'
import {View, Text, TouchableOpacity, Pressable, Dimensions, FlatList, Button} from 'react-native'
import { Routine, Activity } from '@/Types/ActivityTypes'
import CreateRoutineModal from '@/components/Modals/CreateRoutineModal'
import uuid from 'react-native-uuid'
import { AntDesign } from '@expo/vector-icons'
import CustomActivityEdit from '@/components/Modals/CustomActivityEdit'
import layout_styles from '@/styles/reusable/layoutStyles';
import font_styles from '@/styles/reusable/typography';
import pickerSelectStyles from '@/utils/pickerSelectStyles'
import styles from '@/styles/personalizeStyles'
import scheme from '@/utils/colorScheme'
import CreateHabitModal from '@/components/Modals/CreateHabitModal'

const {width} = Dimensions.get("window");

function Personalize() {
    const {addCustomActivity, addCustomRoutine, customActivities, customRoutines, removeCustomAct, removeRoutine, updateRoutine} = useAppContext();
    const {user} = useAuth();
    const [createRoutineModalVisible, setCreateRoutineModalVisible] = useState<boolean>(false);
    const [inputText, setInputText] = useState<string>("")
    const [tag1Value, setTag1Value] = useState<string>("null")
    const [tag2Value, setTag2Value] = useState<string>("null")
    const [routineName, setRoutineName] = useState<string>("");
    const [durationBetween, setDurationBetween] = useState<number[]>([]);
    const [routineActivities, setRoutineActivities] = useState<Activity[]>([])
    const [value, setValue] = useState<string>("Activity");
    const [pageType, setPageType] = useState<string>("Create")
    const flatListRef = useRef<FlatList>(null);
    const [customActInfo, setCustomActInfo] = useState<ButtonState>()
    const [customActEditVisible, setCustomActEditVisible] = useState<boolean>(false);
    const [tappedRout, setTappedRout] = useState<Routine>()
    const alphabeticalActs = customActivities.sort((a, b) => a.text.localeCompare(b.text));
    const [createHabitModalVisible, setCreateHabitModalVisible] = useState(false);

    useEffect(() => {
      if(customActInfo) {
        setCustomActEditVisible(true);
      }
      }, [customActInfo])

      useEffect(() => {
        if(tappedRout) {
        setCreateRoutineModalVisible(true)
        }
      }, [tappedRout])

    const deleteCustomActivity = (customAct: ButtonState) => {
      console.log('deleting')
      removeCustomAct(customAct);
    }

    const deleteCustomRoutine = (customRout: Routine) => {
      alert(`Trying to delete ${customRout.name}`)
      removeRoutine(customRout);
      // removeCustomRout(customRout)
    }

    const handleInputChange = (text: string) => {
        setInputText(text); 
       };

    const handleRoutineInputChange = (name: string) => {
      setRoutineName(name);
    }
    
    const handleSubmitRoutineModal = (texts: [string, number, number][]) => {
      // Close the modal
      
      setCreateRoutineModalVisible(false);
  
      // Create a new array to hold the activities
      const newActivities: Activity[] = [];
  
      // Iterate over the texts array to build the activities
      texts.forEach((text, index) => {
          const [name, duration, gapBetween] = text;
          const button = customActivities.find(act => act.text === name);
  
          if (button) {

              const newActivity: Activity = {
                  id: uuid.v4() as string,
                  button: button,
                  timeBlock: {
                      startTime: 0,
                      duration: duration,
                      endTime: 0
                  }
              };
              newActivities.push(newActivity);
          }
      });
  
      // Update the routine activities state
      setRoutineActivities(newActivities);
      // Set duration between activities
      setDurationBetween(texts.map(text => text[2]));
      if(tappedRout) {

        const updates: Partial<Routine> = {
          //first turn input value into unix. Create function for this. 
          activities: newActivities,
          durationBetween: texts.map(text => text[2])
    
      }
        updateRoutine(tappedRout, updates)
      }
  };

    const customActTapped = (customAct: ButtonState) => {


        if(customActInfo==customAct) {
          setCustomActEditVisible(true);
        }
        else {
          setCustomActInfo(customAct)

        }
      
    }

    // Callback fn for create habit modal
    const handleCreateHabit = (inputText: string) => {
      setCreateHabitModalVisible(false);
          const newButton = {text: inputText, keywords: [], pressed: false, tags: []}
        setTimeout(() => {
          // add error handling
          addCustomActivity(newButton);
        }, 0)
        // alert("successfully added custom activity. feel free to use it now as often as you'd like!")
    }
    return (

        <View style={layout_styles.layoutContainer}>

          {/* Start Of Layout */}
          <View style={layout_styles.contentContainer} >

          <View style={layout_styles.titleContainer}>
            <Text style={font_styles.headerStyle}>Personalization</Text>
          </View>
          <View style={layout_styles.bodyContainer}>
            <View style={styles.habitListContainer}>
              <FlatList
                ref={flatListRef}
                data={alphabeticalActs}
                keyExtractor={(item) => item.text}
                style={styles.flatList}
                renderItem={({ item}) => ( 
                  <TouchableOpacity onPress={() => customActTapped(item)}>
                    <View style={styles.resultContainer}>
                        <Text style={font_styles.activityName}>{item.text}</Text>  
                        {/* <AntDesign name="edit" size={width / 15} color="orange" />
                        <TouchableOpacity onPress={() => deleteCustomActivity(item)} style={styles.touchableDelete}>
                        <MaterialIcons name="delete" size={width / 15} color="black" />
                      </TouchableOpacity> */}
                  </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          <View style={layout_styles.plusButtonContainer}>
            <Pressable onPress={() => setCreateHabitModalVisible(true)}>
              <AntDesign name="pluscircle" size={width/5} color={scheme.plusButton} />
            </Pressable>
          </View>
        </View>
        </View>
         {/* Modals */}
         {customActInfo && (<CustomActivityEdit style={styles.editModal} ActivityDescribeVisible={customActEditVisible} Info={customActInfo as ButtonState} onClose={() => setCustomActEditVisible(false)} onTapOut={() => setCustomActEditVisible(false)}/>)}
          {/* <CreateRoutineModal style={{}} MultitaskModalVisible={createRoutineModalVisible} onNext={handleSubmitRoutineModal} customRoutine={tappedRout} onTapOut={() => setCreateRoutineModalVisible(false)}/> */}
          <CreateHabitModal visible={createHabitModalVisible} onCreateHabit={handleCreateHabit} onClose={() => setCreateHabitModalVisible(false)} />
        </View> 
        
    )
}

  export default Personalize;



  /* DEPRECATED FUNCTIONS
    const handleSubmit = () => {
      console.log('running sumbit')
        if(inputText.length>2 && (tag1Value!=="null" || tag2Value!=="null")) {
          if(inputText.includes("/")) {
            alert("No slashes in activity titles");
            return;
          }
          if(tag1Value==tag2Value) {
            alert("Make sure the tags are not the same")
            return;
          }
        let tags=[""];
        if(tag1Value!=="null" && tag2Value!=="null") {
            tags=[tag1Value, tag2Value]
        }
        else if (tag1Value!=="null") {
          tags=[tag1Value]
        }
        else if(tag2Value!=="null") {
          tags=[tag2Value]
        }
        if(tags[0].length>0) {
        const newButton = {text: inputText,  iconLibrary: "materialIcons", icon: "more-horiz", keywords: ['Miscellaneous'], pressed: false, tags: tags}
        setTimeout(() => {
          addCustomActivity(newButton);
        }, 0)
        alert("successfully added custom activity. feel free to use it now as often as you'd like!")
         }
         else {
          alert("Problem with tags. Try again.")
         }
        }
        else {
        alert("invalid input")
        }
    }
    const handleRoutineSubmit = () => {
        if(routineName.length>0) {
          if(routineActivities.length>=2) {
            if(durationBetween.length==routineActivities.length) {
            alert("success")
            const newRoutine: Routine = {name: routineName, durationBetween: durationBetween, activities: routineActivities}
              setTimeout(() => {

                addCustomRoutine(newRoutine);
            
            }, 0)
            }
            else {
              alert("Please make sure the duration betweens are set correctly.")
            }
          }
          else {
            alert("Please make sure you have enough activities.")
          }
        }
        else {
          alert("Add a Routine Name")
        }

    }
    const customRoutTapped = (customRout: Routine) => {
      setTappedRout(customRout)
      }
  */