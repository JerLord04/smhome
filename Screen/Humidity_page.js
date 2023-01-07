import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button, ScrollView, Modal, Switch, Dimensions, RefreshControl } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import axios from 'axios';
const baseUrl = 'http://192.168.1.7:5000';
const baseUrl_host = 'http://192.168.1.7:3000';

function Humidity_page({ route, navigation }) {
    const [roomName, setRoomname] = useState('No title')
    const [data, setData] = useState([1, 1, 1, 1, 1]);
    const [labels, setLabels] = useState(["Null", "Null", "Null", "Null", "Null"])
    const [humudutyValueNow, setHumidityValueNow] = useState(0)
    const [refreshing, setRefreshing] = useState(false);

    const previous_data = route.params;

    useEffect(() => {
        console.log("useEffect activated");
        getHumidity_data();
        onRefresh();
        get_room_name();
    }, []);

    const get_room_name = () => {
        const data_tmp = route.params;

        axios.post(`${baseUrl_host}/get_room_name`, data_tmp)
            .then(response => {
                console.log(response.data[0].name);
                setRoomname(response.data[0].name);
            })
            .catch(error => {
                console.log(error);
            });
        // axios.get('http://192.168.1.7:3000/search', {
        //     headers: { 'Content-Type': 'application/json' },
        //     params: {
        //         ID: 12345
        //     },
        //     data: {
        //         firstName: 'John',
        //         lastName: 'Doe'
        //     }
        // })
        //     .then(response => {
        //         console.log(response.data);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
    }

    const getHumidity_data = () => {
        const data_tmp = route.params;
        axios.get(`${baseUrl}/get_humidity_data`, {
            headers: { 'Content-Type': 'application/json' },
            params: data_tmp,
        }).then(response => {
            let array_value = data;
            let array_date = labels;
            console.log(array_value);
            array_value[0] = response.data[4].value;
            array_value[1] = response.data[3].value;
            array_value[2] = response.data[2].value;
            array_value[3] = response.data[1].value;
            array_value[4] = response.data[0].value;
            let i = 4;
            let mytime = [];
            for (const split_data in response.data) {
                mytime[split_data] = response.data[i - split_data].date.split(" ");
            }
            console.log(mytime[0][3]);
            array_date[0] = mytime[0][3];
            array_date[1] = mytime[1][3];
            array_date[2] = mytime[2][3];
            array_date[3] = mytime[3][3];
            array_date[4] = mytime[4][3];
            setHumidityValueNow(array_value[4])
            setLabels(array_date);
            setData(array_value);
            console.log("Pass");
        })
        // axios.get(`${baseUrl}/get_humidity_data`).then((response) => {
        //     let array_value = data;
        //     let array_date = labels;
        //     console.log(array_value);
        //     array_value[0] = response.data[4].value;
        //     array_value[1] = response.data[3].value;
        //     array_value[2] = response.data[2].value;
        //     array_value[3] = response.data[1].value;
        //     array_value[4] = response.data[0].value;
        //     let i = 4;
        //     let mytime = [];
        //     for (const split_data in response.data) {
        //         mytime[split_data] = response.data[i - split_data].date.split(" ");
        //     }
        //     console.log(mytime[0][3]);
        //     array_date[0] = mytime[0][3];
        //     array_date[1] = mytime[1][3];
        //     array_date[2] = mytime[2][3];
        //     array_date[3] = mytime[3][3];
        //     array_date[4] = mytime[4][3];
        //     setHumidityValueNow(array_value[4])
        //     setLabels(array_date);
        //     setData(array_value);
        //     console.log("Pass");
        // });
    }
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getHumidity_data();
        wait(1000).then(() => setRefreshing(false));
    }, []);
    // const addValue = () => {
    //     let random_num = Math.random() * 10;
    //     let data_tmp = data;
    //     let labels_tmp = labels;
    //     let tmpShiftPoint1 = data_tmp.shift();
    //     let tmpShiftPoint2 = labels_tmp.shift();
    //     data_tmp.push(random_num);
    //     labels_tmp.push("July");
    //     setData(data_tmp);
    //     setLabels(labels_tmp)
    //     console.log(data);
    // }

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
                            <Text style={{ color: '#FFFFFF', marginLeft: 15, fontSize: 100 }}>{humudutyValueNow} °</Text>
                        </View>

                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        {
                            humudutyValueNow >= 35 ? (
                                <View>
                                    <Text style={{ color: '#FFFFFF', marginLeft: 15, fontSize: 30 }}>Very Hot 🌡️</Text>
                                </View>
                            ) : humudutyValueNow >= 30 ? (
                                <View>
                                    <Text style={{ color: '#FFFFFF', marginLeft: 15, fontSize: 30 }}>Hot 🔥</Text>
                                </View>
                            ) : humudutyValueNow >= 25 ? (
                                <View>
                                    <Text style={{ color: '#FFFFFF', marginLeft: 15, fontSize: 30 }}>Good weather ✨</Text>
                                </View>
                            ) : humudutyValueNow >= 20 ? (
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
                    width={Dimensions.get("window").width} // from react-native
                    height={220}
                    yAxisSuffix="°C"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                        backgroundColor: "#9AA09D",
                        backgroundGradientFrom: "#656565",
                        backgroundGradientTo: "#ffa726",
                        decimalPlaces: 2, // optional, defaults to 2dp
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
                <Button title='Test post' onPress={get_room_name}></Button>
            </View>
        </ScrollView>
    );
}

export default Humidity_page;