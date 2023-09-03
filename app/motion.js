import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DeviceMotion } from 'expo-sensors';

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
    const [velocity, setVelocity] = useState(INITIAL_DISTANCE)
    const [accelerometerData, setAccelerometerData] = useState(INITIAL_ACCELEROMETER);
    const [distances, setDistances] = useState([])
    const [stopped, setStopped] = useState(false)

    const threshold = 0.003

    function getDistance(){
      //only x for now
      return Math.sqrt(distance.x * distance.x)
    }
  const [subscription, setSubscription] = useState(null);

  const timeIntervalInSeconds = 0.02; // Assuming accelerometer updates every 0.02 seconds


  const _slow = () => DeviceMotion.setUpdateInterval(1000);
  const _fast = () => DeviceMotion.setUpdateInterval(20);

  const _subscribe = () => {
    setSubscription(DeviceMotion.addListener(data => {
        let temp = {...accelerometerData}
        temp.prev = temp.curr
        temp.curr = data.acceleration
        setAccelerometerData(temp)

        calculateDistance()
    }));
  };

  const calculateDistance = () => {
    let velocityX = ((accelerometerData.prev.x + accelerometerData.curr.x) / 2) * timeIntervalInSeconds
    let velcotiyY = ((accelerometerData.prev.y + accelerometerData.curr.y) / 2) * timeIntervalInSeconds

    velocityX = Math.abs(velocityX) > threshold ? velocityX : 0
    velcotiyY = Math.abs(velcotiyY) > threshold ? velcotiyY : 0

    if(Math.abs(velocityX) > 0){
      setStopped(false)
    }
    else{
      setStopped(true)
    }

    let tempVelocity = {...velocity}
    tempVelocity.x += velocityX
    tempVelocity.y += velcotiyY
    
    let tempDistance = {...distance}
    tempDistance.x += tempVelocity.x * timeIntervalInSeconds
    tempDistance.y += tempVelocity.y * timeIntervalInSeconds

    setVelocity(tempVelocity)
    setDistance(tempDistance)

  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    _fast()
    return () => _unsubscribe();
  }, []);

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
      {distances.map((dist, idx) => 
        <Text style={styles.text} key={idx}>{dist}</Text>
      )}
      <Text style={`color:red`}>{stopped ? "STOPPED" : "MOVING"}</Text>
        {/* <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
          <Text>{subscription ? 'On' : 'Off'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_slow} style={[styles.button, styles.middleButton]}>
          <Text>Slow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast} style={styles.button}>
          <Text>Fast</Text>
        </TouchableOpacity> */}
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
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
});
