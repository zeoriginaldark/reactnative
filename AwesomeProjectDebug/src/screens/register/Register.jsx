/* eslint-disable no-alert */
import React, {useState} from 'react';
import axios from 'axios';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const baseUrl = 'https://reqres.in';

function RegisterScreen() {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    console.log('Signing up:', {firstName, lastName, email, password});
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      alert('Name or Email is invalid');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${baseUrl}/api/users`, {
        firstName,
        lastName,
        email,
      });

      if (response.status === 201) {
        alert(` You have created: ${JSON.stringify(response.data)}`);
        setIsLoading(false);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
      } else {
        throw new Error('An error has occurred');
      }
    } catch (error) {
      alert('An error has occurred');
      setIsLoading(false);
    }
  };

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={styles.container}>
          <View>
            {isLoading ? (
              <Text style={styles.header}> Signing Up </Text>
            ) : (
              <Text style={styles.header}>Sign Up</Text>
            )}
          </View>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={text => setFirstName(text)}
            editable={!isLoading}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={text => setLastName(text)}
            editable={!isLoading}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!isLoading}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            editable={!isLoading}
            secureTextEntry
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleSignUp}
            disabled={isLoading}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signInText}>
              Already have an account? Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 32,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  signInText: {
    marginTop: 20,
    color: 'blue',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default RegisterScreen;
