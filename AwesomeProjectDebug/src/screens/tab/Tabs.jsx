import React from 'react';
import {View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

function RegisterScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Registering takes place here</Text>
    </View>
  );
}

function LoginScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Login takes place here</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Profile is seen here</Text>
    </View>
  );
}

const TabBarIcon = ({route, focused, color, size}) => {
  let iconName;

  if (route.name === 'Register') {
    iconName = focused ? 'menu' : 'menu-open';
  } else if (route.name === 'Login') {
    iconName = focused ? 'login' : 'login-variant';
  } else if (route.name === 'Profile') {
    iconName = focused ? 'face' : 'face-outline';
  }

  return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
};

function TabScreen() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          <TabBarIcon
            route={route}
            focused={focused}
            color={color}
            size={size}
          />;
        },

        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Register" component={RegisterScreen} />
      <Tab.Screen name="Login" component={LoginScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default TabScreen;
