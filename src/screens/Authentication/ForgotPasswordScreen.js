import React, { useState, useRef } from 'react';
import { Animated, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity,
    TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CommonActions } from "@react-navigation/native";

import * as Authentication from "../../../firebase/auth";

import buttons from '../../styles/buttons';
import common from '../../styles/common';
import text from '../../styles/text';

const Checkmark = () => {
    const checkmarkSize = useRef(new Animated.Value(0)).current
    const scaleCheckmark = () => {
      Animated.timing(
        checkmarkSize,
        {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false
        },
      ).start();
    }
    const iconScale = checkmarkSize.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0.01, 1.6, 1],
    });

    React.useEffect(scaleCheckmark);
  
    return (
    <Animated.View style={[{ transform: [{ scale: iconScale }] }, styles.checkmarkWrapper]}>
        <Icon
          name="check"
          color= '#ffffff'
          size={50}
        />
    </Animated.View>
    )
  }  

export const CheckEmailScreen = ({navigation}) => {
    const backToLogin = () => {
        navigation.dispatch(CommonActions.reset({
            index: 0,
            routes: [{
              name: "Login"
            }]
        }))
    }

    return (
        <View style= {styles.container}>
            <Checkmark/>
            <Text style= {[text.normal, {marginBottom: 20}]}>
                An email to reset your password
                {'\n'}
                has been sent to your inbox.
            </Text>
            <TouchableOpacity
                    style={styles.button}
                    onPress={backToLogin}
            >
                <Text style={styles.buttonText}>Back to login</Text>
            </TouchableOpacity>
        </View>
    )

}

export const ForgotPasswordScreen = ({navigation}) => {
    const [email, setEmail] = useState('');

    const onForgotPassword = () => {
        Authentication.forgotPassword(
            {email},
            () => {navigation.navigate('CheckEmail')},
            (error) => {alert(error)}
        )
    }
    const onBack = () => navigation.goBack();

    return (
        <TouchableWithoutFeedback 
            onPress={Keyboard.dismiss}
        >
            <KeyboardAvoidingView 
                behavior='padding'
                style={[common.container, common.vertical]}
            >
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style= {[text.normal, { alignSelf: 'flex-start', marginBottom: 20 }]}>
                        Reset your password by email
                    </Text>
                    <View style={styles.inputView}>
                        <TextInput
                            onChangeText={text => setEmail(text)}
                            placeholder='Email'
                            style={styles.textInput}
                            value={email}
                            selectionColor='#fac219'
                        />
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={onForgotPassword}
                >
                    <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={onBack}
                >
                    <Text style= {styles.backText}>Back</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

// button onPress: toggle to next page

const styles = StyleSheet.create({
    inputView: {
        borderColor: '#ffd966',
        borderBottomColor: '#fac219',
        borderWidth: 1.25,
        borderStyle: 'solid',
        width: 340,
        height: 45,
        marginBottom: 20
    },
    textInput: {
        fontSize: 14,
        color: '#ffffff',
        height: 50,
        flex: 1,
        padding: 5
    },
    button: {
        backgroundColor: '#ffffff',
        borderRadius: 30,
        width: 340,
        height: 45,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: '#ffd966',
        fontWeight: 'bold',
        fontSize: 14,
    },
    checkmarkWrapper: {
        marginBottom: 30,
    },
    backText: {
        color: '#ffffff',
        opacity: 0.8,
        fontSize: 12
    },
})