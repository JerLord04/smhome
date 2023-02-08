import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button, ScrollView, Modal, Switch, Dimensions, RefreshControl } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import axios from 'axios';
import instance from '../createAxios';

function Temperature_page({ route, navigation }) {
    const [roomName, setRoomname] = useState('No title')
    const [data, setData] = useState([1, 1, 1, 1, 1]);
    const [labels, setLabels] = useState(["Null", "Null", "Null", "Null", "Null"])
    const [temperatureValueNow, setTemperatureValueNow] = useState(0)
    const [refreshing, setRefreshing] = useState(false);
    const previous_data = route.params;
    console.log(previous_data);

    useEffect(() => {
        console.log("useEffect activated");
        read_temperature_data();
        onRefresh();
        get_room_name();
    }, []);

    const read_temperature_data = () => {
        const data_tmp = route.params;
        instance.get('/dht/get_t_h_value', {
            headers: { 'Content-Type': 'application/json' },
            params: data_tmp,
        }).then(response => {
            console.log("read_humidity_data function activated");
            let data_tmp = [1, 1, 1, 1, 1];
            let data_labels = ["Null", "Null", "Null", "Null", "Null"];
            const res_tmp = response.data;
            let arraySize = res_tmp.length - 1;
            console.log(arraySize);

            for (const k in res_tmp) {
                let bin = data_tmp.shift();
                let bin_label = data_labels.shift();
            }
            console.log(res_tmp[0].date);
            for (const k in res_tmp) {
                let date = res_tmp[arraySize - k].date.split(' ');
                data_labels.push(date[3]);
                data_tmp.push(res_tmp[arraySize - k].tvalue);
            }

            console.log(data_tmp);
            setData(data_tmp);
            setLabels(data_labels);
            setTemperatureValueNow(data_tmp[4])
        })
    }

    const get_room_name = () => {
        const data_tmp = route.params;

        instance.post('/room/get_room_name', data_tmp)
            .then(response => {
                console.log(response.data[0].name);
                setRoomname(response.data[0].name);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        read_temperature_data();
        // getHumidity_data();
        wait(1000).then(() => setRefreshing(false));
    }, []);

    return (
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
            style={{ flex: 1, backgroundColor: '#000000' }}
        >
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column' }}>
                        <Text style={{ color: '#FFFFFF', fontSize: 48, fontWeight: 'bold' }}>{roomName}</Text>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: '#FFFFFF', marginLeft: 15, fontSize: 100 }}>{temperatureValueNow} °</Text>
                        </View>

                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        {
                            temperatureValueNow >= 35 ? (
                                <View>
                                    <Text style={{ color: '#FFFFFF', marginLeft: 15, fontSize: 30 }}>Very Hot 🌡️</Text>
                                </View>
                            ) : temperatureValueNow >= 30 ? (
                                <View>
                                    <Text style={{ color: '#FFFFFF', marginLeft: 15, fontSize: 30 }}>Hot 🔥</Text>
                                </View>
                            ) : temperatureValueNow >= 25 ? (
                                <View>
                                    <Text style={{ color: '#FFFFFF', marginLeft: 15, fontSize: 30 }}>Good weather ✨</Text>
                                </View>
                            ) : temperatureValueNow >= 20 ? (
                                <View>
                                    <Text style={{ color: '#FFFFFF', marginLeft: 15, fontSize: 30 }}>Cold 😰</Text>
                                </View>
                            ) : (
                                <View>
                                    <Text style={{ color: '#FFFFFF', marginLeft: 15, fontSize: 30 }}>Very cold 🥶</Text>
                                </View>
                            )
                        }
                    </View>

                </View>
                <LineChart
                    data={{
                        labels: labels,
                        datasets: [
                            { data }
                        ]
                    }}
                    width={Dimensions.get("window").width}
                    height={220}
                    yAxisSuffix="°C"
                    yAxisInterval={1}
                    chartConfig={{
                        backgroundColor: "#9AA09D",
                        backgroundGradientFrom: "#656565",
                        backgroundGradientTo: "#ffa726",
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#ffa726"
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                        margin: 12
                    }}
                />
            </View>
        </ScrollView>
    );
}

export default Temperature_page;