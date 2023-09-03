import { Text, View } from "react-native";
import { Link } from 'expo-router';


export default function Page(){
    return(
        <View style={`flex-auto justify-center items-center h-screen`}>
            <Text>Hello World</Text>
            <Link href="/bye">Bye</Link>
            <Link href="/accelerometer">Accelerometer</Link>
            <Link href="/sloppy">sloppy</Link>
            <Link href="/gyro">dropdown</Link>
        </View>
    )
}