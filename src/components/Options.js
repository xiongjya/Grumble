import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements'

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

export const Options = ( props ) => {
    const transactions = ['pickup', 'delivery', 'restaurant_reservation'];

    const op = props.arr.map((x, index) => {
        return (
            <View style={styles.op} key={index}>
                <Icon
                    name='check'
                    type='font-awesome-5'
                    color='#6aa84f'
                    iconStyle={{fontSize: 13}}
                /> 

                <Text style={styles.option}>{x.capitalize()}</Text>
            </View>
        )
    })

    return (
        <View style={styles.option}>
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
    }
})