import { StyleSheet } from 'react-native';
import scheme from '@/utils/colorScheme';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: scheme.background,
      paddingTop: height/18,
      position: 'relative'
    },
     titleContainer: {
      flex: 1,
      alignItems: 'center',
      padding: 15
    },
    addRoutineButton: {
      padding: 10,
      backgroundColor: 'yellow'
    },
    editModal: {
      flex: 1
    },
    valueButtonContainer: {
      flexDirection: 'row',
      marginVertical: 8,
      borderColor: 'orange',
      borderWidth: 2,
    },
    renderButtons: {
      flex: 10,
    },
    habitListContainer: {
      flex: 1,
      padding: 20,
    },
    inputTitle: {
      fontSize: width/16, 
      color: 'white', 
      fontStyle: 'italic',
      alignItems: 'center'
    },
    buttonTextContainer: {
      flex: 1,
      alignItems: 'flex-start',
    },
    textContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    inputText: {
        // flex: 1,
        // flexDirection: 'row'
    },
    textSection: {
      // padding: 30,
      paddingVertical: 20,
      rowGap: 20,
      
    },
    setUp: {
    padding: 30,
    flexDirection: 'row',
    alignItems: 'center'
    },
    tagSection: {
        rowGap: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 10,
        paddingBottom: 30,

    },
    tagsContainer: {
      
    },
    tagStyle: {
      borderColor: 'lightblue', 
      backgroundColor: 'lightblue',
      borderWidth: 2,
      borderRadius: 20,
      // backgroundColor: 'black',
      padding: 15,
      margin: 5
    },
    createContainer: {
 
      alignItems: 'center',

    },
    closeButton: {
      backgroundColor: '#F5F5F5', // Example background color
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    buttonText: {
      fontSize: 21,
      color: '#1B1B1B',
    },
    textInputContainer: {
     backgroundColor: 'white',
     width: width/2,
     height: 50,
    paddingLeft: 15,
    paddingRight: 15,
    },
    resultContainer: {
      flex: 1,
      backgroundColor: scheme.white,
      borderRadius: 10,
      padding: 15,
      paddingVertical: 25, 
      marginTop: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      // elevation: 3, // for Android
    },
    touchableDelete: {
      marginLeft: 'auto'
    },
    editIcon: {
      paddingHorizontal: 20
    },
    flatList: {
      flex: 1,
    },
  });

  export default styles;