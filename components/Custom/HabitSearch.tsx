import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, Pressable, Modal, Dimensions, TouchableWithoutFeedback , TouchableOpacity, Keyboard} from 'react-native';
import { SearchBar } from '@rneui/themed';
import {ButtonState} from '@/Types/ActivityTypes'
import {useAppContext} from '@/contexts/AppContext'
import styles from '@/styles/habitSearchStyles';

interface HabitSearchProps {
    onClick: (text: string) => void;
}

const HabitSearch: React.FC<HabitSearchProps> = ({ onClick }) =>{
    const {customActivities} = useAppContext();
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<ButtonState[]>(customActivities);
    
    useEffect(() => {
        const alphabeticalActs = customActivities.sort((a, b) => a.text.localeCompare(b.text));
        setResults(alphabeticalActs);
    }, [customActivities])
    const handleSearch = (text: string) => {
        setQuery(text);
        if (text.trim() === '') {
        setResults(customActivities);
        } else {
        const filteredResults = results.filter((activity: ButtonState) =>
            activity.text.toLowerCase().includes(text.toLowerCase()) ||
            activity.keywords.some(keyword => keyword.toLowerCase().includes(text.toLowerCase()))
        );
        setResults(filteredResults);
        }
    };

    const clearSearch = () => {
        setQuery('');
        setResults(customActivities);
      };

    return (
      
        <View style={styles.search}>
          <SearchBar
            placeholder="Search habits"
            value={query}
            onChangeText={handleSearch}
            onClear={clearSearch}
            platform="default"
            autoFocus={true}
            round
            containerStyle={styles.searchBarContainer}
            inputContainerStyle={styles.searchBarInputContainer}
            inputStyle={styles.searchBarInput}
          />
          
          <FlatList
            data={results}
            keyExtractor={(item) => item.text}
            style={styles.flatList}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => onClick(item.text)}>
              <View style={styles.resultContainer}>
                  <Text style={styles.resultText}>{item.text}</Text>
              </View>
              </TouchableOpacity>
            )}
            keyboardShouldPersistTaps="handled"
          />
        </View>
    )
}

export default HabitSearch;