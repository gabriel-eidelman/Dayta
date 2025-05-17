import { StyleSheet} from "react-native";

import scheme from "@/utils/colorScheme";
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    // Container style
    search: {
      maxHeight: 300, // ⬅️ fits your modal well and allows scrolling
      width: '100%',
      paddingHorizontal: 0,
        backgroundColor: 'white',
        borderRadius: 10,
    },
      // Search bar styles
      searchBarContainer: {
        backgroundColor: 'transparent',
        padding: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0,
      },
      searchBarInputContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        height: 36,
      },
      searchBarInput: {
        fontSize: 16,
        color: 'black',
      },
      // FlatList styles
      flatList: {
        maxHeight: 200,
      },
      // Result item styles
      resultContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: 'white',
       borderBottomWidth: 1,
        borderBottomColor: '#E5E5EA',
        // padding: 15,
        // marginTop: 10,
        // shadowColor: '#000',
        // shadowOpacity: 0.1,
        // shadowRadius: 10,
        // shadowOffset: { width: 0, height: 4 },
      },
      resultText: {
        // padding: 15,
        fontSize: 16,
        color: '#111'
        // borderBottomWidth: 1,
        // borderBottomColor: '#ccc',
      },
});

export default styles;