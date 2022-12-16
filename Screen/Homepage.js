import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button, ScrollView, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import homepage_style from '../css/homepage_style'
import { Colors } from 'react-native/Libraries/NewAppScreen';

function Homepage({ navigation }) {
    const [currentDate, setCurrentDate] = useState('');
    const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    useEffect(() => {
        var date = new Date().getDate();
        var month = new Date().getMonth();
        var year = new Date().getFullYear();
        setCurrentDate(date + ',' + monthName[month] + ' ' + year);
    }), [];

    const image = { uri: "https://reactjs.org/logo-og.png" };
    return (
        <View style={homepage_style.container}>
            <Text style={{ color: '#D0D0D0', marginBottom: 5, marginTop: 15, marginLeft: 15, fontSize: 20 }}>{currentDate}</Text>
            <Text style={{ color: '#FFFFFF', marginLeft: 15, fontSize: 48, fontWeight: 'bold' }}>Locations</Text>
            <ScrollView>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('Living_room') }}
                >
                    <ImageBackground source={require('../image/living_room.jpg')} resizeMode="cover" style={homepage_style.room1} imageStyle={{ borderRadius: 10 }}>
                        <View style={{ flex: 1, backgroundColor: "#9B9B9Bc0" }}>
                            <Text style={{ fontSize: 30, color: '#FFFFFF', margin: 10, fontWeight: 'bold' }}>Living Room</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('Bedroom') }}
                >
                    <ImageBackground source={require('../image/bedroom.jpg')} resizeMode="cover" style={homepage_style.room1} imageStyle={{ borderRadius: 10 }}>
                        <View style={{ flex: 1, backgroundColor: "#9B9B9Bc0" }}>
                            <Text style={{ fontSize: 30, color: '#FFFFFF', margin: 10, fontWeight: 'bold' }}>Bed Room</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('Kitchen') }}
                >
                    <ImageBackground source={require('../image/kitchen.jpg')} resizeMode="cover" style={homepage_style.room1} imageStyle={{ borderRadius: 10 }}>
                        <View style={{ flex: 1, backgroundColor: "#9B9B9Bc0" }}>
                            <Text style={{ fontSize: 30, color: '#FFFFFF', margin: 10, fontWeight: 'bold' }}>Kitchen</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('Rest_room') }}
                >
                    <ImageBackground source={require('../image/restroom.jpg')} resizeMode="cover" style={homepage_style.room1} imageStyle={{ borderRadius: 10 }}>
                        <View style={{ flex: 1, backgroundColor: "#9B9B9Bc0" }}>
                            <Text style={{ fontSize: 30, color: '#FFFFFF', margin: 10, fontWeight: 'bold' }}>Rest Room</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

export default Homepage;