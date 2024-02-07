import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './screens/home/Home';
import RegisterScreen from './screens/register/Register';
import LoginScreen from './screens/login/Login';
import ProfileScreen from './screens/profile/Profile';
import TabScreen from './screens/tab/Tabs';
import ProductsScreen from './screens/products/Products';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
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
        {/* <Stack.Screen
            name="Product Details"
            component={ProductDetailsScreen}
          /> */}
        <Stack.Screen name="Products" component={ProductsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
