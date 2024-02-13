import React from 'react';

import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './screens/home/Home';
import RegisterScreen from './screens/register/Register';
import LoginScreen from './screens/login/Login';
import ProfileScreen from './screens/profile/Profile';
import TabScreen from './screens/tab/Tabs';
import ProductsScreen from './screens/products/Products';
import { PaperProvider, MD3LightTheme, adaptNavigationTheme } from 'react-native-paper';

const Stack = createNativeStackNavigator();
const {LightTheme} = adaptNavigationTheme({reactNavigationLight: DefaultTheme});

function App(): JSX.Element {
  return (
    <PaperProvider theme={MD3LightTheme}>
      <NavigationContainer theme={LightTheme}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Tabs" component={TabScreen} />
        <Stack.Screen name="Products" component={ProductsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
