import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Keyboard, Platform, TouchableWithoutFeedback, KeyboardAvoidingView} from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'expo-router';
import {firestore} from '@/firebase/firebase'
import { setDoc, doc } from 'firebase/firestore';
import scheme from '@/utils/colorScheme';

const setUserTimezone = async (userId: string, timezone: string) => {
  const userRef = doc(firestore, 'users', userId);
  await setDoc(userRef, { timezone }, { merge: true });
};

const SignUpScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();
  
  // Function to get the user's timezone
  const getUserTimezone = () => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  };

  // Function to handle user signup
  const handleSignUp = async () => {
    const auth = getAuth();
    const timezone = getUserTimezone(); // Get the user's timezone

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Get the user ID
      const userId = user.uid;

      // Set the user's timezone in Firestore
      await setUserTimezone(userId, timezone);

      // Navigate to the home page
      router.push('/');
    } catch (error: any) {
      Alert.alert('Failed to create account. Please try again.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={scheme.mutedDarkGray}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={scheme.mutedDarkGray}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
        <View style={styles.buttonContainer}>
          <Button title="Sign Up" onPress={handleSignUp} />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: scheme.background,
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: 'mintcream',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    color: scheme.strongDarkGray,
    backgroundColor: 'mintcream',
  },
  buttonContainer: {
    marginTop: 12,
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default SignUpScreen;
