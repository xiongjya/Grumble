import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

export const ProfileScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Profile</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})