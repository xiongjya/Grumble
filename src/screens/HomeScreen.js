import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SwipeSession } from './SwipeScreen';
import { ChatHomeScreen } from './ChatScreen';
import { ProfileScreen } from './ProfileScreen';

const Tab = createBottomTabNavigator();

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === 'Swipe') {
        iconName = focused
            ? 'ios-fast-food'
            : 'ios-fast-food-outline';
    } else if (route.name === 'Chat') {
        iconName = focused ? 'ios-chatbubble' : 'ios-chatbubble-outline';
    } else {
        iconName = focused ? 'ios-person' : 'ios-person-outline';
    }

    // You can return any component that you like here!
    return <Ionicons name={iconName} size={size} color={color} />;
  },
})

const tabOptions = {
    activeTintColor: '#be75e4',
    inactiveTintColor: 'gray',
}

export const HomeScreen = ({navigation}) => {
    return (
        <Tab.Navigator screenOptions= {screenOptions}
                tabBarOptions={tabOptions}>
            <Tab.Screen name="Swipe" component={ SwipeSession } />
            <Tab.Screen name="Chat" component={ ChatHomeScreen } />
            <Tab.Screen name="Profile" component={ ProfileScreen } />
        </Tab.Navigator>
    )
}