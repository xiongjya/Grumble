import React, { useEffect, useState } from 'react';
import { Dimensions, ImageBackground, SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import { createStackNavigator } from '@react-navigation/stack';

import { CardItem } from '../../components/CardItem.js';

import { DietaryOpsScreen } from './DietaryOpsScreen';
import { LocationScreen } from './LocationScreen';
import { PriceRangeScreen } from './PriceRangeScreen';
import { SessionCodeScreen } from './SessionCodeScreen';
import { StartScreen } from './StartScreen';
import { UserNumScreen } from './UserNumScreen';
import { ResultsScreen } from './ResultsScreen';
import { EndScreen } from './EndScreen';

import { swipeRestaurant } from '../../../firebase/database';
import { selectPin } from '../../redux/sessionSlice';
import { useSelector } from 'react-redux';

const SwipeScreen = ({route, navigation}) => {
    const { restaurants } = route.params;
    const pin = useSelector(selectPin);

    return (<ImageBackground
        source={require('../../../assets/images/background.png')}
        style={styles.background}>
            <SafeAreaView style={styles.container}>
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

                        if (index === restaurants.length - 1) {
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
                                            //transactions={item.transactions}
                                            website={item.url}
                                />
                            </Card>)
                    })}
                </CardStack>
        </SafeAreaView>
    </ImageBackground>);
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
            <Stack.Screen name="UserNum" component={ UserNumScreen }/>
            <Stack.Screen name="Location" component={ LocationScreen } />
            <Stack.Screen name="DietaryOps" component={ DietaryOpsScreen } />
            <Stack.Screen name="PriceRange" component={ PriceRangeScreen } />
            <Stack.Screen name="Swipe" component={ SwipeScreen } />
            <Stack.Screen name="Results" component={ ResultsScreen } />
            <Stack.Screen name="End" component={ EndScreen } />
        </Stack.Navigator>
    )
}

const FULL_WIDTH = Dimensions.get('window').width
const FULL_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        margin: 10
    },
    background: {
        width: FULL_WIDTH,
        height: FULL_HEIGHT
    },
    margin: {
        marginBottom: 20
    }
})
