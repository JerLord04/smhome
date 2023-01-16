import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { KeycodeInput } from 'react-native-keycode'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {AuthContext} from '../context/AuthContext';
const baseUrl = 'http://192.168.1.7:3000';



const Pin = ({ navigation }) => {
    const {callToken,testReturn} = useContext(AuthContext);
    // useEffect(() => {
    //   console.log(useContext(AuthContext));
    // }, [])
    
    const [value, setValue] = useState('');
    const [numeric, setNumeric] = useState(true);
    const completePin = (pinCode) => {
        // let num = testReturn()
        // console.log(num);
        const pin_datail = {
            pin_num: pinCode
        }
        callToken(pin_datail)

    }
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20 }}>Enter your PIN code</Text>
            <KeycodeInput
                length={6}
                numeric={numeric}
                value={value}
                onChange={(newValue) => setValue(newValue)}
                onComplete={(completedValue) => {
                    completePin(completedValue);
                }} />
        </View>
    )
}

export default Pin

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingBottom: 200
    },
})