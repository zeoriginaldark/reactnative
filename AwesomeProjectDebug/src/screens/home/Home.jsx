import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useNavigation} from '@react-navigation/native';

import { AuthContext } from '../../context/AuthContext';

function HomeScreen(){
  const navigation = useNavigation();

  const {userInfo} = useContext(AuthContext);

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
          <Text style={styles.header}>Hello {userInfo.profile.firstName}!</Text>
          <View style={styles.buttoncontainer}>
            <TouchableOpacity
              style={styles.button}
              title="Profile"
              onPress={() => navigation.navigate('Profile')}>
              <Text style={styles.buttonText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              title="Profile"
              onPress={() => navigation.navigate('Tabs')}>
              <Text style={styles.buttonText}>Tabs</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              title="Profile"
              onPress={() => navigation.navigate('Products')}>
              <Text style={styles.buttonText}>Products</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  buttoncontainer: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  straycontainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default HomeScreen;
