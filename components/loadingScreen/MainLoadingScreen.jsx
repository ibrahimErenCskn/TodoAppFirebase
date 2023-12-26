import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';

export default function MainLoadingScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <LottieView
                autoPlay
                source={require('./lottie/bbb.json')}
            />
        </View>
    )
}