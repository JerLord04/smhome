import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button, ScrollView, Modal } from 'react-native';

function MyPage_1() {
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (!refresh) {
      // Perform the refresh action here
      console.log("Refresh completed");
      setRefresh(false);
    }
  }, [refresh]);

  return (
    <View>
      <Button
        title="Refresh"
        onPress={() => setRefresh(!refresh)}
      />
    </View>
  );
}

export default MyPage_1;