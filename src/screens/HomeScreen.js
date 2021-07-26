import React from 'react';
import { Icon } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SwipeSession } from './Session/SwipeScreen';
import { ChatHomeScreen } from './Chats/ChatScreen';
import { ProfileScreen } from './Authentication/ProfileScreen';

const Tab = createBottomTabNavigator();

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === 'Swipe') {
        iconName = focused
            ? 'fast-food'
            : 'fast-food-outline';
    } else if (route.name === 'Chat') {
        iconName = focused ? 'chatbubble' : 'chatbubble-outline';
    } else {
        iconName = focused ? 'person' : 'person-outline';
    }

    // You can return any component that you like here!
    return <Icon type='ionicon' name={iconName} size={size} color={color} />;
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