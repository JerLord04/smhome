import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button, ScrollView, Modal, Switch, Dimensions, RefreshControl } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function test_rount({ route, navigation }) {
    const previous_data = route.params;
    console.log(previous_data.itemId);
    console.log(previous_data.otherParam);
    return (
        <View>
            <Text>itemId: {previous_data.room_id}</Text>
            <Text>otherParam: {previous_data.room_name}</Text>
        </View>
    );
}

export default test_rount;