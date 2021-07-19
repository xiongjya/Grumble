import React from 'react';
import { Image, SafeAreaView, StyleSheet, Dimensions } from 'react-native';

export const Loading = () => {
    return (
        <Image 
            source={require('../../assets/images/loading.gif')}
            style={styles.image}
        />
    )
}

const SIZE = Dimensions.get('window').width*0.4;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffd966'
    },
    image: {
        height: SIZE,
        width: SIZE,
        borderRadius: SIZE
    }
})