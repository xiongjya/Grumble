import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Rating } from 'react-native-elements';

export const PriceRangeScreen = ({navigation}) => {
    const [rating, setRating] = useState(0);

    const ratingCompleted = (value) => {
        setRating(value);
    }

    const DOLLAR = require('../../assets/images/rate.png')

    return (
        <SafeAreaView style={styles.view}>
            <Text style={styles.qnNumber}>
                3/4
            </Text>
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
                style={styles.next}
                onPress={() => navigation.navigate('Location')}
            >
                <Text style={styles.nextText}> NEXT </Text>
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
    next: {
        backgroundColor: '#ffffff',
        borderRadius: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        marginTop: 30
    },
    nextText: {
        color: '#ffd966',
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
    }
})