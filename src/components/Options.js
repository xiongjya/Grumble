import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements'

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

export const Options = ({ arr }) => {
    const transactions = ['pickup', 'delivery', 'restaurant_reservation'];

    if (typeof arr === 'undefined') {
        return (
            <Text style={styles.unavailable}>-</Text>
        )
    }

    const op = transactions.map((x, index) => {
        return (
            <View style={styles.op} key={index}>
                {arr.includes(x) 
                    ? (<Icon
                        name='check'
                        type='font-awesome-5'
                        color='#6aa84f'
                        iconStyle={{fontSize: 13}}
                    />)
                    : (
                        <Icon
                        name='times'
                        type='font-awesome-5'
                        color='#c84031'
                        iconStyle={{fontSize: 13}}
                    />)}
                <Text style={styles.option}> {x === 'restaurant_reservation' ? 'Restaurant reservation' : x.capitalize()}   </Text>
            </View>
        )
    })

    return (
        <View style={styles.op}>
            {op}
        </View>
    )
};

const styles = StyleSheet.create({
    op: {
        flexDirection: 'row',
        marginLeft: 1,
    },
    option: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        fontWeight: 'bold'
    },
    unavailable: {
        color: '#505050'
    }
})