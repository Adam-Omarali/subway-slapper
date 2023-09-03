import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import lineOneData from '../lineData/lineOne';

export default function App() {
  const [startStation, setStartStation] = useState(lineOneData[0].name);
  const [endStation, setEndStation] = useState(lineOneData[37].name);

  const handleStartStationChange = (itemValue) => {
    setStartStation(itemValue);
  };

  const handleEndStationChange = (itemValue) => {
    setEndStation(itemValue);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity style={styles.button}>
        <Link href="/accelerometer" style={styles.buttonText}>Start</Link>
      </TouchableOpacity>
      <Text>Select a Start Station:</Text>
      <Picker
        selectedValue={startStation}
        style={{ height: 50, width: 330 }}
        onValueChange={(itemValue) => handleStartStationChange(itemValue)}
      >
        {lineOneData.map((station) => (
          <Picker.Item key={station.name} label={station.name} value={station.name} />
        ))}
      </Picker>
      <Text>Select a Station:</Text>
      <Picker
        selectedValue={endStation}
        style={{ height: 50, width: 330 }}
        onValueChange={(itemValue) => handleEndStationChange(itemValue)}
      >
        {lineOneData.map((station) => (
          <Picker.Item key={station.name} label={station.name} value={station.name} />
        ))}
      </Picker>
      <Text>Selected Start Station: {startStation}</Text>
      <Text>Selected End Station: {endStation}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue', // Customize the button background color
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white', // Customize the button text color
    fontSize: 18,
    fontWeight: 'bold',
  },
});
