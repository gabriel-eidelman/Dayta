import React, { Dispatch, SetStateAction } from 'react';
import { View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import pickerSelectStyles from '@/utils/pickerSelectStyles';

interface TagDropdownProps {
    setTagValue: Dispatch<SetStateAction<string>>;
    tagValue: string;
  }
  const TagDropdown: React.FC<TagDropdownProps> = ({ tagValue, setTagValue }) => {
    const tags = [
      { label: 'Food/Drink', value: 'Food/Drink'},
      { label: 'Physical', value: 'Physical' },
      { label: 'Relax', value: 'Relax' },
      { label: 'Music', value: 'Music' },
      { label: 'Entertainment', value: 'Entertainment' },
      { label: 'Social', value: 'Social' },
      { label: 'Work/Study', value: 'Work/Study' },
      { label: 'Travel/Commute', value: 'Travel/Commute' },
      { label: 'Hobbies', value: 'Hobbies' },
      { label: 'Chores', value: 'Chores' },
      { label: 'Self-Improvement', value: 'Self-Improvement' },
      {label: 'Family Time', value: 'Family Time'},
      { label: 'Helping Others', value: 'Helping Others' },
      {label: 'Intaking Knowledge', value: 'Intaking Knowledge'},
      { label: 'Other', value: 'Other' },
    ]
    
    return (
      <View style={{padding: 5}}>
      <RNPickerSelect
        onValueChange={(value) => setTagValue(value)}
        items={tags}
        style={{
          ...pickerSelectStyles,
          placeholder: {
            color: 'black',  // Set the color of the placeholder text
          },
        }}
        value={tagValue}
        useNativeAndroidPickerStyle={false} // Important for custom styles on Android
        placeholder={{
          label: 'Select a tag',
          value: null,
          color: 'black',
        }}
      />
    </View>
    );
  };

  /*
interface TagDropdownProps {
  tagValue: string;
  setTagValue: React.Dispatch<React.SetStateAction<string>>;
}
const TagDropdown: React.FC<TagDropdownProps> = ({ tagValue, setTagValue }) => {
  const tags = [
    { label: 'Food/Drink', value: 'Food/Drink'},
    { label: 'Physical', value: 'Physical' },
    { label: 'Relax', value: 'Relax' },
    { label: 'Music', value: 'Music' },
    { label: 'Entertainment', value: 'Entertainment' },
    { label: 'Social', value: 'Social' },
    { label: 'Work/Study', value: 'Work/Study' },
    { label: 'Travel/Commute', value: 'Travel/Commute' },
    { label: 'Hobbies', value: 'Hobbies' },
    { label: 'Chores', value: 'Chores' },
    { label: 'Self-Improvement', value: 'Self-Improvement' },
    {label: 'Family Time', value: 'Family Time'},
    { label: 'Helping Others', value: 'Helping Others' },
    {label: 'Intaking Knowledge', value: 'Intaking Knowledge'},
    { label: 'Other', value: 'Other' },
  ]
  return (
    <RNPickerSelect
      value={tagValue}
      onValueChange={(value) => setTagValue(value)}
      items={tags}
    />
  );
};
  */