import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import Home from '../screens/Home';
import Taskadd from '../screens/Taskadd';

const Stack = createStackNavigator();

export default function LoginStackNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
            <Stack.Screen name='Taskadd' component={Taskadd} />
        </Stack.Navigator>
    )
}