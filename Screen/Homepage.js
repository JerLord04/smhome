import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button, ScrollView, ImageBackground, RefreshControl } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import homepage_style from '../css/homepage_style'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import instance from '../createAxios';

function Homepage({ navigation }) {
    const [livingroom_name, setLivingRoomName] = useState('Living Romm');
    const [bedroom_name, setBedroomName] = useState('Bed Romm');
    const [kitchen_name, setKitchenName] = useState('Kitchen');
    const [restRoom, setRestroomName] = useState('Rest Romm');
    const [currentDate, setCurrentDate] = useState('');
    const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    const [refreshing, setRefreshing] = useState(false);
    useEffect(() => {
        var date = new Date().getDate();
        var month = new Date().getMonth();
        var year = new Date().getFullYear();
        setCurrentDate(date + ',' + monthName[month] + ' ' + year);
        get_room_name();
        checkToken();
    }), [];

    const checkToken = async () => {
        const token = await AsyncStorage.getItem('@accessToken')
        const send_token = {
            token: token
        }
        instance.post('/auth/verify_token', send_token)
            .then(response => {
                console.log(response.data);
                if (response.data.status === false) {
                    navigation.navigate('Pin')
                }
            })
            .catch(error => {
                console.log(error);
            });
        // console.log( "Token : " + token);
    }

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        get_room_name();
        wait(1000).then(() => setRefreshing(false));
    }, []);

    const get_room_name = () => {
        instance.post('/room/get_all_room_name')
            .then(response => {
                console.log(response.data);
                setLivingRoomName(response.data[0].name);
                setBedroomName(response.data[1].name);
                setRestroomName(response.data[2].name);
                setKitchenName(response.data[3].name);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const image = { uri: "https://reactjs.org/logo-og.png" };
    return (
        <View style={homepage_style.container}>
            <Text style={{ color: '#D0D0D0', marginBottom: 5, marginTop: 15, marginLeft: 15, fontSize: 20 }}>{currentDate}</Text>
            <Text style={{ color: '#FFFFFF', marginLeft: 15, fontSize: 48, fontWeight: 'bold' }}>Locations</Text>
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
                style={{ flex: 1, backgroundColor: '#000000' }}
            >
                <TouchableOpacity
                    onPress={() => {
                        checkToken()
                        navigation.navigate('Living_room')
                    }}
                >
                    <ImageBackground source={require('../image/living_room.jpg')} resizeMode="cover" style={homepage_style.room1} imageStyle={{ borderRadius: 10 }}>
                        <View style={{ flex: 1, backgroundColor: "#9B9B9Bc0", borderRadius: 10 }}>
                            <Text style={{ fontSize: 30, color: '#FFFFFF', margin: 10, fontWeight: 'bold' }}>{livingroom_name}</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        checkToken()
                        navigation.navigate('Bedroom')
                    }}
                >
                    <ImageBackground source={require('../image/bedroom.jpg')} resizeMode="cover" style={homepage_style.room1} imageStyle={{ borderRadius: 10 }}>
                        <View style={{ flex: 1, backgroundColor: "#9B9B9Bc0", borderRadius: 10 }}>
                            <Text style={{ fontSize: 30, color: '#FFFFFF', margin: 10, fontWeight: 'bold' }}>{bedroom_name}</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        checkToken()
                        navigation.navigate('Kitchen')
                    }}
                >
                    <ImageBackground source={require('../image/kitchen.jpg')} resizeMode="cover" style={homepage_style.room1} imageStyle={{ borderRadius: 10 }}>
                        <View style={{ flex: 1, backgroundColor: "#9B9B9Bc0", borderRadius: 10 }}>
                            <Text style={{ fontSize: 30, color: '#FFFFFF', margin: 10, fontWeight: 'bold' }}>{kitchen_name}</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        checkToken()
                        navigation.navigate('Rest_room')
                    }}
                >
                    <ImageBackground source={require('../image/restroom.jpg')} resizeMode="cover" style={homepage_style.room1} imageStyle={{ borderRadius: 10 }}>
                        <View style={{ flex: 1, backgroundColor: "#9B9B9Bc0", borderRadius: 10 }}>
                            <Text style={{ fontSize: 30, color: '#FFFFFF', margin: 10, fontWeight: 'bold' }}>{restRoom}</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

export default Homepage;