import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text, View, Animated
} from 'react-native';
import { database } from '../../firebase/database';

import { selectPin } from '../redux/sessionSlice';
import { useSelector } from 'react-redux';

export const ResultsScreen = () => {
    const [allDone, setAllDone] = useState(false);
    const [top, setTop] = useState([]);
    const [usersUndone, setUsersUndone] = useState(NaN);
    const pin = useSelector(selectPin);

    const waiting = <Text style= {styles.text}> Waiting for {usersUndone} users... </Text>
    const done = <Text style= {styles.text}>
                        Your top choice: {'\n' + top[0]}
                </Text>

    useEffect(() => {
        const roomRef = database.ref('rooms/' + pin);
        roomRef
        .on('value', async (snap) => {
            const data = snap.val();
            const numUndone = data.usersJoined - data.usersDone;
            const handleData = (snap) => {
                const restaurants = [];
                snap.forEach((res) => {
                restaurants.push(res.val().name);
                });
        
                if (restaurants) {
                setTop(restaurants);
                }
            };

            setUsersUndone(numUndone);
            if (numUndone === 0) {
                await roomRef
                        .child('restaurants')
                        .orderByChild('yes')
                        .limitToLast(1)
                        .once('value', handleData, err => alert(err))
                setAllDone(true);
            }
        })
        return () => {
            roomRef.off();
        };
    }, []);

    return (
        <View style= {styles.container}>
            {!allDone && waiting}
            {allDone && done}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffd966',
    },
    text: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 20
    }
})