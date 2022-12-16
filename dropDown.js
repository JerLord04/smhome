import { View, Text} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React , {useState} from 'react';

const Dropdown = () => {
  const [selectedValue, setSelectedValue] = useState('java');

  return (
    <View>
      <Text>Select a programming language:</Text>
      <Picker
        selectedValue={selectedValue}
        style={{height: 50, width: 100}}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
        <Picker.Item label="Python" value="python" />
        <Picker.Item label="C++" value="cpp" />
      </Picker>
      <Text>Selected: {selectedValue}</Text>
    </View>
  );
}

export default Dropdown;