import { StyleSheet} from "react-native";
import scheme from "@/utils/colorScheme";
import { Dimensions } from "react-native";

const { height } = Dimensions.get("window");

const layout_styles = StyleSheet.create({
    // Layout style
    layoutContainer: {
     flex: 1,
     paddingTop: 10,
     backgroundColor: scheme.background,
     position: 'relative', // Container must be relative for absolute positioning of child
   },
   contentContainer: {
     flex: 1,
     paddingBottom: 30, // Space at the bottom to accommodate the button
   },
   headerContainer: {
    flexDirection: 'row', 
     marginHorizontal: 24,
    //  flexDirection: 'row',
    //  justifyContent: 'space-between',
     justifyContent: 'center',
   },
   closeHeaderContainer: {
     paddingTop: 80,
     flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems: 'center',
     paddingBottom: 30,
   },
   titleContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 80,
   },
   bodyContainer: {
      flex: 15,
   },
   dateContainer: {
     alignItems: 'center',
     justifyContent: 'center',
   },
   plusButtonContainer: {
    position: 'absolute', // Absolute positioning to overlay everything
    bottom: height/40.6, // Space from the bottom of the container
    alignSelf: 'center',
    // width: buttonWidth
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
   activityContainer: {
     flex: 1,
     backgroundColor: scheme.white,
     borderRadius: 12,
     padding: 15,
     gap: 30,
     // marginTop: 10,
     borderColor: scheme.cardBorder,
     borderWidth: 0.1,
     shadowColor: '#000000',
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
     flexDirection: 'column',
     justifyContent: 'space-between',
     gap: 10,
   },

   title: {
     fontSize: 24,
     fontWeight: 'bold',
     marginBottom: 20,
   },

   });

export default layout_styles;