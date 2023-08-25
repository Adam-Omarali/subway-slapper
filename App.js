import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import {useState, useEffect } from 'react';
import { Accelerometer } from 'expo-sensors';

export default function App() {
  const [ {x, y, z}, setData] = useState({ x: 0, y: 0, z: 0});

  useEffect(() => {
    const subscription = Accelerometer.addListener(setData);
  }, []);

  return (
    <View style={styles.container}>
      <Text>x: {x}</Text>
      <Text>y: {y}</Text>
      <Text>z: {z}</Text>
      <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
