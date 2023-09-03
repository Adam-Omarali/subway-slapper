// import React, { useState, useEffect, useRef } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { Accelerometer } from 'expo-sensors';

// export default function App() {
//   const [overallDist, setOverallDist] = useState(0.0);
//   const accelerometerDataRef = useRef({
//     x: 0,
//     y: 0,
//     z: 0,
//   });
//   let velocity = 0.0; // Initialize velocity to 0
//   let distance = 0.0;

//   useEffect(() => {
//     let subscription;

//     const _subscribe = () => {
//       subscription = Accelerometer.addListener((data) => {
//         accelerometerDataRef.current = data;
//       });
//     };

//     const _unsubscribe = () => {
//       subscription && subscription.remove();
//     };

//     _subscribe();

//     const calculateDistance = () => {
//       const { x, y, z } = accelerometerDataRef.current;
//       const timeIntervalInSeconds = 0.5; // Assuming accelerometer updates every 0.5 seconds
    
//       // Calculate acceleration magnitude taking into account signs
//       const acceleration = Math.sqrt(x * x + y * y);
    
//       velocity += acceleration * timeIntervalInSeconds;
//       distance += velocity * timeIntervalInSeconds;
    
//       setOverallDist(distance); 
//     };
    

//     const interval = setInterval(calculateDistance, 500); // Update every 500 milliseconds

//     return () => {
//       _unsubscribe();
//       clearInterval(interval);
//     };
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Accelerometer: (in gs where 1g = 9.81 m/s^2)</Text>
//       <Text style={styles.text}>distance: {overallDist.toFixed(10)} meters</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//   },
//   text: {
//     textAlign: 'center',
//   },
// });
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function App() {
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);

  const _slow = () => Accelerometer.setUpdateInterval(1000);
  const _fast = () => Accelerometer.setUpdateInterval(16);

  const _subscribe = () => {
    setSubscription(Accelerometer.addListener(setData));
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Accelerometer: (in gs where 1g = 9.81 m/s^2)</Text>
      <Text style={styles.text}>x: {x}</Text>
      <Text style={styles.text}>y: {y}</Text>
      <Text style={styles.text}>z: {z}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
          <Text>{subscription ? 'On' : 'Off'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_slow} style={[styles.button, styles.middleButton]}>
          <Text>Slow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast} style={styles.button}>
          <Text>Fast</Text>
        </TouchableOpacity>
      </View>
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
