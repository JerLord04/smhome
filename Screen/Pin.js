import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { KeycodeInput } from 'react-native-keycode'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import instance from '../createAxios';

const Pin = ({ navigation }) => {

    // const { gotoPin } = useContext(AuthContext);

    // useEffect(() => {
    //     console.log(baseUrl);
    // }, [])

    const [token_asyn, setToken_asyn] = useState();
    const [value, setValue] = useState('');
    const [numeric, setNumeric] = useState(true);



    const completePin = (pinCode) => {
        const pin_datail = {
            pin_num: pinCode
        }
        instance.post('/auth/generate_token', pin_datail)
            .then(async response => {
                if (response.data.status == true) {
                    await AsyncStorage.setItem('@accessToken', response.data.token)
                    console.log(response.data.token);
                    setValue('')
                    navigation.navigate('Homepage')
                    // alert("PIN code is conrrect")
                } else {
                    setValue('')
                    console.log(response.data)
                    alert("PIN code is inconrrect")
                    // alert("PIN code is inconrrect")
                }
            })
            .catch(error => {
                console.log(error);
            });
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