import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Rating } from 'react-native-elements';

import {getCurrentUserId} from '../../firebase/auth';
import * as Database from '../../firebase/database';

import { search } from '../../yelp/config';

import { selectPin, selectStart } from '../redux/sessionSlice';
import { selectLocation, selectDietary, selectDining } from '../redux/filterOptionsSlice';

export const PriceRangeScreen = ({navigation}) => {

    const start = useSelector(selectStart);
    const pin = useSelector(selectPin);
    const dietaryOps = useSelector(selectDietary);
    const diningOps = useSelector(selectDining);
    const location = useSelector(selectLocation);
    const [rating, setRating] = useState(0);
    const [userId, setUserId] = useState('');

    const onPressFinish = (navigation) => {
        if (start) {
            Database.createRoom(pin, userId, location);
            const restaurants = search(dietaryOps, diningOps, location, rating);
            restaurants.then(res => {
                Database.updateRestaurants(pin, res)
            });
        } else {
            Database.joinRoom(pin, userId);
        }
        navigation.navigate('Swipe');
    }

    const DOLLAR = require('../../assets/images/rate.png')

    useEffect(() => setUserId(getCurrentUserId()), [])

    return (
        <SafeAreaView style={styles.view}>
            <Text style={styles.sessionCode}>PIN: {pin}</Text>

            {start ? (<Text style= {styles.qnNumber}>4/4</Text>)
                   : (<Text style= {styles.qnNumber}>2/2</Text>)
            }

            <Text style={styles.question}>
                Select your price range:
            </Text>
            <Rating 
                type='custom'
                ratingImage={DOLLAR}
                ratingColor='#ffffff'
                ratingCount={4}
                ratingBackgroundColor='#ffd966'
                tintColor='#ff5733'
                imageSize={55}
                onFinishRating={value => setRating(value)}
                minValue={1}
                startingValue={0}
                style={styles.rating}
            />
            <TouchableOpacity 
                style={styles.fin}
                onPress={() => {
                    onPressFinish(navigation);
                }}
            >
                <Text style={styles.finText}> FINISH </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffd966'
    },
    fin: {
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
    finText: {
        color: '#be75e4',
        fontWeight: 'bold',
        fontSize: 18
    },
    qnNumber: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 5, 
    },
    question: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 30
    },
    rating: {
        marginBottom: 30,
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