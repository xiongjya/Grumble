import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { KeyboardAvoidingView, Keyboard, 
    View, Text, TouchableOpacity, TouchableWithoutFeedback, 
    StyleSheet, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { joined, setPin } from '../components/sessionSlice';

export const StartScreen = ({navigation}) => {
    const dispatch = useDispatch();

    const [sessionPin, setSessionPin] = useState('');

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView 
                behavior= 'padding'
                style= {styles.container}
            >
                <View style= {{justifyContent: 'center',alignItems: 'center'}}>
                    <Text style= {styles.description}>
                        Create a session
                    </Text>
                    <TouchableOpacity 
                        style= {styles.startBtn}
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
                                navigation.navigate('DietaryOps');
                            }}
                        >
                            <Ionicons 
                                name= 'ios-checkmark-circle'
                                size= {40}
                                color= '#fac219'/>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
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
    description: {
        color: '#ffffff',
        fontSize: 15,
        marginBottom: 30,
    },
    startText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 40,
    },
    startBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAC219',
        borderRadius: 30,
        width: 232,
        height: 73,
        marginBottom: 30,
    },
    enterSP: {
        borderColor: '#FAC219',
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