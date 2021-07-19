import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Rating } from 'react-native-elements';

import { Loading } from '../../components/Loading';

import * as Authentication from '../../../firebase/auth';
import * as Database from '../../../firebase/database';
import * as Firestore from '../../../firebase/firestore';

import { search } from '../../../yelp/config';

import { useDispatch } from 'react-redux';

import { setSessionSize, selectPin, selectStart } from '../../redux/sessionSlice';
import { selectLatitude, selectLongitude, selectLocation, selectDistance, selectDietary } from '../../redux/filterOptionsSlice';

import buttons from '../../styles/buttons';
import common from '../../styles/common';
import text from '../../styles/text';

export const PriceRangeScreen = ({ navigation }) => {

    const start = useSelector(selectStart);
    const pin = useSelector(selectPin);
    const dispatch = useDispatch();
    const latitude = useSelector(selectLatitude);
    const longitude = useSelector(selectLongitude);
    const location = useSelector(selectLocation);
    const radius = useSelector(selectDistance);
    const userId = Authentication.getCurrentUserId();
    const [price, setPrice] = useState(0);
    const [allDone, setAllDone] = useState(false);
    const [usersUndone, setUsersUndone] = useState(NaN);
    const roomRef = Database.database.ref('rooms/' + pin);

    // to keep track of whether the 'finish' button is pressed // default value should be false
    const [finish, setFinish] = useState(false);

    const onFinish = () => {
        Database.updatePrice(pin, price);
        Database.joinRoom(pin, userId, (num) => { 
            setFinish(true);
            dispatch(setSessionSize(num));
         }, () => { navigation.navigate('Start') });
        Firestore.joinChat(pin, userId);
        
    };

    const onStartSwiping = () => {
        Database
        .getRestaurants(pin, navigation)
    };

    const waiting = (
        <SafeAreaView style={common.container}>
            {allDone
            ? (<TouchableOpacity 
                style={[buttons.filled, styles.swipe]}
                onPress={onStartSwiping}
            >
                <Text style={text.filledText}> START SWIPING! </Text>
            </TouchableOpacity>)
            : (<View style= {{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style= {[text.normal, styles.waiting]}> Waiting for {usersUndone} more... </Text>
                <Loading />
            </View>)}
        </SafeAreaView>
    );

    const DOLLAR = require('../../../assets/images/rate.png')

    useEffect(() => {
        const updateNum = (snap) => {
            const data = snap.val();
            const numUndone = data.usersTotal - data.usersJoined;

            setUsersUndone(numUndone);
            if (snap.hasChild('restaurants')) setAllDone(true);
        };
        if (finish) {
            roomRef.on('value', updateNum);
        }
        return () => {
            roomRef.off('value', updateNum);
        }
    });

    useEffect(() => {
        if (start && usersUndone === 0) {
            search(latitude, longitude, location, radius, pin).then(res => {
                Database.pushRestaurantsToFb(pin, res, () => { setAllDone(true) } );
             });
        }
    }, [usersUndone]);

    
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
                ratingBackgroundColor='#rgba(255, 255, 255, 0.4)'
                tintColor='#ffd966'
                imageSize={50}
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
        padding: 10
    },
    waiting: {
        marginBottom: 20
    }
})