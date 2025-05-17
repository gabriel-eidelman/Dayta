import {ModalProps, Modal, View, StyleSheet, Dimensions, Text, TouchableWithoutFeedback, Platform, TouchableOpacity} from 'react-native'
import {ThemedText} from '../ThemedText'
import {Button} from '@rneui/themed'
import TimeDropdown from '../TimeHandling/TimeDropdown'
import {useState, useEffect} from 'react'
import Slider from '@react-native-community/slider';
import {useAppContext} from '@/contexts/AppContext'
import {useAuth} from '@/contexts/AuthContext'
import FetchDayActivities from '@/Data/FetchDayActivities'
import ActivitySearchModal from './ActivitySearchModal'
import { SearchBar } from '@rneui/themed'

const {width, height} = Dimensions.get("window");
const buttonWidth = width/6.25
  
  interface MultitaskModalProps extends ModalProps {
    MultitaskModalVisible: boolean;
    onNext: (text: string[]) => void;
    onTapOut: () => void;
  }

const MultitaskModal: React.FC<MultitaskModalProps> = ({ MultitaskModalVisible, onNext, onTapOut, ...modalProps }) => {

  const [multiSearchVisible, setMultiSearchVisible] = useState(false);
  const [buttonTexts, setButtonTexts] = useState<string[]>([]);
  const [activityNum, setActivityNum] = useState<number>(1)
  const [activityOne, setActivityOne] = useState<string>("Activity One")
  const [activityTwo, setActivityTwo] = useState<string>("Activity Two")
  const [activityThree, setActivityThree] = useState<string>("Activity Three")
  const [activityFour, setActivityFour] = useState<string>("Activity Four")
  const multiSearchPress = (text: string) => {
        setButtonTexts([...buttonTexts, text])
        if(activityNum==1) {
            setActivityOne(text)
        }
        if(activityNum==2) {
            setActivityTwo(text)
        }
        if(activityNum==3) {
            setActivityThree(text)
        }
        if(activityNum==4) {
            setActivityFour(text)
        }
        setMultiSearchVisible(false);
    }
  
    return(
        <Modal 
        transparent={true}
        animationType="slide"
        visible={MultitaskModalVisible}

        {...modalProps}>
          <TouchableWithoutFeedback onPress={onTapOut}>
            <View style={styles.MultitaskModalOverlay}>
            <TouchableWithoutFeedback>
                <View style={styles.MultitaskModalContent}>
                  <View style={styles.titleContainer}>
                    <ThemedText type="title"> Select The Activities You Were Doing</ThemedText>
                  </View>
                <View style={styles.stepContainer}>
                  <TouchableOpacity style={styles.actSearchButton} onPress={() => {setActivityNum(1); setMultiSearchVisible(true)}}>
                        <Text>{activityOne}</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.stepContainer}>
                  <TouchableOpacity style={styles.actSearchButton} onPress={() => {setActivityNum(2); setMultiSearchVisible(true)}}>
                        <Text>{activityTwo}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.stepContainer}>
                  <TouchableOpacity style={styles.actSearchButton} onPress={() => {setActivityNum(3); setMultiSearchVisible(true)}}>
                        <Text>{activityThree}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.stepContainer}>
                  <TouchableOpacity style={styles.actSearchButton} onPress={() => {setActivityNum(4); setMultiSearchVisible(true)}}>
                        <Text>{activityFour}</Text>
                  </TouchableOpacity>
                </View>
                <ActivitySearchModal visible={multiSearchVisible} onClick={multiSearchPress} onClose={() => setMultiSearchVisible(false)} />
                <View style={styles.nextContainer}>
                  <Button title="Next" style={styles.nextButton} onPress={() => onNext(buttonTexts)} />
                </View>
            </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
    
}

const styles = StyleSheet.create({
    MultitaskModalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      MultitaskModalContent: {
        flex: 0.5,
        width: width/1.1,
        height: height/2,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
      },
      titleContainer: {
        marginTop: 10,
        marginBottom: 5,
        alignItems: 'center'
      },
      stepContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      actSearchButton: {
        backgroundColor: '#DDDDDD',
        padding: 20,
        width: '100%'
      },
      activitiesContainer: {
        flex: 0.5
      },
      searchContainer: {
        flex: 0.5,
      },
      searchBarContainer: {
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
      },
      searchBarInputContainer: {
        backgroundColor: '#fff',
      },
      searchBarInput: {
        fontSize: 16,
      },
      dropdownContainer: {
        height: height/4, // Adjust this value as needed
        width: '100%', // Or a fixed width if required
        overflow: 'hidden', // Ensures dropdown content does not spill outside
        padding: 10, // Optional padding
      },
      nextContainer: {
        left: ((width/1.1) / 2) - (buttonWidth / 2), // Center horizontally more precisely
        marginTop: 'auto'
      },
      slider: {
          flex: 1,
          flexDirection: 'row',
          width: '100%',
          height: 40,
      },
      nextButton: {
        paddingTop: 10,
        width: buttonWidth,
      }
})

const androidCustom = StyleSheet.create({
  dropdownContainer: {
    height: height/6, // Adjust this value as needed
    width: '100%', // Or a fixed width if required
    overflow: 'hidden', // Ensures dropdown content does not spill outside
    padding: 10, // Optional padding
  },
})
export default MultitaskModal;