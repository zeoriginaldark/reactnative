import React, {useContext} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';

import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { AuthContext } from '../context/AuthContext';

function AppNav(): JSX.Element {
  const {isLoading, userToken} = useContext(AuthContext);

  if(isLoading){
    return(
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size='large'/>
      </View>
    );
  }

  return (
      userToken !== null ?<AppStack /> : <AuthStack />
  );
}

export default AppNav;
