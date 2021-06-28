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
import { ResultsScreen } from './ResultsScreen';

import { createStackNavigator } from '@react-navigation/stack';

import { database, swipeRestaurant, markUserDone } from '../../firebase/database';

import { selectPin } from '../redux/sessionSlice';
import { useSelector } from 'react-redux';

const SwipeScreen = ({navigation}) => {
    const [restaurants, setRestaurants] = useState([]);
    const [isLoading, setisLoading] = useState(true);
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
        setTimeout(() => setisLoading(false), 1000);

        return () => {
            resRef.off('value', handleData);
            setMounted(false);
        };
    }, []);

    return (
        <ImageBackground
        source={require('../../assets/images/background.png')}
        style={styles.background}>
            <SafeAreaView style={styles.container}>
                {isLoading && loading}
                {!isLoading && (
                    <CardStack
                        loop={false}
                        verticalSwipe={false}
                        renderNoMoreCards={()=>{}}
                    >
                    {restaurants.map((item, index) => {
                        const onSwipe = (last, right) => swipeRestaurant(pin, item.id,
                                                    last, right, () => {
                                                        navigation.navigate('Results');
                                                    });
                        let isLast = false;
                        if (!isLoading && index === restaurants.length - 1) {
                            isLast = true;
                        }
                        return (
                        <Card key={index}
                            onSwipedLeft={() => onSwipe(isLast, false)}
                            onSwipedRight={() => onSwipe(isLast, true)}>
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
                    </CardStack>)
                }
            </SafeAreaView>
        </ImageBackground>
        );
    }

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
            <Stack.Screen name="Results" component={ ResultsScreen } />
        </Stack.Navigator>
    )
}

const FULL_WIDTH = Dimensions.get('window').width
const FULL_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        margin:10
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
