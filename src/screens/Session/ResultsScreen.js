import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Animated } from 'react-native';
import { useSelector } from 'react-redux';
import common from '../../styles/common';
import text from '../../styles/text';
import { PURPLE } from '../../styles/common';

import { Loading } from '../../components/Loading';

import { database } from '../../../firebase/database';

import { selectPin, selectSessionSize } from '../../redux/sessionSlice';

const { height, width } = Dimensions.get('window');
const SPACING = 10;
const ITEM_SIZE = width * 0.75;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;

const ListItem = ( { item, index, scrollX} ) => {

    if (!item.image_url) {
        return <View style={{ width: EMPTY_ITEM_SIZE }} />;
    }

    const inputRange = [
        (index - 2) * ITEM_SIZE,
        (index - 1) * ITEM_SIZE,
        index * ITEM_SIZE,
      ];

      const translateY = scrollX.interpolate({
        inputRange,
        outputRange: [0, -50, 0],
        //extrapolate: 'clamp',
      });
      return (
      <View style={{ width: ITEM_SIZE }}>
        <Animated.View
          style={[{transform: [{ translateY }]}]}
        >
            <View style={styles.display}>
                <Text style={{ fontSize: 20 }}></Text>
                <Image
                    source={{ uri: item.image_url }}
                    style={styles.displayImage}
                />
                <Text style={{ fontSize: 20, fontWeight: 'bold' }} numberOfLines={2}>
                    {item.name}
                </Text>
            </View>
            <View style= {styles.badge}>
                <Text style={{fontSize: 30, fontWeight:'bold', color: '#ffffff'}}>
                    {index}
                </Text>
            </View>
        </Animated.View>
      </View>);
}

const Results = ( { data, scrollX } ) => (
    <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        bounces={false}
        contentContainerStyle={{ alignItems: 'center' }}
        snapToInterval={ITEM_SIZE}
        snapToAlignment='start'
        onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => <ListItem item= {item} index= {index} scrollX= {scrollX}/>}
    />
);

export const ResultsScreen = () => {
    const [allDone, setAllDone] = useState(false);
    const [top, setTop] = useState([]);
    const [usersUndone, setUsersUndone] = useState(NaN);
    const pin = useSelector(selectPin);
    const sessionSize = useSelector(selectSessionSize);
    const scrollX = useRef(new Animated.Value(0)).current;

    const waiting = (
    <View style= {{ alignItems: 'center', justifyContent: 'center' }}>
        <Text style= {[text.normal, styles.waiting]}> Waiting for {usersUndone} more... </Text>
        <Loading/>
    </View>)

    useEffect(() => {
        const usersDoneRef = database.ref('rooms/' + pin + '/usersDone');
        const updateNum = snap => {
            setUsersUndone(sessionSize - snap.val());
        }
        usersDoneRef
        .on('value', updateNum);
        return () => {
            usersDoneRef.off('value', updateNum);
        };
    });

    useEffect(() => {
        const roomRef = database.ref('rooms/' + pin);
        const handleData = (snap) => {
            const restaurants = [];
            snap.forEach((res) => {
            restaurants.push(res.val());
            });
    
            if (restaurants) {
            restaurants.reverse();
            setTop([{id: 'dummy1'}, ...restaurants, {id: 'dummy2'}]);
            }
        };
        if (usersUndone === 0) {
            roomRef
            .child('restaurants')
            .orderByChild('yes')
            .limitToLast(3)
            .once('value', handleData)
            .then(() => { setAllDone(true); })
            .catch((err) => { alert(err);} )
        }
    }, [usersUndone]);

    return (
        <View style={[common.container, common.vertical]}>
            {!allDone && waiting}
            {allDone && <Results data= {top} scrollX= {scrollX}/>}
        </View>
    )
}

const styles = StyleSheet.create({
    waiting: {
        marginBottom: 20
    },
    display: {
        marginHorizontal: SPACING,
        padding: SPACING * 2,
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 34,
        shadowColor: "#696969",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.8,
    },
    displayImage: {
        width: '100%',
        height: ITEM_SIZE * 1.2,
        resizeMode: 'cover',
        borderRadius: 24,
        margin: 0,
        marginBottom: 10,
    },
    badge: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: PURPLE,
        alignItems: 'center',
        alignSelf:'center',
        justifyContent: 'center',
        marginTop: 10,
        shadowColor: "#696969",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.8,
    }
})