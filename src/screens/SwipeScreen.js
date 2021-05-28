import React from 'react';
import { Dimensions, ImageBackground, SafeAreaView, StyleSheet } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import mock from '../../assets/data/mock.js';
import { CardItem } from '../components/CardItem.js';

export const SwipeScreen = () => {
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
                    <Card key={index}>
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

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    background: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
})
