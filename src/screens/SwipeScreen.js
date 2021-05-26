import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import Mock from '../../assets/data/mock.js';
import { CardItem } from '../components/CardItem.js';

export const SwipeScreen = () => {
  return (
        <SafeAreaView style={styles.container}>
            <CardStack
                loop={true}
                verticalSwipe={false}
                renderNoMoreCards={() => null}
<<<<<<< HEAD
            >
                {Mock.map((item, index) => (
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
=======
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
>>>>>>> acb8a9da3e8ce2ba8cb254f65af3771ea102be39
        </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
})
