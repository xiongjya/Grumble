import React, { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


export const RegisterScreen = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //const {register} = useContext(AuthContext);

    //const onLoginPress = () => navigation.goBack();

    return (
        <SafeAreaView style={styles.container}>
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
                    onChangeText={text => setUsername(text)}
                    placeholder='Username'
                    style={styles.textInput}
                    value={username}
                    selectionColor='#ffd966'
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    onChangeText={text => setEmail(text)}
                    placeholder='Email'
                    style={styles.textInput}
                    value={email}
                    selectionColor='#ffd966'
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    onChangeText={text => setPassword(text)}
                    placeholder='Password'
                    secureTextEntry={true}
                    style={styles.textInput}
                    value={password}
                    selectionColor='#ffd966'
                />
            </View>

            <TouchableOpacity style={styles.registerButton}>
                <Text
                    style={styles.registerText}
                    //onPress={() => register(email, password)}
                >
                    Register</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton}>
                <Text
                    style={styles.text}
                    //onPress={onLoginPress}
                >
                    Back to login.
                </Text>
            </TouchableOpacity>

        </SafeAreaView>
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
        width: "90%",
        height: 45,
        marginBottom: 20
    },
    inputView: {
        backgroundColor: '#fac219',
        borderRadius: 30,
        width: "80%",
        height: 45,
        marginBottom: 10,
        alignItems: "center",
    },
    textInput: {
        fontSize: 14,
        color: '#ffffff',
        height: 50,
        flex: 1,
        padding: 10,
    },
    registerButton: {
        backgroundColor: '#ffffff',
        borderRadius: 30,
        width: "80%",
        height: 45,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    registerText: {
        color: '#ffd966',
        fontWeight: 'bold',
        fontSize: 14,
    },
    loginButton: {
        bottom: 0,
    },
    text: {
        color: '#ffffff',
        opacity: 0.8,
        fontSize: 12
    }
})