import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, Text, TextInput, Keyboard } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

interface TimeInputProps {
  time: string;
  onTimeChange: (newTime: string) => void;
  custom?: string;
}

function isValidTime(text: string): boolean {
  const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i;
  return timeRegex.test(text.trim());
}

const TimeInput: React.FC<TimeInputProps> = ({ time, onTimeChange, custom = 'Type1' }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [internalTime, setInternalTime] = useState(time);

  useEffect(() => {
    setInternalTime(time); // Reset on open
  }, [time]);

  const handleTextChange = (text: string) => {
    setInternalTime(text);

    if (isValidTime(text)) {
      onTimeChange(text.trim());
      setIsEditing(false);
      Keyboard.dismiss();
    }
  };

  return (
    <View style={custom !== 'Type2' ? styles.container : styles.container2}>
      {isEditing ? (
        <TextInputMask
          type={'datetime'}
          options={{ format: 'hh:mm A' }}
          value={internalTime}
          onChangeText={handleTextChange}
          style={custom !== 'Type2' ? styles.input : styles.input2}
          placeholder="08:00 AM"
          keyboardType="numeric"
          maxLength={8}
          autoFocus
          onBlur={() => setIsEditing(false)}
        />
      ) : (
        <Pressable onPress={() => setIsEditing(true)}>
          <Text style={styles.display}>{time}</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { margin: 20 },
  container2: { marginLeft: 20 },
  input: {
    height: 50,
    fontSize: 18,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: 'black',
  },
  input2: {
    height: 30,
    fontSize: 14,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: 'black',
  },
  display: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    color: '#000',
  },
});

export default TimeInput;
