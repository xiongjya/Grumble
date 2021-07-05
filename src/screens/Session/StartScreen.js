import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, 
    TouchableWithoutFeedback, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { checkRoomExists } from '../../../firebase/database';
import { getCurrentUserId } from '../../../firebase/auth';

import { joined, setPin } from '../../redux/sessionSlice';
import { clearDietary } from '../../redux/filterOptionsSlice';

import buttons from '../../styles/buttons';
import common from '../../styles/common';
import text from '../../styles/text';

export const StartScreen = ({navigation}) => {
    const dispatch = useDispatch();

    const [sessionPin, setSessionPin] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        dispatch(clearDietary());
    })

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView 
                behavior= 'padding'
                style={[common.container, common.vertical]}
            >
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style= {styles.description}>
                        Create a session
                    </Text>
                    <TouchableOpacity 
                        style= {[buttons.filled, styles.startBtn]}
                        onPress={() => {
                            dispatch(joined(true));
                            navigation.navigate('SessionCode');
                        }}
                    >
                        <Text style= {styles.startText}>START</Text>
                    </TouchableOpacity>
                    <Text style= {styles.description}>
                        or enter your session pin below
                    </Text>
                    <View style= {styles.pin}>
                        <View style= {styles.enterSP}>
                            <TextInput
                                onChangeText={text => setSessionPin(text)}
                                placeholder='ENTER PIN'
                                style={styles.text}
                                value={sessionPin}
                                selectionColor='#fac219'
                            />
                        </View>
                        <TouchableOpacity 
                            style={styles.checkBtn}
                            onPress={() => {
                                dispatch(joined(false));
                                dispatch(setPin(sessionPin));
                                checkRoomExists(sessionPin, () => {navigation.navigate('DietaryOps')});
                            }}
                            disabled={sessionPin.length !== 6}
                        >
                            <Ionicons 
                                name= 'ios-checkmark-circle'
                                size= {40}
                                color= '#be75e4'/>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    description: {
        color: '#ffffff',
        fontSize: 15,
        marginBottom: 30,
    },
    startText: {
        color: '#ffd966',
        fontWeight: 'bold',
        fontSize: 40,
    },
    startBtn: {
        width: 232,
        height: 73,
        marginBottom: 30
    },
    enterSP: {
        borderColor: '#be75e4',
        borderWidth: 2,
        borderRadius: 30,
        width: '70%',
        height: 50,
        marginBottom: 45,
        paddingLeft: 20,
        justifyContent: 'center'
    },
    text: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 15,
    },
    pin: {
        width: '70%',
        justifyContent: 'space-evenly',
        flexDirection: 'row'
    },
    checkBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }
})