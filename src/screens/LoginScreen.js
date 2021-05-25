import React, { useState } from 'react';
import { Button, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export const LoginScreen = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>
                Grumble
            </Text>
            <Image 
                source={require('../../assets/images/cutleries.png')} 
                style={styles.image}
            />
            <TextInput
                onChangeText={text => setLogin(text)}
                placeholder='Phone number, username or email'
                style={styles.input}
                value={login}
            />
            <TextInput
                onChangeText={text => setPassword(text)}
                placeholder='Password'
                secureTextEntry={true}
                style={styles.input}
                value={password}
            />

            <TouchableOpacity style={styles.forgetPasswordButton}>
                <Text>Forget your password?</Text>
            </TouchableOpacity>

            <View style={styles.loginButton}>
                <Button title="Login" />
            </View>

            <TouchableOpacity style={styles.signUpButton}>
                <Text>Don't have an account? Sign up here!</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

// button onPress: toggle to next page

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#ffd966',
    },
    image: {
        width: 315,
        height: 45
    },
    input: {
        width: 330,
        height: 40,
        borderColor: '#ffffff',
        borderWidth: 1,
        margin: 10,
        padding: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
    forgetPasswordButton: {
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 320,
        right: 40,
    },
    loginButton: {
        marginTop: 25
    },
    signUpButton: {
        position: 'absolute',
        bottom: 40,
    },
    text: {
        color: '#ffffff',
        fontSize: 75,
        fontWeight: 'bold',
        marginBottom: 60,
        marginTop: 170,
    },
})