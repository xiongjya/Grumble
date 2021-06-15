import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Rating } from 'react-native-elements';

import { selectPin, selectStart } from '../redux/sessionSlice';
import { addRating } from '../redux/filterOptionsSlice';

export const PriceRangeScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const start = useSelector(selectStart);
    const pin = useSelector(selectPin);
    const [rating, setRating] = useState(0);

    const ratingCompleted = (value) => {
        setRating(value);
        dispatch(addRating(value));
    }

    const DOLLAR = require('../../assets/images/rate.png')

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