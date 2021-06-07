import React from 'react';
import { Provider } from 'react-redux';
import store from './src/app/store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './src/screens/HomeScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { ForgotPasswordScreen, CheckEmailScreen } from './src/screens/ForgotPasswordScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Login"
          screenOptions={{headerShown: false}}
        >
          <Stack.Screen name="Login" component={ LoginScreen }/>
          <Stack.Screen name="Home" component={ HomeScreen } />
          <Stack.Screen name="ForgotPW" component={ ForgotPasswordScreen } />
          <Stack.Screen name="CheckEmail" component={ CheckEmailScreen } />
          <Stack.Screen name="Register" component={ RegisterScreen } />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}