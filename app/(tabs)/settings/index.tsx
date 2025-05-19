import React from 'react';
import { View, Text, SectionList, StyleSheet, Pressable, Alert, Switch } from 'react-native';
import { useLogout } from '@/utils/useLogout';
import { useRouter } from 'expo-router';
import styles from '@/styles/settingsStyles'
import layout_styles from '@/styles/reusable/layoutStyles';
import font_styles from '@/styles/reusable/typography';

const Settings = () => {
  const router = useRouter();
  const logout = useLogout();

  const handleSave = () => {
    Alert.alert('Settings saved!');
  };

  const settingsSections = [
    {
      title: 'Account',
      data: [
        { key: 'User Info', onPress: () => router.push('/info') },
        { key: 'Log Out', onPress: logout },
      ],
    },
    {
      title: 'Actions',
      data: [
        { key: 'Save Settings', onPress: handleSave },
      ],
    },
  ];

  return (
    <View style={layout_styles.layoutContainer}>
      <View style={layout_styles.titleContainer}>
        <Text style={font_styles.headerStyle}>Settings</Text>
      </View>
      <View style={layout_styles.bodyContainer}>
        <SectionList
          sections={settingsSections}
          keyExtractor={(item) => item.key}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          renderItem={({ item }) => (
            <Pressable style={styles.item} onPress={item.onPress}>
              <Text style={styles.itemText}>{item.key}</Text>
            </Pressable>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </View>
  );
};

export default Settings;
