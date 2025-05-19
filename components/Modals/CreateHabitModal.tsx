import React, {useState, useEffect} from 'react';
import {Modal, View, Text, ModalProps, TextInput, Pressable, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, SafeAreaView,Dimensions,} from 'react-native';
import TimeModal from './SetTimeModal';
import layout_styles from '@/styles/reusable/layoutStyles';
import font_styles from '@/styles/reusable/typography';
import HabitSearch from '../Custom/HabitSearch';
import styles from '@/styles/createHabitModalStyles';
import TimeDropdown from '../TimeHandling/TimeDropdown';
import {createTimeBlock, formatNewTime, generateTimeString} from '@/utils/DateTimeUtils'
import {useAppContext} from '@/contexts/AppContext'
import {useAuth} from '@/contexts/AuthContext'
import FetchDayActivities from '@/Data/FetchDayActivities'
import {ButtonState, Activity, TimeBlock, ActivityWithEnd} from '@/Types/ActivityTypes'
import {Button} from '@rneui/themed'
import uuid from 'react-native-uuid';
import {TimeSelection} from '@/Types/TimeType';
import { Ionicons } from '@expo/vector-icons';
import {BlurView} from '@react-native-community/blur'
import scheme from '@/utils/colorScheme';

const MultiButton: ButtonState = {text: 'Multi-Activity', iconLibrary: "fontAwesome5", keywords: [], tags: [], icon: "tasks", pressed: false}


interface JournalCustomHabitProps extends ModalProps {
  visible: boolean;
  onCreateHabit: (name: string) => void;
  onClose: () => void;
}

const { height } = Dimensions.get('window');

const CreateHabitModal: React.FC<JournalCustomHabitProps> = ({ visible, onCreateHabit, onClose, ...modalProps }) => {

    //
  const [title, setTitle] = useState("");

  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
      {...modalProps}
    >
    {/* Main Modal */}
        {/* <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        > */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <TouchableWithoutFeedback onPress={() => {setTitle(""); onClose()}}>
              <View style={styles.backdrop} />
            </TouchableWithoutFeedback>
            <BlurView
              style={StyleSheet.absoluteFill}
              blurType="light" // options: 'light', 'dark', 'extraLight', 'regular', etc.
              blurAmount={10}
              reducedTransparencyFallbackColor="white"
            />

            <View style={styles.overlay}>
              <SafeAreaView>
                {/* Header */}
                <View style={styles.headerRow}>
                  <Pressable onPress={onClose}>
                    <Text style={styles.cancelText}>Cancel</Text>
                  </Pressable>
                  <Text style={font_styles.headerStyle}>Create Habit</Text>
                  <View style={{ width: 60 }} />
                </View>

                {/* Choose Habit */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Title</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Run for 10 minutes"
                  placeholderTextColor={scheme.mutedDarkGray}
                  value={title}
                  onChangeText={setTitle}
                  // keyboardType="email-address"
                  autoCapitalize="none"
                />
                </View>

                {/* <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Filler</Text>
\                  <Text>Filler</Text>
                </View> */}
              </SafeAreaView>
              <View style={styles.addButtonContainer}>
                  <Button title="Add" size="sm" onPress={() => {setTitle(""); onCreateHabit(title)}}/>
            </View>
            </View>
            </View>
        </TouchableWithoutFeedback>
      {/* </KeyboardAvoidingView> */}
    </Modal>
  );
};

export default CreateHabitModal;
