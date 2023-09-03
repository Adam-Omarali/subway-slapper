import React, { useState } from 'react';
import { Audio } from 'expo-av';
import { View, Button } from 'react-native'; // Import the Button component
import { Link } from 'expo-router';

function sloppy() {
  const [sound, setSound] = useState();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('../Audio/no-copyright-hd.mp3')
    )
    setSound(sound);
    await sound.playAsync();
  }

  async function stopSound() {
    if (sound) {
      await sound.stopAsync();
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Link href="/">Home</Link>
      <Button title="Play Audio" onPress={playSound} />
      <Button title="Stop Audio" onPress={stopSound} />
    </View>
  )
}

export default sloppy;
