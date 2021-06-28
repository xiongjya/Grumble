import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Slider from '@react-native-community/slider';

import { selectPin } from '../redux/sessionSlice';
import { addLatitude, addLongitude, addLocation, addDistance } from '../redux/filterOptionsSlice';

import * as Location from 'expo-location';

export const LocationScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const pin = useSelector(selectPin);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [currLocation, setCurrLocation] = useState(false);
    const [filledLocation, setFilledLocation] = useState('');
    const [radius, setRadius] = useState(0.5);

    const getCurrentLocation = async () => {
        const enabled = await Location.hasServicesEnabledAsync();

        if (enabled) {
            let { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                alert('Permission to access location was denied');
            } else {
                const location = await Location.getCurrentPositionAsync({});

                setCurrLocation(true);
                setLatitude(location.coords.latitude);
                setLongitude(location.coords.longitude);

                setTimeout(() => {}, 3000);
            }
        } else {
            alert('Location service not enabled, please enable your location services in Settings to continue.');
        }
    };

    const onAddressFill = (text) => {
        setFilledLocation(text);
    }

    const onRadiusChange = (value) => {
        setRadius(value.toFixed(1));
    };

    const onPressNext = () => {
        if (currLocation || filledLocation) {
            if (currLocation) {
                dispatch(addLatitude(latitude));
                dispatch(addLongitude(longitude));
            } else {
                dispatch(addLocation(filledLocation));
            }
            
            dispatch(addDistance(radius * 1000));
            navigation.navigate('DiningOps');

        } else {
            alert('Empty fields, either use your current location or enter an address.');
        }
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
                <TouchableOpacity 
                    onPress={getCurrentLocation}
                    style= {styles.useMyLocation}
                >
                    <Text style= {styles.text}>
                        Use my location
                    </Text>
                </TouchableOpacity>

                <Text style= {styles.orText}>OR</Text>
                <View style= {styles.enterPC}>
                    <TextInput
                        onChangeText={onAddressFill}
                        placeholder='Enter address'
                        style={styles.text}
                        value={filledLocation}
                        selectionColor='#fac219'
                    />
                </View>
                <Text style={styles.question}>
                    Distance radius: {radius}km
                </Text>
                <Slider
                    style={{width: '70%', height: 40}}
                    minimumValue={0.5}
                    maximumValue={5}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#rgba(255, 255, 255, 0.4)"
                    onValueChange={onRadiusChange}
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