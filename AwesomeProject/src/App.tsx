import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './screens/home/Home';
import RegisterScreen from './screens/register/Register';
import LoginScreen from './screens/login/Login';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        {/* <Stack.Screen
            name="Product Details"
            component={ProductDetailsScreen}
          /> */}
        {/* <Stack.Screen name="Products" component={ProductsScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
