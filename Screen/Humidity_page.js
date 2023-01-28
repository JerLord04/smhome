import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button, ScrollView, Modal, Switch, Dimensions, RefreshControl } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import axios from 'axios';
import {BASE_URL} from "@env"
const baseUrl = BASE_URL;

function Humidity_page({ route, navigation }) {
    const [roomName, setRoomname] = useState('No title')
    const [data, setData] = useState([1, 1, 1, 1, 1]);
    const [labels, setLabels] = useState(["Null", "Null", "Null", "Null", "Null"])
    const [humudutyValueNow, setHumidityValueNow] = useState(0)
    const [refreshing, setRefreshing] = useState(false);
    const previous_data = route.params;
    useEffect(() => {
        console.log("useEffect activated");
        read_humidity_data();
        onRefresh();
        get_room_name();
    }, []);

    const get_room_name = () => {
        const data_tmp = route.params;

        axios.post(`${baseUrl}/room/get_room_name`, data_tmp)
            .then(response => {
                console.log(response.data[0].name);
                setRoomname(response.data[0].name);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const read_humidity_data = () => {
        const data_tmp = route.params;
        axios.get(`${baseUrl}/dht/get_humi_data/`, {
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
                data_tmp.push(res_tmp[arraySize - k].value);
            }

            console.log(data_tmp);
            setData(data_tmp);
            setLabels(data_labels);
            setHumidityValueNow(data_tmp[4])
        })
    }

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        read_humidity_data();
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
                            <Text style={{ color: '#FFFFFF', marginLeft: 15, fontSize: 100 }}>{humudutyValueNow} %</Text>
                        </View>

                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        {
                            humudutyValueNow >= 40 && humudutyValueNow <= 60 ? (
                                <View>
                                    <Text style={{ color: '#FFFFFF', marginLeft: 15, fontSize: 30 }}>Normality</Text>
                                </View>
                            ) : humudutyValueNow <= 40 ? (
                                <View>
                                    <Text style={{ color: '#FFFFFF', marginLeft: 15, fontSize: 30 }}>Low humidity</Text>
                                </View>
                            ) : (
                                <View>
                                    <Text style={{ color: '#FFFFFF', marginLeft: 15, fontSize: 30 }}>High humidity</Text>
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
                <Button title='Test post' onPress={read_humidity_data}></Button>
            </View>
        </ScrollView>
    );
}

export default Humidity_page;