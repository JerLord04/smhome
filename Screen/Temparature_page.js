import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button, ScrollView, Modal, Switch, Dimensions, RefreshControl } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import axios from 'axios';
const baseUrl = 'http://192.168.1.7:5000';

function temperature_page({ navigation }) {
    const [data, setData] = useState([1, 1, 1, 1, 1]);
    const [labels, setLabels] = useState(["Null", "Null", "Null", "Null", "Null"])
    const [temperatureValueNow, setTemperatureValueNow] = useState(0)
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        console.log("useEffect activated");
        getHumidity_data();
        onRefresh();
    }, []);

    const getHumidity_data = () => {
        axios.get(`${baseUrl}/get_temperature_data`).then((response) => {
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
        });
    }
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getHumidity_data();
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
                        <Text style={{ color: '#FFFFFF', fontSize: 48, fontWeight: 'bold' }}>Living Room</Text>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: '#FFFFFF', marginLeft: 15, fontSize: 100 }}>{temperatureValueNow} %</Text>
                        </View>

                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        {
                            temperatureValueNow >= 40 && temperatureValueNow <= 60 ? (
                                <View>
                                    <Text style={{ color: '#FFFFFF', marginLeft: 15, fontSize: 30 }}>Normality</Text>
                                </View>
                            ) : temperatureValueNow <= 40 ? (
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
            </View>
        </ScrollView>
    );
}

export default temperature_page;