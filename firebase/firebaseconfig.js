import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword,updateProfile,signInWithEmailAndPassword,signOut,initializeAuth, getReactNativePersistence  } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore,doc,setDoc,updateDoc,getDoc  } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB-8Dd0O3ORRTK9Vkf9DO5icT6UqjCqy2o",
    authDomain: "netflixclone-d479b.firebaseapp.com",
    projectId: "netflixclone-d479b",
    storageBucket: "netflixclone-d479b.appspot.com",
    messagingSenderId: "837066956777",
    appId: "1:837066956777:web:081a9e1467e9366e4fb578",
    measurementId: "G-P70W89JHGY"
};


const app = initializeApp(firebaseConfig);
const auth_ = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
const auth = getAuth();
const db = getFirestore(app);


export const register = async (email,password,username)=>{
    try{
        const {user} = await createUserWithEmailAndPassword(auth, email, password)
        updateProfile(auth.currentUser, {
            displayName: username
        }).then(() => {
            console.log('Updated profile')
        }).catch((error) => {
            console.log(error.message)
        });
        return user
    }catch(error){
        const errorMessage = error.message;
        return errorMessage
    }
}

export const login = async (email,password)=>{
    try {
        const {user} = await signInWithEmailAndPassword(auth, email, password)
        return user
    } catch (error) {
        return error.message;
    }
}

export const logOutUser = ()=>{
    signOut(auth).then(() => {
        console.log('Çıkış Yapıldı')
    }).catch((error) => {
        console.log(error.message)
    });
}


export const getData = async (iduser)=>{
    const data = await getDoc(doc(db,'users',iduser))
    return data.data()
}

export const updateData = async (iduser,outData)=>{
    const data = await getDoc(doc(db,'users',iduser))
    const loading = false

    if (!data.data()?.todoArray){
        await setDoc(doc(db, "users", iduser), {
            todoArray: [outData],
        });
        return loading
    }else{
        await updateDoc(doc(db,'users',iduser),{
            todoArray:[...data.data()?.todoArray,outData]
        })
        return loading
    }
}

export const deleteData = async (iduser,arrayindex)=>{
    const data = await getDoc(doc(db,'users',iduser))
    const reUpdateArray = data.data()?.todoArray.filter((_, index) => index !== arrayindex)
    const loading = false
    await updateDoc(doc(db,'users',iduser),{
        todoArray: reUpdateArray
    })
    return loading
}

export {db}