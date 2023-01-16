import React, { useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { KeycodeInput } from 'react-native-keycode'
// import AsyncStorage from '@react-native-async-storage/async-storage';

const CreatePin = ({ navigation }) => {
  const [value, setValue] = useState('');
  const [numeric, setNumeric] = useState(true);

  const completePin = (pinCode) => {
    const pin_code = {
      pin_num: pinCode
    };
    // await AsyncStorage.setItem('@pincode_beforeConfirm',pinCode)
    // const pin_data = await AsyncStorage.getItem('@pincode_beforeConfirm')
    // alert(`PIN CODE IS ${pin_data}`)
    setValue('')
    navigation.navigate('ConfirmPin', pin_code)
  }
  return (
    <View style={styles.container}>

      <Text style={{fontSize:20}}>Create your PIN code</Text>

      <KeycodeInput
        length={6}
        numeric={numeric}
        value={value}
        onChange={(newValue) => setValue(newValue)}
        onComplete={(completedValue) => {
          completePin(completedValue);
        }} />
    </View>
  );
}

export default CreatePin

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingBottom: 200
  },
})