import { View, Text, StyleSheet, SafeAreaView, Image, Dimensions, KeyboardAvoidingView } from 'react-native'
import React from 'react';
import SplashButton from '../../components/SplashButton';

const { height, width } = Dimensions.get('window')

export default function Splash() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1 }}>
                <Image source={require('../../assets/images/leftsideimg.png')} style={styles.tabLeftImg} resizeMode='stretch' />
            </View>
            <View style={{ flex: 7, alignItems: 'center', justifyContent: 'center', gap: height * 0.05 }}>
                <Image source={require('../../assets/images/mainimg.png')} />
                <View style={{ gap: height * 0.01 }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Gets things with TODs</Text>
                    <Text style={{ textAlign: 'center', width: width * 0.6 }}>Lorem ipsum dolor sit amet consectetur. Eget sit nec et euismod. Consequat urna quam felis interdum quisque. Malesuada adipiscing tristique ut eget sed.</Text>
                </View>
            </View>
            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                <SplashButton routing={'Register'} text={'Get Started'} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F4F3'
    },
    tabLeftImg: {
        width: width * 0.40,
        height: height * 0.18,
    }
})