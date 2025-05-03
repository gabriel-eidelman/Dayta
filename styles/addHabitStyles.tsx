import { StyleSheet} from "react-native";

import scheme from "@/utils/colorScheme";
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)', // ✅ semi-transparent background
    },
    modalContent: {

    },
    
});

export default styles;