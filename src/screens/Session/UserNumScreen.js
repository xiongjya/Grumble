import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Keyboard, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Icon } from 'react-native-elements';

import * as Authentication from '../../../firebase/auth';
import * as Database from '../../../firebase/database';
import * as Firestore from '../../../firebase/firestore';

import { selectPin } from '../../redux/sessionSlice';

import buttons from '../../styles/buttons';
import common from '../../styles/common';
import text from '../../styles/text';

export const UserNumScreen = ({ navigation }) => {
    const [userNum, setUserNum] = useState('1');
    const { uid, displayName } = Authentication.getCurrentUserObject();
    const pin = useSelector(selectPin);

    const onPress = () => {
        Database.createRoom(pin, userNum);
        Firestore.createChat(pin, uid, displayName);
        navigation.navigate('Location');
    }

    return (
        <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
        >
            <SafeAreaView style={common.container}>
                <Text style={text.normal}>Number of users joining this session</Text>
                <Text style={[text.normal, styles.text]}> (including you!):</Text>

                <View style={common.horizontal}>
                    <TextInput
                        placeholder={userNum}
                        value={userNum}
                        onChangeText={setUserNum}
                        keyboardType='numeric'
                        style={[text.normal, styles.toggle]}
                    />

                    <View style={common.vertical}>
                        <Icon
                            name='chevron-up'
                            type='feather'
                            color='#ffffff'
                            containerStyle={{backgroundColor: '#be75e4', borderRadius: 30, marginBottom: 10}}
                            onPress={() => setUserNum(String(Number(userNum) + 1))}
                            disabled={userNum > 9}
                        />
                        <Icon
                            name='chevron-down'
                            type='feather'
                            color='#ffffff'
                            containerStyle={{backgroundColor: '#be75e4', borderRadius: 30}}
                            onPress={() => setUserNum(String(Number(userNum) - 1))}
                            disabled={userNum < 2}
                        />
                    </View>
                </View>

                <TouchableOpacity 
                    style={buttons.clear}
                    onPress={onPress}
                >
                    <Text style={text.clearText}> NEXT </Text>
                </TouchableOpacity>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    text: {
        marginBottom: 15
    },
    toggle: {
        marginHorizontal: 20
    }
})