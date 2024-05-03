import React from 'react';

import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import HomeScreen from './screens/home/Home';
import RegisterScreen from './screens/register/Register';
import LoginScreen from './screens/login/Login';
import ProfileScreen from './screens/profile/Profile';
import TabScreen from './screens/tab/Tabs';
import ProductsScreen from './screens/products/Products';
import { PaperProvider, MD3LightTheme, adaptNavigationTheme } from 'react-native-paper';

const Drawer = createDrawerNavigator();
const {LightTheme} = adaptNavigationTheme({reactNavigationLight: DefaultTheme});

function App(): JSX.Element {
  return (
    <PaperProvider theme={MD3LightTheme}>
      <NavigationContainer theme={LightTheme}>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Register" component={RegisterScreen} />
          <Drawer.Screen name="Login" component={LoginScreen} />
          <Drawer.Screen name="Profile" component={ProfileScreen} />
          <Drawer.Screen name="Tabs" component={TabScreen} />
          <Drawer.Screen name="Products" component={ProductsScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
