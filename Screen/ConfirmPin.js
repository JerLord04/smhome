import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { KeycodeInput } from 'react-native-keycode'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import instance from '../createAxios';

const ConfirmPin = ({ route, navigation }) => {
    const [value, setValue] = useState('');
    const [numeric, setNumeric] = useState(true);
    useEffect(() => {
    }, [])
    const completePin = (pinCode) => {
        const previous_data = route.params;
        if (pinCode == previous_data.pin_num) {
            const pin_datail = {
                pin_num: previous_data.pin_num
            }
            instance.post('/pin/insert_pin',pin_datail)
                .then(response => {
                    console.log(response.data.txt);
                    navigation.navigate('Pin')
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            alert("Your PIN is inccorect")
            navigation.navigate('CreatePin');
        }
    }
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20 }}>Confirm your PIN code</Text>
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
export default ConfirmPin
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingBottom: 200
    },
})