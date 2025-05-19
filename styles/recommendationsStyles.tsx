import { StyleSheet} from "react-native";
import scheme from "@/utils/colorScheme";
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    layoutContainer: {
     flex: 1,
     paddingTop: 10,
     backgroundColor: scheme.background,
   },
    bodyContainer: {
        flex: 5,
    },
    contentContainer: {
        flex: 1,
        paddingBottom: height/11.6, // Space at the bottom to accommodate the button
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    detailsButton: {
        backgroundColor: 'red'
    },
    stepContainer: {
        padding: 8,
        marginBottom: 10,

    },
    diveInButtonContainer: {
        alignItems: 'center',
    },
    recContainer: {
    backgroundColor: scheme.white,
    borderRadius: 20,
    padding: 20,
    width: width * 0.85, // or adjust to your liking
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    },

    recTitle: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    recCategory: {
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingVertical: 10,

    },
    categoryText: {
        color: scheme.strongDarkGray
    },
    bodyText: {
        fontSize: 20, 
        color: 'orange', 
        fontStyle: 'italic',
    },
    arrowContainer: {
        position: 'absolute',
        bottom: 30,
        right: 20,
    },
    arrowText: {
        fontSize: 40,
        color: '#000',
    },
})

export default styles;