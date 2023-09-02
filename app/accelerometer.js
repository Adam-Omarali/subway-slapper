import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function App() {
  const [overallDist, setOverallDist] = useState(0.0);
  const [accelerometerData, setAccelerometerData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  let velocity = 0.0; // Initialize velocity to 0
  let distance = 0.0;
  useEffect(() => {
    Accelerometer.setUpdateInterval(1000);
    let subscription;

    const _subscribe = () => {
      subscription = Accelerometer.addListener((data) => {
        setAccelerometerData(data);
      });
    };

    const _unsubscribe = () => {
      subscription && subscription.remove();
    };

    _subscribe();

    const calculateDistance = () => {
      const { x, y } = accelerometerData;
      const timeIntervalInSeconds = 0.02; // Assuming accelerometer updates every 0.02 seconds
      const acceleration = Math.sqrt(x * x + y * y);
      velocity = velocity + acceleration * timeIntervalInSeconds;
      distance = velocity * timeIntervalInSeconds;

      setOverallDist(distance); // Set overallDist to the updated distance directly
    };

    const interval = setInterval(calculateDistance, 20); // Update every 20 milliseconds

    return () => {
      _unsubscribe();
      clearInterval(interval);
    };
  }, [accelerometerData]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Accelerometer: (in gs where 1g = 9.81 m/s^2)</Text>
      <Text style={styles.text}>x: {accelerometerData.x}</Text>
      <Text style={styles.text}>y: {accelerometerData.y}</Text>
      <Text style={styles.text}>distance: {overallDist.toFixed(10)} meters</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  text: {
    textAlign: 'center',
  },
});
