import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Pressable } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import { useRouter } from 'expo-router';
import scheme from '@/utils/colorScheme';

interface Props {
  navigation: {
    navigate: (screen: string) => void;
  };
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (error: any) {
      Alert.alert('Incorrect Email/Password. Please Try Again');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
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
        />
        <View style={styles.buttonContainer}>
          <Button title="Login" onPress={handleLogin} />
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.signUpContainer} onPress={() => router.push('/Sign Up')}>
            <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
          </Pressable>
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
    borderColor: scheme.mint,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    color: scheme.strongDarkGray,
    backgroundColor: scheme.mint,
  },
  buttonContainer: {
    marginTop: 12,
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  signUpContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  signUpText: {
    color: "darkblue",
    fontSize: 16,
  },
});

export default LoginScreen;