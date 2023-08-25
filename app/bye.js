import { Text, View } from 'react-native'
import { Link } from 'expo-router'

function Bye() {
  return (
    <View>
        <Text>Bye World</Text>            
        <Link href="/">Home</Link>
    </View>
  )
}

export default Bye