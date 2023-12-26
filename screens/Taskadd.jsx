import { View, Text, TextInput, SafeAreaView, Dimensions, Pressable, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { getAuth } from "firebase/auth";
import { updateData } from '../firebase/firebaseconfig';

const { height, width } = Dimensions.get('window')

export default function Taskadd() {
    const authuid = getAuth().currentUser.uid;
    const [task, setTask] = useState()
    const [loading, setLoading] = useState(false)
    const updateDataFunc = async (task_) => {
        setLoading(true)
        const loading_ = await updateData(authuid, task_)
        setLoading(loading_)
        setTask('')
    }
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} touchSoundDisabled>
            <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ gap: 25, paddingHorizontal: width * 0.05 }}>
                    <TextInput placeholder='Task' onChangeText={e => setTask(e)} value={task} style={{ borderWidth: 2, width: width * 0.9, height: height * 0.05, borderRadius: 8, paddingHorizontal: 10, borderColor: 'blue' }} />
                    <Pressable disabled={!task} onPress={() => updateDataFunc(task)} style={task ? { justifyContent: 'flex-end', flexDirection: 'row' } : { justifyContent: 'flex-end', flexDirection: 'row', opacity: 0.4 }}>
                        {loading && <ActivityIndicator size="small" color="#0000ff" />}
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Ekle</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}