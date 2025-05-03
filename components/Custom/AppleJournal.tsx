import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text, GestureResponderEvent } from 'react-native';

interface ModalCircleButtonProps {
  icon: React.ReactNode; // e.g., <Text>💡</Text> or a custom SVG
  onPress: (event: GestureResponderEvent) => void;
  size?: number;
}

const ModalCircleButton: React.FC<ModalCircleButtonProps> = ({ icon, onPress, size = 64 }) => {
  return (
    <TouchableOpacity style={[styles.circle, { width: size, height: size, borderRadius: size / 2 }]} onPress={onPress}>
      <View style={styles.iconContainer}>
        {icon}
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  circle: {
    backgroundColor: '#666666',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  iconContainer: {
    // fontSize: 28, // if using <Text> as icon
  },
});

export default ModalCircleButton;
