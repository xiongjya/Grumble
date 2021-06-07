import React from 'react';
import { useDispatch } from 'react-redux';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { setPin } from '../components/sessionSlice';

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
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Session code:</Text>
            <Text style={styles.session}>{code}</Text>

            <TouchableOpacity
                style={styles.start}
                onPress={() => navigation.navigate('Location')}
            >
                <Text style={styles.text}>START</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffd966',
    },
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
    startText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 40,
    },
    start: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAC219',
        borderRadius: 30,
        marginTop: 30,
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
})