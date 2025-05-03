import addHabitStyles from "@/styles/addHabitStyles";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, ModalProps, Modal, Dimensions } from "react-native";
import ModalCircleButton from "../Custom/AppleJournal";
import ConnectorLines from "../Custom/ConnectorLines";

// Get dimensions for responsive positioning
const { width, height } = Dimensions.get('window');
const BUTTON_SIZE = 64; // Size of the modal circle buttons
const PLUS_BUTTON_SIZE = width/5; // Match the size from index.tsx
const BOTTOM_OFFSET = height / 40.6;

interface AddHabitModalProps extends ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApplePickerPress: () => void;
    onCustomHabitPress: () => void;
}

const AddHabitModal: React.FC<AddHabitModalProps> = ({ isOpen, onClose, onApplePickerPress, onCustomHabitPress, ...modalProps }) => {
    if (!isOpen) return null;

    return (
            <Modal
              transparent={true}
              animationType="none"
              visible={isOpen}
              onRequestClose={onClose}
              {...modalProps}
            >
        <TouchableOpacity
            style={addHabitStyles.modalOverlay}
            onPress={onClose} // Close the modal when clicking outside
        >
            <ConnectorLines />
            <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-around', 
                width: '80%',
                alignSelf: 'center',
                position: 'absolute',
                bottom: BOTTOM_OFFSET + PLUS_BUTTON_SIZE + 150, // Position above the plus button with enough space
            }}>
                <ModalCircleButton icon={<Text style={{ fontSize: 28 }}>💡</Text>} onPress={onApplePickerPress} />
                <ModalCircleButton icon={<Text style={{ fontSize: 28 }}>✍️</Text>} onPress={onCustomHabitPress} />
            </View>
            </TouchableOpacity>
        </Modal>
    );
};

export default AddHabitModal;


