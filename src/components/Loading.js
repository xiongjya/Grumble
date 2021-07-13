import React from 'react';
import { Image, SafeAreaView, StyleSheet } from 'react-native';

export const Loading = () => {
    return (
        <SafeAreaView style= {styles.container}>
            <Image 
                source={require('../../assets/images/loading.gif')}
                style={styles.image}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffd966'
    },
    image: {
        height: 230,
        width: 230,
        borderRadius: 360
    }
})