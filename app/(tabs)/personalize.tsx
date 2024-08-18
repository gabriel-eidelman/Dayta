import {useAppContext, AppProvider} from '@/contexts/AppContext'
import {ButtonState} from '@/Types/ActivityTypes'
import {useAuth} from '@/contexts/AuthContext'
import {Dispatch, SetStateAction, useState} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput} from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import RNPickerSelect from 'react-native-picker-select'

const {width, height} = Dimensions.get("window");
const buttonWidth = width/5;
const buttonHeight = height/19;
const titleWidth = width/1.5;


function Personalize() {
    const {addCustomActivity} = useAppContext();
    const {user} = useAuth();
    const [inputText, setInputText] = useState<string>("")
    const [tag1Value, setTag1Value] = useState<string>("")
    const [tag2Value, setTag2Value] = useState<string>("")


    const [newButton, setNewButton] = useState<ButtonState>()
   
    const handleInputChange = (text: string) => {
        setInputText(text); 
       };

    const handleSubmit = () => {
        if(inputText.length>3 && tag1Value.length>0) {
        let tags=[""];
        if(tag1Value.length>0 && tag2Value.length>0) {
            tags=[tag1Value, tag2Value]
        }
        else if (tag1Value.length>0 && tag2Value=="") {
          tags=[tag1Value]
        }
        else if(tag2Value.length>0 && tag1Value=="") {
          tags=[tag2Value]
        }
        const newButton = {text: inputText,  iconLibrary: "materialIcons", icon: "more-horiz", keywords: ['Miscellaneous'], pressed: false, tags: tags}
        setTimeout(() => {
          addCustomActivity(newButton);
        }, 0)
        alert("successfully added custom activity. feel free to use it now as often as you'd like!")
        }
        else {
        alert("invalid input")
        }
    }
    return (
        <>
        <View style={styles.modalOverlay}>
          
            <View style={styles.titleContainer}>
              <ThemedText type="titleText" style={{fontSize: width/12}}>Personalization</ThemedText>
            </View>
          {/* <View style={styles.headerSection}>
          </View> */}
          <View style={styles.createActivityContainer}>
          <View style={styles.textSection}>
            <Text style={{fontSize: width/16, color: 'white', fontStyle: 'italic'}}>Create Custom Activity</Text>
            <View style={styles.textContainer}>
            <ThemedText type="subtitle">Activity Name: </ThemedText>
            <View style={styles.inputText}>
            <TextInput value={inputText} 
                onChangeText={handleInputChange}
                maxLength={30}
                keyboardType="default" 
                // onSubmitEditing={() => handleSubmit(newButton)}
                returnKeyType="done"
                style={styles.textInputContainer}
            />
            </View>
            </View>
          </View>
          <View style={styles.tagSection}>
            <ThemedText type="subtitle">Add Tags: </ThemedText>
            <TagDropdown setTagValue={setTag1Value}/>
            <TagDropdown setTagValue={setTag2Value}/>
          </View>
          <View style={styles.createContainer}>
              <TouchableOpacity onPress={() => handleSubmit()} style={styles.closeButton}>
                <Text style={styles.buttonText}>Create Activity</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        </>
    )
}

interface TagDropdownProps {
    setTagValue: Dispatch<SetStateAction<string>>;
  }
  const TagDropdown: React.FC<TagDropdownProps> = ({ setTagValue }) => {
    const tags = [
      { label: 'Food/Drink', value: 'Food/Drink'},
      { label: 'Physical', value: 'Physical' },
      { label: 'Relax', value: 'Relax' },
      { label: 'Music', value: 'Music' },
      { label: 'Entertainment', value: 'Entertainment' },
      { label: 'Social', value: 'Social' },
      { label: 'Work/Study', value: 'Work/Study' },
      { label: 'Travel/Commute', value: 'Travel/Commute' },
      { label: 'Hobbies', value: 'Hobbies' },
      { label: 'Chores', value: 'Chores' },
      { label: 'Self-Improvement', value: 'Self-Improvement' },
      { label: 'Helping Others', value: 'Helping Others' },

      { label: 'Other', value: 'Other' },
    ]
    return (
      <RNPickerSelect
        onValueChange={(value) => setTagValue(value)}
        items={tags}
      />
    );
  };

// const Personalize: React.FC = () => {
//     return (
//       <AppProvider>
//         <Logic />
//       </AppProvider>
//     );
//   };
  
  export default Personalize;

  const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: 'darkcyan',
      paddingTop: height/18,
      position: 'relative'
    },
     titleContainer: {
      flex: 1,
      alignItems: 'center',
      padding: 15
    },
    createActivityContainer: {
      flex: 10,
    },
    buttonTextContainer: {
      flex: 1,
      alignItems: 'flex-start'
    },
    textContainer: {

      flexDirection: 'row',
    },
    inputText: {
        // flex: 1,
        // flexDirection: 'row'
    },
    textSection: {
      padding: 30,
      rowGap: 20,
    },
    tagSection: {
        padding: 30,
        rowGap: 20,
        flexDirection: 'row',
        justifyContent: 'space-around'

    },

    createContainer: {
 
      alignItems: 'center',
    },
    closeButton: {
      backgroundColor: 'blue', // Example background color
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    buttonText: {
      fontSize: 21,
      color: 'white',
    },
    textInputContainer: {
     backgroundColor: 'white',
     width: width/2,
     height: 50,
    paddingLeft: 15,
    paddingRight: 15,
    },
  });