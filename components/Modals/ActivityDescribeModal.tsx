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


/* DEPRECATED FUNCTIONS
  const ActivityItem = ({ activity, updatedCat, updatedTags, setUpdatedTags, movementIntensity, setMovementIntensity, updateActivity, onTap }: ActivityItemProps) => {
    const iconMapping: { [key: string]: JSX.Element } = {
      "sunlight": <Feather name="sun" style={styles.category} />,
      "coffee": <Feather name="coffee" style={styles.category} />,
      "intense activity": <MaterialCommunityIcons name="dumbbell" style={styles.category} />,
      "exercise": <MaterialCommunityIcons name="dumbbell" style={styles.category} />,
      "light activity": <FontAwesome5 name="heartbeat" style={styles.category} />,
      "mental stimulation": <FontAwesome5 name="brain" style={styles.category} />,
      "meditation": <MaterialCommunityIcons name="meditation" style={styles.category} />,
      "electronics": <MaterialIcons name="phone-iphone" style={styles.category} />,
      "dopamine rush": <FontAwesome5 name="bolt" style={styles.category} />
      // Add more categories and corresponding JSX elements here
    };

    const handleSetTagValue = (index: number, value: string) => {
      const newTags = [...updatedTags];
      newTags[index] = value;
      setUpdatedTags(newTags);
    };
  
    // Add a new tag
    const handleAddTag = () => {
      setUpdatedTags([...updatedTags, '']); // Adding a new empty tag
    };
  
    // Delete a tag
    const handleDeleteTag = (index: number) => {
      if (updatedTags.length > 1) {
        const newTags = updatedTags.filter((_, i) => i !== index);
        setUpdatedTags(newTags);
      }
    };
    const [error, setError] = useState<string | null>(null);

  const handleChangeText = (text: string) => {
    // Remove non-numeric characters
    const numericValue = text.replace(/\D/g, '');

    // Convert to number
    const number = parseInt(numericValue, 10);

    // Check if the number is within the range 0-10
    if (!isNaN(number) && number >= 0 && number <= 10) {
      setMovementIntensity(numericValue);
      setError(null);
    } else if (numericValue === '') {
      // Allow empty input
      setMovementIntensity('')
      setError(null);
    } else {
      setError('Value must be between 0 and 10');
    }
  };

    return (
      <View style={styles.activityContainer}>
        <View style={styles.rowContainer}>
        <View style={styles.detailsContainer}>
          <View style={styles.name}>
            <Text style={styles.activityName}>{activity.button.text} </Text>
            <View style={styles.categoryContainer}>
            {updatedCat.length>0 ? updatedCat.map((cat) => (
              <View key={cat}>
                {iconMapping[cat.toLowerCase()] || <Feather name="help-circle" style={styles.category} />}
                
              </View>
            )) : <></>}          
          </View>
          </View>

          <View style={styles.tagContainer}>
          {updatedTags.map((tag, index) => (
        <View key={index} style={styles.tagItem}>
          {/* <TagDropdown
            tagValue={tag}
            setTagValue={(value) => handleSetTagValue(index, value as string)}
          /> }
          {updatedTags.length > 1 && (
            <TouchableOpacity onPress={() => handleDeleteTag(index)}>
              <FontAwesome name="minus-circle" size={16} color="red" style={styles.minusIcon} />
            </TouchableOpacity>
          )}
        </View>
        
      ))}

      {updatedTags.length < 4 && (
        <TouchableOpacity onPress={handleAddTag} style={styles.addButton}>
          <FontAwesome name="plus-circle" size={20} color="green" />
        </TouchableOpacity>
        )}
          </View>
        </View>
          </View>
          {updatedTags.includes("Physical") && 
            <View style={styles.exerciseSection}>
            <Text style={{fontSize: 18, color: 'darkcyan'}}>Customize Exercise</Text>
            <View style={{flexDirection: 'row'}}>
              <Text>Movement Intensity:</Text>
              <TextInput         
              value={movementIntensity.toString()}
              onChangeText={handleChangeText}
              maxLength={2} // This mask allows single digit input
              keyboardType="numeric"
              style={{ borderWidth: 1, borderColor: 'gray', padding: 10 }}
               />
               {error && <Text >{error}</Text>}
            </View>
          </View>}
      </View>

  );}

    interface ActivityItemProps {
    activity: Activity;
    updateActivity: (activity: Activity, updates: Partial<Activity>) => void;
    updatedTags: string[];
    setUpdatedTags: React.Dispatch<React.SetStateAction<string[]>>
    updatedCat: string[];
    movementIntensity: string;
    setMovementIntensity: React.Dispatch<React.SetStateAction<string>>
    onTap: () => void
  }
  */