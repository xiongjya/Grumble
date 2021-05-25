import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

export const ChatScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Chats</Text>
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