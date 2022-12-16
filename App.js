import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from './css/style';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Create_user from './Screen/CreatUser_page';
import Login_page from './Screen/Login_page';
import Homepage from './Screen/Homepage';
import Living_room from './Screen/Living_room_page';
import Kitchen from './Screen/Kitchen_page';
import Rest_room from './Screen/Restroom';
import Bedroom from './Screen/Bedroom_page';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Homepage" component={Homepage}
        options={{
          title: '',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#000000',
          },
        }} />
      <Stack.Screen name="Living_room" component={Living_room}
        options={{
          title: '',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#E76319',
          },
        }} />
      <Stack.Screen name="Kitchen" component={Kitchen}
        options={{
          title: '',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#E76319',
          },
        }} />
      <Stack.Screen name="Rest_room" component={Rest_room}
        options={{
          title: '',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#E76319',
          },
        }} />
      <Stack.Screen name="Bedroom" component={Bedroom}
        options={{
          title: '',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#E76319',
          },
        }} />
      <Stack.Screen name="Create_user" component={Create_user}
        options={{
          title: '',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#E1E8E8',
          },
        }} />
      <Stack.Screen name="Login" component={Login_page}
        options={{
          title: '',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#E1E8E8',
          },
        }} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
export default App;
