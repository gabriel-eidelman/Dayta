import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import {StyleSheet, View, Text} from 'react-native'
import {ThemedText} from '../ThemedText'
import {TimeSelection} from '@/Types/TimeType'

interface TimeDropdownProps {
    selectedTime: TimeSelection;
    onChange: (time: TimeSelection) => void;
    // selectedHour: string;
    // selectedMinute: string;
    // selectedPeriod: string; // AM or PM
    // onHourChange: (hour: string) => void;
    // onMinuteChange: (minute: string) => void;
    // onPeriodChange: (period: string) => void;
}

const TimeDropdown: React.FC<TimeDropdownProps> = ({   
  selectedTime,
  onChange,
    // selectedHour,
    // selectedMinute,
    // selectedPeriod,
    // onHourChange,
    // onMinuteChange,
    // onPeriodChange 
  }) => {
        const generateHourOptions = () => {
          const hours = [];
          for (let h = 1; h <= 12; h++) {
            hours.push(h < 10 ? `0${h}` : `${h}`);
          }
          return hours;
        };
      
        const generateMinuteOptions = () => {
          const minutes = [];
          for (let m = 0; m < 60; m++) {
            minutes.push(m < 10 ? `0${m}` : `${m}`);
          }
          return minutes;
        };

        const generatePeriodOptions = () => ['AM', 'PM'];
    
  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Hour:</Text>
        <Picker
          selectedValue={selectedTime.hour}
          onValueChange={(itemValue) => onChange({hour: itemValue as string, minute: selectedTime.minute, period: selectedTime.period})}
          style={styles.picker}
        >
          {generateHourOptions().map((hour) => (
            <Picker.Item key={hour} label={hour} value={hour} />
          ))}
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Minute:</Text>
        <Picker
          selectedValue={selectedTime.minute}
          onValueChange={(itemValue) => onChange({hour: selectedTime.hour, minute: itemValue as string, period: selectedTime.period})}
          style={styles.picker}
        >
          {generateMinuteOptions().map((minute) => (
            <Picker.Item key={minute} label={minute} value={minute} />
          ))}
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Period:</Text>
        <Picker
          selectedValue={selectedTime.period}
          onValueChange={(itemValue) => onChange({hour: selectedTime.hour, minute: selectedTime.minute, period: itemValue as string})}
          style={styles.picker}
        >
          {generatePeriodOptions().map((period) => (
            <Picker.Item key={period} label={period} value={period} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 10,
    },
    pickerContainer: {
      flex: 1,
      alignItems: 'center',
    },
    picker: {
      height: 120, // Fixed height is crucial
      width: '100%',
    },
    label: {
      fontSize: 16,
      marginBottom: 5,
    },
  });

  export default TimeDropdown;