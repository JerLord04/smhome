import React from 'react';
import { FlatList ,View,Text,Button} from 'react-native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  // ... other items
];

function Item({ title }) {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
}

export default function test1() {
  return (
    <FlatList
      data={DATA}
      renderItem={({ item }) => <Button title={item.title} />}
      keyExtractor={item => item.id}
    />
  );
}