import {ModalProps, Modal, View, StyleSheet, Dimensions, Text, Pressable, TouchableWithoutFeedback, TextInput, FlatList, TouchableOpacity} from 'react-native'
import React, {useState, useEffect} from 'react'
import {Button} from '@rneui/themed'
import {Activity} from '@/Types/ActivityTypes'
import { useAppContext } from '@/contexts/AppContext';
import font_styles from '@/styles/reusable/typography'
import styles from '@/styles/activityDescribeStyles'

const {height} = Dimensions.get("window");

  
  interface MultitaskModalProps extends ModalProps {
    ActivityDescribeVisible: boolean;
    Info: Activity
    onClose: () => void;
    onTapOut: () => void;
  }

const ActivityDescribeModal: React.FC<MultitaskModalProps> = ({ ActivityDescribeVisible, Info, onClose, onTapOut, ...modalProps }) => {

    const {updateActivity} = useAppContext();
    const startingTags: string[] = Info.button.tags
    const [updatedTags, setUpdatedTags] = useState(startingTags);
    const startingCat: string[] = Info.button.category ? Info.button.category : []
    const [updatedCat, setUpdatedCat] = useState<string[]>(startingCat as string[]);
    const startingMovementIntensity: number = (Info.button.movementIntensity && Info.button.movementIntensity>=0 && Info.button.movementIntensity<=10) ? Info.button.movementIntensity : 0
    const [movementIntensity, setMovementIntensity] = useState<string>(startingMovementIntensity.toString())
    const [titleName, setTitleName] = useState(Info.button.text)
    // Submit the tags to the database
    const handleSubmit = () => {
      // let cat: string[] = []
      // if(Info.button.category) {
      //   cat = Info.button.category
      // }
      // const parsedMovement = parseInt(movementIntensity)!==undefined ? parseInt(movementIntensity) : 0
      
      const updates: Partial<Activity> = {
        //first turn input value into unix. Create function for this. 
        button: {
          text: Info.button.text,
          keywords: Info.button.keywords,
          iconLibrary: Info.button.iconLibrary,
          icon: Info.button.icon,
          pressed: false,
          tags: updatedTags,
          category: undefined,
          movementIntensity: undefined
        },
      };
      updateActivity(Info, updates);
      // Add your database logic here
    };

    useEffect(() => {
      if(Info.button.category) {
        setUpdatedCat(Info.button.category)
      }
      else {
        setUpdatedCat([])
      }
      if(Info.button.tags) {
        setUpdatedTags(Info.button.tags)
      }
      else {
        setUpdatedTags([]);
      }
    }, [Info])

    const addCategory = (text: string) => {
      if(Info && text) {
        let newCat: string[] = [""]
        if(updatedCat.length>0) {
          newCat = [...updatedCat, text]
        }
        else {
          newCat = [text]
        }
        const parsedMovement = parseInt(movementIntensity)!==undefined ? parseInt(movementIntensity) : 0

      const updates: Partial<Activity> = {
        //first turn input value into unix. Create function for this. 
        button: {
          text: Info.button.text,
          keywords: Info.button.keywords,
          iconLibrary: Info.button.iconLibrary,
          icon: Info.button.icon,
          pressed: false,
          tags: Info.button.tags,
          category: newCat,
          movementIntensity: parsedMovement
        },
      };
      updateActivity(Info, updates)
      setUpdatedCat(prevCat => {
        
        const prev = prevCat.some(cat => cat === text)
        if(prev) {
          alert("duplicate")
        }
        return prev ? prevCat : [...prevCat, text]
      })
       }
    }

    const onDeleteCat = (text: string) => {
      let newCat=[""]
      if(updatedCat.length>0) {
        newCat = updatedCat.filter(cat => cat!==text)

      }
      
      const parsedMovement = parseInt(movementIntensity)!==undefined ? parseInt(movementIntensity) : 0

      const updates: Partial<Activity> = {
        //first turn input value into unix. Create function for this. 
        button: {
          text: Info.button.text,
          keywords: Info.button.keywords,
          iconLibrary: Info.button.iconLibrary,
          icon: Info.button.icon,
          pressed: false,
          tags: Info.button.tags,
          category: newCat,
          movementIntensity: parsedMovement
        },
      };
      updateActivity(Info, updates)
      setUpdatedCat(newCat)
    }

    const editTitle = () => {
      // setTitleName("newTitle")
    }
    return(
        <Modal 
        transparent={true}
        animationType="slide"
        visible={ActivityDescribeVisible}

        {...modalProps}>
          <TouchableWithoutFeedback onPress={onTapOut}>
            <View style={styles.MultitaskModalOverlay}>
            <TouchableWithoutFeedback>
                <View style={styles.ActivityDescribeModalContent}>
                    <Pressable style={styles.headerContainer} onPress={editTitle}>
                      <View style={styles.titleContainer}>
                        <Text style={font_styles.h2}>{Info.button.text}</Text>
                      </View>
                      {/* <View style={{alignItems: 'center'}}>
                        <Ionicons name="pencil" size={18}></Ionicons>
                      </View> */}
                  </Pressable>
                <View style={styles.bodyContainer}>
                  
                </View>
                {/* {Info ? 
                <ActivityItem activity={Info} updatedTags={updatedTags} movementIntensity={movementIntensity} setMovementIntensity={setMovementIntensity} updatedCat={updatedCat} setUpdatedTags={setUpdatedTags} updateActivity={updateActivity} onTap={() => alert("Not Pressable")}/> : 
                <Text>Invalid Activity</Text>} */}
                {/* <CategoryBar current={updatedCat} onPress={addCategory} deleteCat={onDeleteCat}/> */}
                <View style={styles.nextContainer}>
                  <Button title="Done" style={styles.nextButton} onPress={() => {handleSubmit(); onClose()}} />
                </View>
            </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
    
}

export default ActivityDescribeModal;


