import React, { useState } from 'react';
import { Dimensions, ImageBackground, SafeAreaView, StyleSheet } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import { CardItem } from '../components/CardItem.js';
import mock from '../../assets/data/mock.js';
import { DietaryOpsScreen } from './DietaryOpsScreen';
import { DiningOpsScreen } from './DiningOpsScreen';
import { LocationScreen } from './LocationScreen';
import { PriceRangeScreen } from './PriceRangeScreen';
import { SessionCodeScreen } from './SessionCodeScreen';
import { StartScreen } from './StartScreen';
import { createStackNavigator } from '@react-navigation/stack';

const SwipeScreen = () => {
    const [selected, setSelected] = useState([]);

    return (
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
            
                {mock.map((item, index) => (
                    <Card key={index} onSwipedRight={ () => { console.log(item.name) } }>
                        <CardItem
                            address={item.address}
                            contact={item.contact}
                            image={item.image}
                            menu={item.menu}
                            name={item.name}
                            operation={item.operation}
                            options={item.options}
                            reviews={item.reviews}
                            website={item.website}
                        />
                    </Card>
                ))}
            </CardStack>
        </SafeAreaView>
        </ImageBackground>
  );
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

const styles = StyleSheet.create({
    container: {
        margin: 10
    },
    background: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
})
