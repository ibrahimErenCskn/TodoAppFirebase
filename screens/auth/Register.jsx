import { View, Text, SafeAreaView, Image, StyleSheet, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Pressable } from 'react-native'
import React, { useState } from 'react'
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { register } from '../../firebase/firebaseconfig';

const { height, width } = Dimensions.get('window')

export default function Register() {

    const navigation = useNavigation()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submit = async () => {
        const user = await register(email, password, username)
        setUsername('')
        setEmail('')
        setPassword('')
        console.log(user)
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} touchSoundDisabled>
            <SafeAreaView style={styles.container}>
                <Animated.View entering={FadeInDown.springify().delay(250)} style={{ height: height * 0.1 }}>
                    <Image source={require('../../assets/images/leftsideimg.png')} style={styles.tabLeftImg} resizeMode='stretch' />
                </Animated.View>
                <Animated.View entering={FadeInDown.springify().delay(300)} style={{ height: height * 0.4, alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Welcome back</Text>
                    <Text>Let’s help to meet up your tasks.</Text>
                </Animated.View>
                <Animated.View entering={FadeInDown.springify().delay(350)} style={{ height: height * 0.4, alignItems: 'center', gap: 30 }}>
                    <TextInput onChangeText={(e) => setUsername(e)} value={username} placeholder='Enter Your Full Name' style={styles.textInputStyle} />
                    <TextInput onChangeText={(e) => setEmail(e)} value={email} placeholder='Enter Your Email' style={styles.textInputStyle} />
                    <TextInput onChangeText={(e) => setPassword(e)} value={password} secureTextEntry placeholder='Password' style={styles.textInputStyle} />
                </Animated.View>
                <Animated.View entering={FadeInDown.springify().delay(400)} style={{ height: height * 0.08, alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    <Pressable onPress={() => submit()} style={{ width: width * 0.85, height: height * 0.06, alignItems: 'center', backgroundColor: '#50C2C9', borderRadius: 8, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Register</Text>
                    </Pressable>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: 'black' }}>Already have an account ? </Text>
                        <Pressable onPress={() => navigation.navigate('Login')}>
                            <Text style={{ color: '#50C2C9' }}>
                                Sıgn In
                            </Text>
                        </Pressable>
                    </View>
                </Animated.View>
            </SafeAreaView>
        </TouchableWithoutFeedback >

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
    },
    textInputStyle: {
        width: width * 0.9,
        height: height * 0.05,
        backgroundColor: 'white',
        borderRadius: 24,
        paddingHorizontal: 8
    }
})