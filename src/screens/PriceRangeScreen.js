import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Rating } from 'react-native-elements';

import * as Authentication from '../../firebase/auth';
import * as Database from '../../firebase/database';

import { selectPin, selectStart } from '../redux/sessionSlice';
import { addRating, selectLocation } from '../redux/filterOptionsSlice';
import db from '../../firebase/firestore';

export const PriceRangeScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const start = useSelector(selectStart);
    const pin = useSelector(selectPin);
    const postalCode = useSelector(selectLocation);
    const [rating, setRating] = useState(0);
    const [userId, setUserId] = useState('');

    const ratingCompleted = (value) => {
        setRating(value);
        dispatch(addRating(value));
    }

    const createChat = () => {
        const displayName = Authentication.getCurrentUserName();

        db.collection('THREADS')
          .doc(pin)
          .set({
            name: 'Room',
            latestMessage: {
                text: `You have joined a new room created by ${displayName}.`,
                createdAt: new Date().getTime()
            },
            creator: displayName
          })
        
        db.collection('THREADS')
          .doc(pin)
          .collection('MESSAGES')
            .add({
                text: `You have joined a new room created by ${displayName}.`,
                createdAt: new Date().getTime(),
                system: true
            });

        db.collection('USERS')
          .doc(userId)
          .collection('chats')
          .doc(pin)
          .set({});
    }

    const joinChat = () => {
        db.collection('USERS')
          .doc(userId)
          .collection('chats')
          .doc(pin)
          .set({});
    }

    const onPressFinish = () => {
        if (start) {
            Database.createRoom(pin, userId, postalCode);
            createChat();
        } else {
            Database.joinRoom(pin, userId);
            joinChat();
        }
    }

    const DOLLAR = require('../../assets/images/rate.png')

    useEffect(() => setUserId(Authentication.getCurrentUserId()), [])

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
                ratingBackgroundColor='#ffd966'
                tintColor='#ff5733'
                imageSize={55}
                onFinishRating={ratingCompleted}
                startingValue={0}
                style={styles.rating}
            />
            <TouchableOpacity 
                style={styles.fin}
                onPress={() => {
                    onPressFinish();
                    navigation.navigate('Swipe');
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