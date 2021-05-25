import React from 'react';
import { Text, View, SafeAreaView, StyleSheet } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import { RestaurantCard } from '../components/RestaurantCard.js';
import Mock from '../../assets/data/mock.js';

export const SwipeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <CardStack
                    loop={true}
                    verticalSwipe={false}
                    renderNoMoreCards={() => null}
                    style={styles.content}
                >
                    {Mock.map((item, index) => (
                        <Card 
                            key={index}
                            style={styles.card}
                        >
                        <RestaurantCard 
                            description={item.description}
                            image={require('../../assets/images/pasta.png')}
                            name={item.name}
                        />
                        </Card>
                    ))}
                </CardStack>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    card: {
        width: 320,
        height: 470,
        borderRadius: 5,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {
        width: 0,
        height: 1
        },
        shadowOpacity:0.5,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffd966'
    }, 
    content: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 60,
        textAlign: 'center',
        lineHeight: 400,
    }
})