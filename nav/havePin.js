import React from 'react';

import Homepage from '../Screen/Homepage'
import Living_room from '../Screen/Living_room_page';
import Kitchen from '../Screen/Kitchen_page';
import Rest_room from '../Screen/Restroom';
import Bedroom from '../Screen/Bedroom_page';
import Humidity_page from '../Screen/Humidity_page'
import Temperature_page from '../Screen/Temparature_page';
import Pin from '../Screen/Pin';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const HavePin = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Pin" component={Pin}
                options={{
                    title: '',
                    headerShown: false
                }} />
            <Stack.Screen name="Homepage" component={Homepage}
                options={{
                    title: '',
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: '#000000',
                    },
                }} />
            <Stack.Screen name="Living_room" component={Living_room}
                options={{
                    title: '',
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: '#E76319',
                    },
                }} />
            <Stack.Screen name="Kitchen" component={Kitchen}
                options={{
                    title: '',
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: '#E76319',
                    },
                }} />
            <Stack.Screen name="Rest_room" component={Rest_room}
                options={{
                    title: '',
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: '#E76319',
                    },
                }} />
            <Stack.Screen name="Bedroom" component={Bedroom}
                options={{
                    title: '',
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: '#E76319',
                    },
                }} />
            <Stack.Screen name="Humidity_page" component={Humidity_page}
                options={{
                    title: '',
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: '#E76319',
                    },
                }} />
            <Stack.Screen name="Temperature_page" component={Temperature_page}
                options={{
                    title: '',
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: '#E76319',
                    },
                }} />
        </Stack.Navigator>
    )
}

export default HavePin