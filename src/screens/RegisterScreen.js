import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


export const RegisterScreen = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //const {register} = useContext(AuthContext);

    const onLoginPress = () => navigation.goBack();

    return (
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
                    onPress={onLoginPress}
                >
                    Back to
                    <Text style={{fontWeight: 'bold'}}> login</Text>
                    .
                </Text>
            </TouchableOpacity>

        </KeyboardAvoidingView>
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
    registerButton: {
        backgroundColor: '#ffffff',
        borderRadius: 30,
        width: 340,
        height: 45,
        marginBottom: 15,
        marginTop: 10,
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
    },
})