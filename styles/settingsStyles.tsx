import { StyleSheet} from "react-native";
import scheme from "@/utils/colorScheme";
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingTop: 50,
  },
  header: {
    fontSize: 28,
    fontWeight: '600',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  listContent: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    marginTop: 20,
    marginBottom: 8,
  },
  item: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: '#FFF',
    borderRadius: 12,
    justifyContent: 'center',
    elevation: 1, // Android shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  itemText: {
    fontSize: 16,
    color: '#1B1B1B',
  },
  separator: {
    height: 12,
  },
})

export default styles;