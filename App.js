import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from './css/style';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import axios from 'axios';

// import Create_user from './Screen/CreatUser_page';
// import Login_page from './Screen/Login_page';
import HavePin from './nav/havePin';
import UnPin from './nav/unPin';
import { AuthProvider } from './context/AuthContext';

const baseUrl = 'http://192.168.1.7:3000';

const Stack = createNativeStackNavigator();

function MyStack() {
  const [first, setFirst] = useState()
  useEffect(() => {
    checkData();
  }, [])

  const checkData = () => {
    axios.get(`${baseUrl}/count_pin_data`).then((response) => {
      let num = response.data.count
      if (num > 0) {
        console.log(num);
        setFirst(false)
      } else {
        console.log(num);
        setFirst(true)
      }
    });
  }

  return (
    <NavigationContainer>
      {first == true ? <UnPin /> : <HavePin />}
    </NavigationContainer>
  );
}

function App() {
  return (
    <AuthProvider>
      <MyStack />
    </AuthProvider>
  );
}
export default App;
