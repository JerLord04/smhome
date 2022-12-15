import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button } from 'react-native';
import { TextInput } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import creat_user_style from '../css/create_user_style'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePickerExample from '../test';
import * as ImagePicker from 'expo-image-picker';

function Login_page({ navigation }) {
    const [user, setUser] = React.useState("");
    const [password, setPassword] = React.useState("");

    return (
        <View style={creat_user_style.container}>
            <Text style={{ margin: 12 }}>ลงชื่อเข้าใช้งาน</Text>
            <Image
                style={{ height: 150, width: 150 ,margin:12}}
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
            <View style={creat_user_style.botton_styles}>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('Login') }}>
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

export default Login_page;