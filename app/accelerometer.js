import React, { useState, useEffect, useRef } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';

const INITIAL_DISTANCE = {
  x: 0,
  y: 0
}

const INITIAL_ACCELEROMETER = {
  prev: {
    x: 0,
    y: 0,
    z: 0
  },
  curr: {
    x: 0,
    y: 0,
    z: 0
  }
}

export default function App() {
  const [distance, setDistance] = useState(INITIAL_DISTANCE);
  const [accelerometerData, setAccelerometerData] = useState(INITIAL_ACCELEROMETER);
  const [velocity, setVelocity] = useState(INITIAL_DISTANCE)
  const [distances, setDistances] = useState([])

  const threshold = 0.005

  function getDistance(){
    return Math.sqrt(distance.x * distance.x + distance.y * distance.y)
  }

  function reset(){
    setDistances([...distances, getDistance()])
    setDistance(INITIAL_DISTANCE)
    setAccelerometerData(INITIAL_ACCELEROMETER)
    setVelocity(INITIAL_DISTANCE)
  }



  useEffect(() => {
    Accelerometer.setUpdateInterval(1000);
    let subscription;

    const _subscribe = () => {
      subscription = Accelerometer.addListener((data) => {
        let temp = {...accelerometerData}
        temp.prev = temp.curr
        temp.curr = data
        temp.curr.x *= 9.8
        temp.curr.y *= 9.8
        setAccelerometerData(temp);
      });
    };

    const _unsubscribe = () => {
      subscription && subscription.remove();
    };

    _subscribe();

    const calculateDistance = () => {
      const timeIntervalInSeconds = 0.02; // Assuming accelerometer updates every 0.02 seconds
      let velocityX = ((accelerometerData.prev.x + accelerometerData.curr.x) / 2) * timeIntervalInSeconds
      let velcotiyY = ((accelerometerData.prev.y + accelerometerData.curr.y) / 2) * timeIntervalInSeconds

      velocityX = Math.abs(velocityX) > threshold ? velocityX : 0
      velcotiyY = Math.abs(velcotiyY) > threshold ? velcotiyY : 0

      let tempVelocity = {...velocity}
      tempVelocity.x += velocityX
      tempVelocity.y += velcotiyY
      
      let tempDistance = {...distance}
      tempDistance.x += velocityX * timeIntervalInSeconds
      tempDistance.y += velcotiyY * timeIntervalInSeconds

      setVelocity(tempVelocity)
      setDistance(tempDistance)

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
      <Text style={styles.text}>ax: {accelerometerData.curr.x}</Text>
      <Text style={styles.text}>ay: {accelerometerData.curr.y}</Text>
      <Text style={styles.text}>vx: {velocity.x}</Text>
      <Text style={styles.text}>vy: {velocity.y}</Text>
      <Text style={styles.text}>dx: {distance.x}</Text>
      <Text style={styles.text}>dy: {distance.y}</Text>
      
      <Text style={styles.text}>distance: {getDistance()} meters</Text>
      <Button onPress={reset} title="Reset"></Button>
      {distances.map(dist => 
        <Text style={styles.text}>{dist}</Text>
      )}
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
