import React, { useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { KeycodeInput } from 'react-native-keycode'

const Pintest = () => {
  const [value, setValue] = useState('');
  const [numeric, setNumeric] = useState(true);
  const completePin = (pinCode) => {
    alert(`PIN CODE IS ${pinCode}`)
  }
  return (
    <View style={styles.container}>

      <Text style={styles.text}>Create your PIN code</Text>

      <KeycodeInput
        numeric={numeric}
        value={value}
        onChange={(newValue) => setValue(newValue)}
        onComplete={(completedValue) => {
          completePin(completedValue);
        }}/>


    </View>
  );
}

export default Pintest

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingBottom: 200
  },
  text: {
    fontSize: 18,
    marginBottom: 32
  },
});