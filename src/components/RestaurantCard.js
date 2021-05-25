import React from 'react';
import { Text, View, Image, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';

export const RestaurantCard = ({
    description, 
    image,
    name
}) => {
    return (
        <View style={styles.container}>
            <ImageBackground 
                source={image}
                style={styles.image}
            >
                <Text style={styles.label}>{ name }</Text>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    label: {
        lineHeight: 400,
        textAlign: 'center',
        fontSize: 70,
        fontFamily: 'System',
        color: '#ffffff',
        backgroundColor: 'transparent',
      }
})