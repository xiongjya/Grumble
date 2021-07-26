import React from 'react';
import { Image, SafeAreaView, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';

import buttons from '../../styles/buttons';
import common from '../../styles/common';
import text from '../../styles/text';

export const EndScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={common.container}>
            <Image 
                source={require('../../../assets/images/celebration.gif')}
                style={styles.image}
            />

            <TouchableOpacity 
                onPress={() => navigation.navigate('Start')}
                style={buttons.filled}
            >
                <Text style={[text.filledText, {paddingHorizontal: 20, paddingVertical: 13}]}>Back to Start</Text>
            </TouchableOpacity>
        </SafeAreaView>
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