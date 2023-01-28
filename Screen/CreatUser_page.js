import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button } from 'react-native';
import { Checkbox, TextInput } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import creat_user_style from '../css/create_user_style'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePickerExample from '../test';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

function Create_user({ navigation }) {
    const defaultImage = require('../image/icon/user.png');
    const [user, setUser] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPass, setConfirmPass] = React.useState("");

    const checkPass = async () => {
        if (password == confirmPass && user != "" && password != "") {
            const data = {
                username: user,
                password: password
            };
            const userJson = JSON.stringify(data);
            const res = await axios.post('http://192.168.235.98:3000', userJson, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            navigation.navigate('Login')
        } else {
            alert("เกิดข้อผิดพลาด")
        }
    }
    // const [image, setImage] = React.useState(null);

    // const pickImage = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,
    //     });

    //     console.log(result);
    //     if (!result.canceled) {
    //         setImage(result.assets[0].uri);
    //     }
    // }

    return (
        <View style={creat_user_style.container}>
            <Text style={{ margin: 12 }}>สร้างบัญชีผู้ใช้งาน</Text>
            <Image
                style={{ height: 150, width: 150, margin: 12 }}
                source={require('../image/icon/user.png')}
            />
            {/* <Image source={{ uri: image }} style={{ width: 200, height: 200 ,margin:12 ,borderRadius:400/2}} /> */}
            {/* <Button style={{ margin: 12 }} color = '#B8BFB7' title="กรุณาเลือดรูปภาพ" onPress={pickImage} /> */}
            <TextInput
                label="ชื่อผู้ใช้งาน"
                style={creat_user_style.inputText}
                onChangeText={user => setUser(user)}
                value={user}
            />
            <TextInput
                label="รหัสผ่าน"
                style={creat_user_style.inputText}
                onChangeText={password => setPassword(password)}
                value={password}
            />
            <TextInput
                label="ยืนยันรหัสผ่าน"

                style={creat_user_style.inputText}
                onChangeText={confirmPass => setConfirmPass(confirmPass)}
                value={confirmPass}
            />
            <View style={creat_user_style.botton_styles}>
                <TouchableOpacity
                    onPress={checkPass}>
                    <Text style={creat_user_style.text_styles}>
                        สร้างผู้ใช้
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={creat_user_style.botton_styles_login}>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('Login') }}>
                    <Text style={creat_user_style.text_styles}>
                        ไปหน้าแรกทันที
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Create_user;