import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Slider from '@react-native-community/slider';

import { selectPin } from '../redux/sessionSlice';
import { addDistance } from '../redux/filterOptionsSlice';

export const LocationScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const pin = useSelector(selectPin);
    const [postalCode, setPostalCode] = useState('');
    const [distance, setDistance] = useState(0.5);

    const onDistanceChange = (value) => {
        setDistance(value.toFixed(1));
    }

    const onPressNext = () => {
        dispatch(addDistance(distance));
        navigation.navigate('DiningOps');
    };

    return (
        <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
        >
            <View style= {styles.container}>
                <Text style={styles.sessionCode}>PIN: {pin}</Text>

                <Text style= {styles.qnNumber}>1/4</Text>
                <Text style= {styles.question}>
                    Choose your location:
                </Text>
                <TouchableOpacity style= {styles.useMyLocation}>
                    <Text style= {styles.text}>
                        Use my location
                    </Text>
                </TouchableOpacity>
                <Text style= {styles.orText}>OR</Text>
                <View style= {styles.enterPC}>
                    <TextInput
                        onChangeText={text => setPostalCode(text)}
                        placeholder='Enter postal code'
                        style={styles.text}
                        value={postalCode}
                        selectionColor='#fac219'
                    />
                </View>
                <Text style= {styles.question}>
                    Distance radius: {distance}
                </Text>
                <Slider
                    style={{width: '70%', height: 40}}
                    minimumValue={0.5}
                    maximumValue={5}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#rgba(255, 255, 255, 0.4)"
                    onValueChange={onDistanceChange}
                />
                <View style={styles.dist}>
                    <Text style= {{color: '#ffffff', fontSize: 14}}>0.5km</Text>
                    <Text style= {{color: '#ffffff', fontSize: 14}}>5km</Text>
                </View>
                <TouchableOpacity 
                    style={styles.next}
                    onPress={onPressNext}
                >
                    <Text style={styles.nextText}> NEXT </Text>
                </TouchableOpacity>
            </View>
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
    qnNumber: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 5
    },
    question: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 30
    },
    useMyLocation: {
        backgroundColor: '#FAC219',
        borderRadius: 30,
        width: '70%',
        height: 50,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    enterPC: {
        borderColor: '#FAC219',
        borderWidth: 2,
        borderRadius: 30,
        width: '70%',
        height: 50,
        marginBottom: 45,
        alignItems: 'center',
        justifyContent: 'center'
    },
    orText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 15,
    },
    text: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 20,
    },
    dist: {
        width: '70%',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    next: {
        backgroundColor: '#ffd966',
        borderRadius: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        marginTop: 30,
        borderWidth: 2,
        borderColor: '#be75e4'
    },
    nextText: {
        color: '#be75e4',
        fontWeight: 'bold',
        fontSize: 18
    },
    sessionCode: {
        position: 'absolute',
        alignSelf: 'flex-end',
        right: 20,
        top: 70,
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 18
    }
})