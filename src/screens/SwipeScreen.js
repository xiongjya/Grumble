import React, { useEffect, useState } from 'react';
import { Dimensions, ImageBackground, SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import { CardItem } from '../components/CardItem.js';

import { DietaryOpsScreen } from './DietaryOpsScreen';
import { DiningOpsScreen } from './DiningOpsScreen';
import { LocationScreen } from './LocationScreen';
import { PriceRangeScreen } from './PriceRangeScreen';
import { SessionCodeScreen } from './SessionCodeScreen';
import { StartScreen } from './StartScreen';

import { createStackNavigator } from '@react-navigation/stack';

import { database } from '../../firebase/database';

import { selectPin } from '../redux/sessionSlice';
import { useSelector } from 'react-redux';

const SwipeScreen = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const pin = useSelector(selectPin);

    const loading = (
        <SafeAreaView style= {styles.loadingView}>
            <ActivityIndicator size="large" color="#ffffff"/>
        </SafeAreaView>
    );
        
    useEffect(() => {
        setMounted(true);

        const resRef = database.ref('rooms/' + pin + '/restaurants');
        const handleData = (snap) => {
            const restaurants = [];

            if (mounted) {
                snap.forEach((res) => {
                    restaurants.push(res.val());
                });
        
                if (restaurants) {
                    setRestaurants(restaurants);
                }
            }

        };
    
        resRef.once('value', handleData, (error) => alert(error));
        setTimeout(() => setIsLoading(false), 1000);

        return () => {
            resRef.off('value', handleData);
            setMounted(false);
        };
    }, []);

    return isLoading 
        ? loading 
        : (
            <ImageBackground
                source={require('../../assets/images/background.png')}
                style={styles.background}
            >
                <SafeAreaView style={styles.container}>
                    <CardStack
                        loop={true}
                        verticalSwipe={false}
                        renderNoMoreCards={() => null}
                    >
                        {restaurants.map((item, index) => {
                            return (
                            <Card key={index}>
                                <CardItem address={item.location.address1}
                                            categories={item.categories}
                                            contact={item.phone}
                                            image_url={item.image_url}
                                            name={item.name}
                                            price={item.price}
                                            rating={item.rating}
                                            transactions={item.transactions}
                                            website={item.url}
                                />
                            </Card>)
                        })}
                    </CardStack>
                </SafeAreaView>
            </ImageBackground>);
    };

const Stack = createStackNavigator();

export const SwipeSession = () => {
    return (
        <Stack.Navigator 
            initialRouteName='Start'
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen name="Start" component={ StartScreen }/>
            <Stack.Screen name="SessionCode" component={ SessionCodeScreen }/>
            <Stack.Screen name="Location" component={ LocationScreen } />
            <Stack.Screen name="DiningOps" component={ DiningOpsScreen } />
            <Stack.Screen name="DietaryOps" component={ DietaryOpsScreen } />
            <Stack.Screen name="PriceRange" component={ PriceRangeScreen } />
            <Stack.Screen name="Swipe" component={ SwipeScreen } />
        </Stack.Navigator>
    )
}

const FULL_WIDTH = Dimensions.get('window').width
const FULL_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        margin: 10
    },
    loadingView: {
        width: FULL_WIDTH,
        height: FULL_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffd966'
    },
    background: {
        width: FULL_WIDTH,
        height: FULL_HEIGHT
    }
})
