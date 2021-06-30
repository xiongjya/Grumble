import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Rating } from 'react-native-elements';

import * as Authentication from '../../../firebase/auth';
import * as Database from '../../../firebase/database';
import * as Firestore from '../../../firebase/firestore';

import { search } from '../../../yelp/config';

import { selectPin, selectStart } from '../../redux/sessionSlice';
import { selectLatitude, selectLongitude, selectLocation, selectDistance, selectDietary, selectDining } from '../../redux/filterOptionsSlice';

import buttons from '../../styles/buttons';
import common from '../../styles/common';
import text from '../../styles/text';

export const PriceRangeScreen = ({navigation}) => {

    const start = useSelector(selectStart);
    const pin = useSelector(selectPin);
    const dietaryOps = useSelector(selectDietary);
    const diningOps = useSelector(selectDining);
    const latitude = useSelector(selectLatitude);
    const longitude = useSelector(selectLongitude);
    const location = useSelector(selectLocation);
    const radius = useSelector(selectDistance);
    const [price, setPrice] = useState(0);
    const [userId, setUserId] = useState('');

    const onPressFinish = (navigation) => {
        if (start) {
            Database.createRoom(pin, userId);

            const restaurants = search(dietaryOps, diningOps, latitude, longitude, location, radius, price);
            restaurants.then(res => {
                Database.updateRestaurants(pin, res, () => { navigation.navigate('Swipe') })
            })

            Firestore.createChat(pin, userId, Authentication.getCurrentUserName());
        } else {
            Database.joinRoom(pin, userId);
            Firestore.joinChat(pin, userId);
            navigation.navigate('Swipe');
        }
    }

    const DOLLAR = require('../../../assets/images/rate.png')

    useEffect(() => setUserId(Authentication.getCurrentUserId()), [])

    return (
        <SafeAreaView style={[common.container, common.vertical]}>
            <Text style={text.sessionCode}>PIN: {pin}</Text>
 
            {start ? (<Text style= {text.qnNumber}>4/4</Text>)
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
                onPress={() => {
                    onPressFinish(navigation);
                }}
            >
                <Text style={text.clearText}> FINISH </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    price: {
        marginBottom: 30,
    }
})