import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Keyboard, StyleSheet, Text, TextInput,
    TouchableOpacity, TouchableWithoutFeedback, View, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
import Slider from '@react-native-community/slider';
import * as Location from 'expo-location';

import { selectPin } from '../../redux/sessionSlice';
import { addLatitude, addLongitude, addLocation, addDistance } from '../../redux/filterOptionsSlice';

import buttons from '../../styles/buttons';
import common from '../../styles/common';
import text from '../../styles/text';

export const LocationScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const pin = useSelector(selectPin);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [choseCurrLoc, setChoseCurrLoc] = useState(false);
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
            }
        } else {
            alert('Location service not enabled, please enable your location services in Settings to continue.');
        }
    };

    const LocationObtainedDisplay = () => {
        return <View style={common.horizontal}>
            <Text style={styles.address}>Current location obtained:  </Text>
            {choseCurrLoc
                ? (latitude === 0 && longitude === 0)
                    ? (<ActivityIndicator animating={choseCurrLoc} color='#ffffff'/>)
                    : (<Icon
                        name='check'
                        type='font-awesome-5'
                        color='#6aa84f'
                        iconStyle={{fontSize: 17}}
                    />)
                : null
            }
        </View>
    }

    const onAddressFill = (text) => {
        setChoseCurrLoc(false);
        setCurrLocation(false);
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
            navigation.navigate('DietaryOps');

        } else {
            alert('Empty fields, either use your current location or enter an address.');
        }
    };

    useEffect(() => {}, [latitude, longitude])

    return (
        <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
        >
            <View style= {[common.container, common.vertical]}>
                <Text style={text.sessionCode}>PIN: {pin}</Text>

                <Text style= {text.qnNumber}>1/3</Text>

                <Text style= {text.question}>
                    Choose your location:
                </Text>
                <TouchableOpacity 
                    onPress={() => {
                        setChoseCurrLoc(true);
                        setFilledLocation('');
                        getCurrentLocation();
                    }}
                    style= {[styles.useMyLocation,
                        choseCurrLoc
                            ?  {borderRadius: 28, borderWidth: 2,
                                borderColor: '#ffffff'}
                            : {borderRadius: 30}
                        ]}
                >
                    <Text style= {text.normal}>
                        Use my location
                    </Text>
                </TouchableOpacity>

                <LocationObtainedDisplay />

                <Text style= {styles.orText}>OR</Text>

                <View style= {[styles.filledLocation,
                        filledLocation
                            ? {backgroundColor: 'rgba(190, 117, 228, 0.3)'}
                            : {}
                ]}>
                    <TextInput
                        onChangeText={onAddressFill}
                        placeholder='Enter address'
                        style={[text.normal, {paddingLeft: 20}]}
                        value={filledLocation}
                        selectionColor='#be75e4'
                    />
                </View>
                <Text style={text.question}>
                    Distance radius: {radius}km
                </Text>
                <Slider
                    style={{width: '70%', height: 40}}
                    minimumValue={0.5}
                    maximumValue={5}
                    minimumTrackTintColor='rgb(190, 117, 228)'
                    maximumTrackTintColor="#rgba(255, 255, 255, 0.4)"
                    onValueChange={onRadiusChange}
                />
                <View style={styles.dist}>
                    <Text style= {{color: '#ffffff', fontSize: 14}}>0.5km</Text>
                    <Text style= {{color: '#ffffff', fontSize: 14}}>5km</Text>
                </View>
                <TouchableOpacity 
                    style={buttons.clear}
                    onPress={onPressNext}
                >
                    <Text style={text.clearText}> NEXT </Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    useMyLocation: {
        backgroundColor: '#be75e4',
        width: '70%',
        height: 50,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    address: {
        color: 'dimgray'
    },
    filledLocation: {
        borderColor: '#be75e4',
        borderWidth: 2,
        borderRadius: 30,
        width: '70%',
        height: 50,
        marginBottom: 45,
        justifyContent: 'center'
    },
    orText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 20,
        margin: 15,
    },
    dist: {
        width: '70%',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
})