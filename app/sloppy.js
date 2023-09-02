import { Text, View } from 'react-native'
import { Link } from 'expo-router'

var audio = new Audio("../Audio/no-copyright-hd.mp3");

// Play the audio
function playAudio() {
  audio.play();
}

// Pause the audio
function pauseAudio() {
  audio.pause();
}

function sloppy() {
  return (
    <View>
        <div>
            <button onClick={playAudio()}>
                play audio
            </button>
        </div>
        <div>
            <button onClick={pauseAudio()}>
                pause audio
            </button>
        </div>
    </View>
  )
}

export default sloppy