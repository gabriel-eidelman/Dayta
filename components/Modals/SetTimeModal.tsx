import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import {Button} from '@rneui/themed'

type TimeModalProps = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const TimeModal = ({ visible, onClose, children }: TimeModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>        
        <View style={styles.modalContainer}>
          {children}
          <View style={{ height: 120 }} />
          <Button title="Done" onPress={onClose} style={styles.closeButton} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
    modalContainer: {
    flex: 0.5,
    flexDirection: 'column',
    justifyContent: 'center',
    width: '90%',
    maxWidth: 350,
    backgroundColor: 'white',
    borderRadius: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    },
  closeButton: {

  },
});

export default TimeModal;
