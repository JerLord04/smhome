import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import room_styles from '../css/room_styles';

function Living_room({ navigation }) {
    const [currentDate, setCurrentDate] = useState('');
    const [views, setViews] = useState([]);
    const [nextKey, setNextKey] = useState(1);
    const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    useEffect(() => {
        var date = new Date().getDate();
        var month = new Date().getMonth();
        var year = new Date().getFullYear();
        setCurrentDate(date + ',' + monthName[month] + ' ' + year);
    }), [];

    // const addView = () => {
    //     setViews([...views,
    //     <View key={views.length} style={room_styles.equipment_style} >
    //         <View style={{ backgroundColor: '#497E3C', flex: 6, borderRadius: 10 }}></View>
    //             <View style={{ backgroundColor: 'red', flex: 1, borderBottomRightRadius: 10, borderTopRightRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
    //                 <Image style={{ width: 20, height: 20 }} source={require('../image/icon/close.png')}></Image>
    //             </View>
    //     </View>
    //     ]);

    // }
    const addView = () => {
        const item = {
            key: 'key3',
            text: 'Test2'
        }
        setViews([...views, item]);
    }

    const deleteComponent = (key) => {
        setViews(views.filter((component) => component.key !== key));
    }


    return (
        <View style={room_styles.container}>
            <Text style={{ color: '#D0D0D0', marginBottom: 5, marginTop: 15, marginLeft: 15, fontSize: 20 }}>{currentDate}</Text>
            <Text style={{ color: '#FFFFFF', marginLeft: 15, fontSize: 48, fontWeight: 'bold' }}>Living Room</Text>
            <ScrollView>
                {views.map((item) => (
                    <View key={item.key} style={room_styles.equipment_style} >
                        <View style={{ backgroundColor: '#497E3C', flex: 6, borderRadius: 10 }}></View>
                        <Button onPress={() => deleteComponent(item.key)} title="Delete" />
                    </View>
                ))}
                <TouchableOpacity
                    onPress={addView}
                >
                    <View style={room_styles.add_button_styles}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={{ width: 20, height: 20 }} source={require('../image/icon/add.png')}></Image>
                        </View>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

export default Living_room;