import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SwipeScreen } from './SwipeScreen';
import { ChatScreen } from './ChatScreen';
import { ProfileScreen } from './ProfileScreen';

const Tab = createBottomTabNavigator();

export const HomeScreen = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Swipe" component={ SwipeScreen } />
            <Tab.Screen name="Chat" component={ ChatScreen } />
            <Tab.Screen name="Profile" component={ ProfileScreen } />
        </Tab.Navigator>
    )
}