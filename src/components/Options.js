import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements'

export const Options = ({
    arr
}) => {
    const op = arr.map((x, index) => {
        return (
            <View style={styles.op} key={index}>
              <Icon
                name='check'
                type='font-awesome-5'
                color='#6aa84f'
                iconStyle={{fontSize: 13}}/>
              <Text> {x} </Text>
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