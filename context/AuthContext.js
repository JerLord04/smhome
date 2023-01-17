import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const baseUrl = 'http://192.168.1.7:3000';

export const AuthContext = createContext();

export const AuthProvider = ({ children , navigation}) => {
    useEffect(() => {
        console.log("useEffect Auth Activated");
    }, [])

    // const gotoPin = () => {
    //     navigation.navigate('Living_room')
    // }

    // const callToken = async (pinCode) => {

    // }
    return (
        <AuthContext.Provider value={{ }}>
            {children}
        </AuthContext.Provider>
    );
}