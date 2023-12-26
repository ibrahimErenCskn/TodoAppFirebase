import { View, Text, Pressable, Dimensions, SafeAreaView, Image, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { logOutUser, getData, updateData, deleteData, db } from '../firebase/firebaseconfig'
import { getAuth } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';

const { height, width } = Dimensions.get('window')

export default function Home() {
    const authuid = getAuth().currentUser.uid;
    const authName = getAuth().currentUser.displayName;

    const navigation = useNavigation()
    const [time, setTime] = useState(new Date());
    const [todoDataList, setTodoDataList] = useState()

    const logOutCurrentUser = () => {
        logOutUser();
    }
    const getDataFunc = async () => {
        const data = await getData(authuid)
        console.log(data?.todoArray)
    }
    const updateDataFunc = () => {
        updateData(authuid, 'Ekleme Yapmak')
    }
    const deleteDataFunc = (index) => {
        deleteData(authuid, index)
    }
    useEffect(() => {
        onSnapshot(doc(db, "users", authuid), (doc) => {
            setTodoDataList(doc.data()?.todoArray)
        });
    }, [])
    useEffect(() => {
        const interval = setInterval(() => {
            // Her saniyede zamanı güncelle
            setTime(new Date());
        }, 1000);

        // Komponentin unmount olduğunda interval'i temizle
        return () => clearInterval(interval);
    }, []);
    const hour = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F0F4F3' }}>
            <View style={{ height: height * 0.35, backgroundColor: '#50C2C9' }}>
                <View style={{ flex: 1.2, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Image source={require('../assets/images/shape.png')} style={styles.tabLeftImg} resizeMode='stretch' />
                    <Pressable onPress={() => logOutCurrentUser()} style={{ paddingRight: 10, paddingTop: height * 0.04 }}>
                        <MaterialIcons name="logout" size={24} color="black" />
                    </Pressable>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('../assets/images/shape.png')} style={{ borderRadius: 40, width: 80, height: 80 }} resizeMode='stretch' />
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>Welcome {authName}</Text>
                </View>
            </View>
            <View>
                <View style={{ height: height * 0.65 }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 40, color: '#50C2C9' }}>
                                {`${hour}:${minutes}:${seconds}`}
                            </Text>
                        </View>
                        <View style={{ justifyContent: 'flex-end', flex: 1, paddingHorizontal: 15 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                                Task List
                            </Text>
                        </View>
                    </View>
                    <View style={{ flex: 2, paddingHorizontal: 15, paddingBottom: 30, paddingTop: 5 }}>
                        <View style={styles.taskStyle}>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Text style={{ color: '#000000', opacity: 0.7 }}>Daily Task</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Taskadd')}>
                                    <AntDesign name="plus" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                            <ScrollView>
                                {
                                    todoDataList?.map((value, index) => (
                                        <TodoAddFunc v={value} i={index} key={index} />
                                    ))
                                }
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

function TodoAddFunc({ v, i }) {
    const [isChecked, setChecked] = useState(false);
    const authuid = getAuth().currentUser.uid;
    const [loading, setLoading] = useState(false)
    const deleteDataFunc = async (index) => {
        setLoading(true)
        const loading_ = await deleteData(authuid, index)
        setLoading(loading_)
    }

    return (
        <View style={{ marginBottom: 4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 8, paddingTop: 8 }}>
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                <Checkbox value={isChecked} onValueChange={setChecked} />
                <Text style={{ fontSize: 16, width: width * 0.6 }}>{v}</Text>
            </View>
            <Pressable onPress={() => deleteDataFunc(i)}>
                {loading ? <ActivityIndicator size="small" color="#0000ff" /> : <Feather name="trash" size={24} color="black" />}
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    tabLeftImg: {
        width: width * 0.40,
        height: height * 0.18,
    },
    taskStyle: {
        flex: 1,
        backgroundColor: 'white',
        padding: 18,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})