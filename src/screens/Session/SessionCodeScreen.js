import React from 'react';
import { useDispatch } from 'react-redux';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { setPin } from '../../redux/sessionSlice';

import buttons from '../../styles/buttons';
import common from '../../styles/common';
import text from '../../styles/text';

const makeSession = () => {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 6; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};

export const SessionCodeScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const code = makeSession();
    dispatch(setPin(code));
    
    return (
        <SafeAreaView style={[common.container, common.vertical]}>
            <Text style={styles.text}>Session code:</Text>
            <Text style={styles.session}>{code}</Text>

            <TouchableOpacity
                style={[buttons.filled, styles.startBtn]}
                onPress={() => navigation.navigate('UserNum')}
            >
                <Text style={[styles.text, {color: '#ffd966'}]}>START</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    session: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 70,
    },
    text: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 25
    },
    startBtn: {
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
})