import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Rating } from 'react-native-elements';

import * as Authentication from '../../../firebase/auth';
import * as Database from '../../../firebase/database';
import * as Firestore from '../../../firebase/firestore';

import { search } from '../../../yelp/config';

import { selectPin, selectStart } from '../../redux/sessionSlice';
import { selectLatitude, selectLongitude, selectLocation, selectDistance, selectDietary } from '../../redux/filterOptionsSlice';

import buttons from '../../styles/buttons';
import common from '../../styles/common';
import text from '../../styles/text';

export const PriceRangeScreen = ({ navigation }) => {

    const start = useSelector(selectStart);
    const pin = useSelector(selectPin);
    const latitude = useSelector(selectLatitude);
    const longitude = useSelector(selectLongitude);
    const location = useSelector(selectLocation);
    const radius = useSelector(selectDistance);
    const userId = Authentication.getCurrentUserId();
    const [price, setPrice] = useState(0);
    const [allDone, setAllDone] = useState(false);
    const [usersUndone, setUsersUndone] = useState(NaN);

    // to keep track of whether the 'finish' button is pressed // default value should be false
    const [finish, setFinish] = useState(true);

    const onFinish = () => {
        Database.updatePrice(pin, price);
        setFinish(true);
    };

    const waiting = (
        <SafeAreaView style={common.container}>
            <Text style= {[text.normal, styles.waiting]}> Waiting for {usersUndone} users... </Text>

            {allDone && 
            (<TouchableOpacity 
                style={[buttons.filled, styles.swipe]}
                onPress={() => navigation.navigate('Swipe')}
            >
                <Text style={text.filledText}> START SWIPING! </Text>
            </TouchableOpacity>)}
        </SafeAreaView>
    );

    const DOLLAR = require('../../../assets/images/rate.png')

    useEffect(() => {
        if (finish) {
            const roomRef = Database.ref('rooms/' + pin);

            roomRef.on('value', async (snap) => {
                const data = snap.val();
                const numUndone = data.usersTotal - data.usersJoined;

                setUsersUndone(numUndone);
                
                if (numUndone === 0) {
                    setAllDone(true);

                    if (start) {
                        const restaurants = search(latitude, longitude, location, radius);
                        restaurants.then((res) => {
                            Database.updateRestaurants(pin, res, () => { navigation.navigate('Swipe') })
                        });
                    }
                } else {
                    Database.joinRoom(pin, userId, () => { navigation.navigate('Start') });
                    Firestore.joinChat(pin, userId);
                }
                
            });
        }
    });

    return (finish)
        ? (waiting)
        : (<SafeAreaView style={[common.container, common.vertical]}>
            <Text style={text.sessionCode}>PIN: {pin}</Text>
 
            {start ? (<Text style= {text.qnNumber}>3/3</Text>)
                   : (<Text style= {text.qnNumber}>2/2</Text>)
            }

            <Text style={text.question}>
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
                onFinishRating={value => setPrice(value)}
                minValue={1}
                startingValue={0}
                style={styles.price}
            />
            <TouchableOpacity 
                style={buttons.clear}
                onPress={onFinish}
            >
                <Text style={text.clearText}> FINISH </Text>
            </TouchableOpacity>
        </SafeAreaView>);
}

const styles = StyleSheet.create({
    price: {
        marginBottom: 30,
    }, 
    swipe: {
        position: 'absolute',
        bottom: 330
    },
    waiting: {
        marginBottom: 20
    }
})