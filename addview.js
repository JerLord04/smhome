import { View, Text, Button } from 'react-native';
import React , {useState} from 'react';

const addView = () => {
  const [views, setViews] = useState([]);

  const addView = () => {
    setViews([...views, 
        <View key={views.length} style={{backgroundColor: 'red', height: 100, width: 100}} >
            <Text>Hello World</Text>
        </View>

    ]);
  }

  return (
    <View>
      <Button onPress={addView} title="Add View" />
      {views}
    </View>
  );
}
export default addView; 

// import { View, Text, Button } from 'react-native';

// const MyApp = () => {
//   const [components, setComponents] = useState([<View key="1" style={{backgroundColor: 'red', height: 100, width: 100}} />, <View key="2" style={{backgroundColor: 'green', height: 100, width: 100}} />]);

//   const deleteComponent = (key) => {
//     setComponents(components.filter((component) => component.key !== key));
//   }

//   return (
//     <View>
//       {components.map((component) => (
//         <View key={component.key}>
//           <Button onPress={() => deleteComponent(component.key)} title="Delete" />
//           {component}
//         </View>
//       ))}
//     </View>
//   );
// }