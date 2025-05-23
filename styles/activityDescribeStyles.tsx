import { StyleSheet} from "react-native";

import scheme from "@/utils/colorScheme";
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const buttonWidth = width/6.25

const styles = StyleSheet.create({
    MultitaskModalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      ActivityDescribeModalContent: {
        flex: 0.5,
        width: width/1.1,
        height: height/2,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
      },
      headerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        gap: 10,
      },
      topRow: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      },
      deleteButton: {
        position: 'absolute',
        left: 16,
        top: '50%',
        transform: [{ translateY: -12 }],
        // padding: 10,
        zIndex: 10,
      },
      titleContainer: {
          position: 'absolute',
          left: 0,
          right: 0,
          alignItems: 'center',
      },
      editIcon: {
        position: 'absolute',
        top: '50%',
        transform: [{ translateY: -11 }],
      },
      bodyContainer: {

      },
      activityName: {
        // flex: 3,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'darkcyan'
      },
      exerciseSection: {
        marginTop: 'auto'
      },
      categoryContainer: {
        flexDirection: 'row',
        
      },
      category: { 
        fontSize: 15,
        color: 'red',
        marginHorizontal: 5

      },
      tagContainer: {
        marginLeft: 'auto'
      },
      tags: {
        fontSize: 12, 
        color: 'black'
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
        // alignItems: 'center',
      },
      rowContainer: {
        flex: 1,
        flexDirection: 'row',
      },

      // minusIcon: {
      //   marginLeft: 8,
      // },
      // addButton: {
      //   marginTop: 8,
      // },
      detailsContainer: {
        flexDirection: 'row',
        flex: 1, // Allows this section to take up the remaining space
      },
      name: {
        // flexDirection: 'row',
        // marginRight: 30,
          flexShrink: 1,
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

export default styles;