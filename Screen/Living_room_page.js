import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button, ScrollView, Modal, Switch } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Picker } from '@react-native-picker/picker';
import room_styles from '../css/room_styles';
import axios from 'axios';
import RNRestart from 'react-native-restart';
import io from 'socket.io-client';
const baseUrl = 'http://192.168.1.7:3000';


function Living_room({ navigation }, props) {
    const [humidity, setHumidity] = useState();
    const [confirm, setConfirm] = useState(0);
    const [selectedDevice, setSelectedDevice] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentDate, setCurrentDate] = useState('');
    const [views, setViews] = useState([]);
    const [toggleColor, setToggleColor] = useState('white')
    const [doorText, setDoortext] = useState('');
    const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    const [data, setData] = useState([]);
    const socket = io('http://192.168.1.7:5000');

    socket.on('status_sensor', (data) => {
        setDoortext(data.status_door);
        console.log(data.status_door)
        if (data.status_door == 'OPEN') {
            setToggleColor('red')
        } else[
            setToggleColor('white')
        ]
    });

    socket.on('humidity_value', (data) => {
        setHumidity(data.humudity_now)
    })

    useEffect(() => {
        console.log("useEffect activated")
        var date = new Date().getDate();
        var month = new Date().getMonth();
        var year = new Date().getFullYear();
        setCurrentDate(date + ',' + monthName[month] + ' ' + year);
        get_room_devices();
        console.log(1)
        socket.emit('useState_test_emit', 'Hello node.js')
    }, []);
    const get_room_devices = () => {
        axios.get(`${baseUrl}/roll_data_room1`).then((response) => {
            console.log(response.data);
            setData(response.data);
        });
    }


    const addView = () => {

        setModalVisible(!modalVisible);
        const item = {
            room_id: 1,
            sensor_id: selectedDevice
        }
        console.log("Add Component Complete.");
        axios.post(`${baseUrl}/insert_data`, item)
            .then(response => {
                console.log(response.data.msg);
                get_room_devices();
                alert(response.data.msg)
            })
            .catch(error => {
                console.error(error);
            });
    }

    const deleteComponent = (id) => {
        console.log("Delete Component Complete.");
        const item_id = {
            room_id: id
        }
        axios.post(`${baseUrl}/delete_device`, item_id)
            .then(response => {
                let { status, meg } = response.data;
                if (status) {
                    console.log(meg)
                    get_room_devices();
                    alert(response.data.msg)
                } else {
                    console.log(meg)
                }
                console.log(response.data)
            })
            .catch(error => {
                console.log(error);
            });
        // console.log(id)
    }
    return (
        <View style={room_styles.container}>
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={{ backgroundColor: '#D9D9D9', flex: 1, marginTop: 150, marginLeft: 25, marginRight: 25, marginBottom: 300, borderRadius: 10 }}>
                    <Text style={{ margin: 10 }}>Select a devices:</Text>
                    <Picker
                        selectedValue={selectedDevice}
                        style={{ flex: 1, borderColor: '#000000', marginLeft: 20 }}
                        onValueChange={(itemValue, itemIndex) => setSelectedDevice(itemValue)}>
                        <Picker.Item label="Door sensor" value={1} />
                        <Picker.Item label="Light bulb" value={2} />
                        <Picker.Item label="humidity" value={3} />
                        <Picker.Item label="temperature" value={4} />
                    </Picker>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 1, backgroundColor: '#AEAEAE', justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 10 }}>
                            <Text onPress={addView}>CONFIRM</Text>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#7F807F', justifyContent: 'center', alignItems: 'center', borderBottomRightRadius: 10 }}>
                            <Text onPress={() => { setModalVisible(!modalVisible); }}>CANCEL</Text>
                        </View>
                    </View>
                </View>

            </Modal>
            <Text style={{ color: '#D0D0D0', marginBottom: 5, marginTop: 15, marginLeft: 15, fontSize: 20 }}>{currentDate}</Text>
            <Text style={{ color: '#FFFFFF', marginLeft: 15, fontSize: 48, fontWeight: 'bold' }}>Living Room</Text>
            <ScrollView>
                <View>
                    {data.map((item) => (
                        item.name == 'Light bulb' ? (
                            <View key={item.id} style={room_styles.equipment_style} >
                                <View style={{ backgroundColor: '#497E3C', flex: 6, borderRadius: 10 }}>
                                    <View style={{ flex: 1, margin: 12 }}>
                                        <Text style={{ fontSize: 35, color: 'white', fontWeight: 'bold' }}>{item.name}</Text>
                                    </View>
                                    <View style={{ flex: 1, margin: 5, flexDirection: 'row' }}>
                                        <View style={{ backgroundColor: '#C6CDC6', flex: 1, margin: 10, justifyContent: 'center', alignItems: 'center' }}>
                                            <TouchableOpacity>
                                                <Text>ON</Text>
                                            </TouchableOpacity>
                                        </View>

                                        <View style={{ backgroundColor: '#868986', flex: 1, margin: 10, justifyContent: 'center', alignItems: 'center' }}>
                                            <TouchableOpacity>
                                                <Text>OFF</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <Button onPress={() => deleteComponent(item.id)} title="Delete" />
                            </View>
                        ) : item.name == 'Door sensor' ? (
                            <View key={item.id} style={room_styles.equipment_style} >
                                <View style={{ backgroundColor: '#497E3C', flex: 6, borderRadius: 10 }}>
                                    <View style={{ flex: 1, margin: 12 }}>
                                        <Text style={{ fontSize: 35, color: 'white', fontWeight: 'bold' }}>{item.name}</Text>
                                    </View>
                                    <View style={{ flex: 1, margin: 12, flexDirection: 'row' }}>
                                        <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold' }}>Status : </Text>
                                        <Text style={{ color: toggleColor, fontSize: 28, fontWeight: 'bold' }}>{doorText}</Text>
                                    </View>
                                </View>
                                <Button onPress={() => deleteComponent(item.id)} title="Delete" />
                            </View>
                        ) : item.name == 'Humidity' ? (
                            <View key={item.id} style={room_styles.equipment_style} >
                                <View style={{ backgroundColor: '#497E3C', flex: 6, borderRadius: 10 }}>
                                    <View style={{ flex: 1, margin: 12 }}>
                                        <Text style={{ fontSize: 35, color: 'white', fontWeight: 'bold' }}>{item.name}</Text>
                                    </View>
                                    <View style={{ flex: 1, margin: 12, flexDirection: 'row' }}>
                                        <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>Humidity now : </Text>
                                        <Text style={{ color: toggleColor, fontSize: 25, fontWeight: 'bold' }}>{humidity} °C</Text>

                                    </View>
                                    <View>
                                        <Text style={{ margin : 12,color: 'white', fontSize: 14 }} onPress={()=>{alert('Go to humidity page')}}>View more...</Text>
                                    </View>
                                </View>
                                <Button onPress={() => deleteComponent(item.id)} title="Delete" />

                            </View>
                        ) : (
                            <View key={item.id} style={room_styles.equipment_style} >
                                <View style={{ backgroundColor: '#497E3C', flex: 6, borderRadius: 10 }}>
                                    <View style={{ flex: 1, backgroundColor: 'red', margin: 12 }}>
                                        <Text style={{ fontSize: 35, color: 'white', fontWeight: 'bold' }}>{item.name}</Text>
                                    </View>
                                    <View style={{ flex: 1, backgroundColor: 'blue', margin: 12 }}>
                                        <Switch key={item.id} >
                                        </Switch>
                                    </View>
                                </View>
                                <Button onPress={() => deleteComponent(item.id)} title="Delete" />
                            </View>
                        )
                    ))}
                </View>
                <TouchableOpacity
                    onPress={() => { setModalVisible(true) }}
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