import React from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';

export const Loading = () => {
    return (
        <SafeAreaView style= {styles.container}>
            <ActivityIndicator size="large" color="#ffffff"/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffd966'
    }
})