import { StyleSheet} from "react-native";

import scheme from "@/utils/colorScheme";
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    wrapper: {
    flex: 0.8,
    justifyContent: 'center',
  },

  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },

  overlay: {
    width: width * 0.94,
    backgroundColor: scheme.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 24, // more space on top
    minHeight: 220, // or whatever fits 2–3 fields
    alignSelf: 'center',
    paddingBottom: 40, // Push it higher up
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  cancelText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
  },

  addButtonContainer: {
    alignItems: 'center',
  },
  section: {
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 8,
  },

  searchArea: {
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    padding: 8,
    flexGrow: 1,

  },

  // timeContainer: {
  //   backgroundColor: 'white',
  //   borderRadius: 10,
  //   padding: 12,
  // },
  timeText: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 1,
  },
  timeContainer: {
  gap: 12,
  marginBottom: 24,
  },

timeRow: {
  backgroundColor: '#F2F2F7',
  borderRadius: 10,
  paddingVertical: 12,
  paddingHorizontal: 14,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  shadowColor: '#000',
  shadowOpacity: 0.05,
  shadowRadius: 4,
  elevation: 2,
},

timeContent: {
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
  justifyContent: 'space-between',
},

timeLabel: {
  fontSize: 16,
  color: '#444',
  marginLeft: 8,
  flex: 1,
},

timeValue: {
  fontSize: 16,
  fontWeight: '500',
  color: '#000',
},

});

export default styles;