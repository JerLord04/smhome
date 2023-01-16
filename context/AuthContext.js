import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const baseUrl = 'http://192.168.1.7:3000';

export const AuthContext = createContext();

export const AuthProvider = ({ children, navigation }) => {

    useEffect(() => {
        console.log("useEffect Auth Activated");
    }, [])

    const testReturn = () => {
        return 100;
    }

    const callToken = (pinCode) => {
        axios.post(`${baseUrl}/generate_token`, pinCode)
            .then(async response => {
                if (response.data.status == true) {
                    await AsyncStorage.setItem('@accessToken', response.data.token)
                    const accessToken = await AsyncStorage.getItem('@accessToken')
                    console.log(accessToken);
                } else {
                    console.log(response.data); 
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
    return (
        <AuthContext.Provider value={{ callToken , testReturn}}>
            {children}
        </AuthContext.Provider>
    );
}