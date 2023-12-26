import { Text, Pressable, Dimensions } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window')

export default function SplashButton({ routing, text }) {
    const navigation = useNavigation();
    return (
        <Pressable onPress={() => navigation.navigate(routing)} style={{ width: width * 0.85, height: height * 0.06, alignItems: 'center', backgroundColor: '#50C2C9', borderRadius: 8, justifyContent: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>{text}</Text>
        </Pressable>
    )
}