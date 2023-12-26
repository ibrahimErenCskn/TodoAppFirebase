import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import Splash from '../screens/auth/Splash';

const Stack = createStackNavigator();

export default function StackNavigation() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Splash' component={Splash} />
            <Stack.Screen name='Register' component={Register} />
            <Stack.Screen name='Login' component={Login} />
        </Stack.Navigator>
    )
}