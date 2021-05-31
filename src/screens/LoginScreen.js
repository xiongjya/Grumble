import React, { useState } from 'react';
import {
    Image, Keyboard, KeyboardAvoidingView, StyleSheet,
    Text, TextInput, TouchableOpacity,
    TouchableWithoutFeedback, View
} from 'react-native';
import { CommonActions } from "@react-navigation/native";
import * as Authentication from "../../firebase/auth";

export const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLoginPress = () => {
        Keyboard.dismiss();

        Authentication.login(
        { email, password },
        (user) => navigation.dispatch(CommonActions.reset({
            index: 0,
            routes: [{
              name: "Home"
            }]
          })),
          (error) => {
            return alert(error);
          }
        );
    }
    const onRegisterPress = () => navigation.navigate('Register');

    return (
        <TouchableWithoutFeedback 
            onPress={Keyboard.dismiss}
        >
            <KeyboardAvoidingView 
                behavior='padding'
                style={styles.container}
            >
                <Image
                    source={require('../../assets/images/grumble.png')}
                    style={styles.logoImage}
                />
                <Image 
                    source={require('../../assets/images/cutleries.png')} 
                    style={styles.image}
                />
                <View style={styles.inputView}>
                    <TextInput
                        onChangeText={text => setEmail(text)}
                        placeholder='Email'
                        style={styles.textInput}
                        value={email}
                        selectionColor='#fac219'
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        onChangeText={text => setPassword(text)}
                        placeholder='Password'
                        secureTextEntry={true}
                        style={styles.textInput}
                        value={password}
                        selectionColor='#fac219'
                    />
                </View>

                <TouchableOpacity
                    style={styles.forgetPasswordButton}
                >
                    <Text style={styles.text}>
                        Forget your password?
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={onLoginPress}
                >
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.registerButton}
                    onPress={onRegisterPress}
                >
                    <Text style={styles.text}>
                        Don't have an account? Sign up
                        <Text style={{fontWeight: 'bold'}}> here</Text>
                        !
                    </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

// button onPress: toggle to next page

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffd966',
    },
    logoImage: {
        width: 200,
        height: 200,
        marginBottom: 20
    },
    image: {
        width: 340,
        height: 45,
        marginBottom: 20
    },
    inputView: {
        borderColor: '#ffd966',
        borderBottomColor: '#fac219',
        borderWidth: 1.25,
        borderStyle: 'solid',
        width: 340,
        height: 45,
        marginBottom: 5
    },
    textInput: {
        fontSize: 14,
        color: '#ffffff',
        height: 50,
        flex: 1,
        padding: 5
    },
    forgetPasswordButton: {
        alignSelf: 'flex-end',
        marginRight: 40,
        marginBottom: 10,
        marginTop: 5
    },
    loginButton: {
        backgroundColor: '#ffffff',
        borderRadius: 30,
        width: 340,
        height: 45,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginText: {
        color: '#ffd966',
        fontWeight: 'bold',
        fontSize: 14,
    },
    registerButton: {
        bottom: 0,
    },
    text: {
        color: '#ffffff',
        opacity: 0.8,
        fontSize: 12
    },
})