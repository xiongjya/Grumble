import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView, Text, TouchableOpacity, 
    StyleSheet} from 'react-native';

import { selectPin } from '../../redux/sessionSlice';
import { addDining, removeDining } from '../../redux/filterOptionsSlice';

import buttons from '../../styles/buttons';
import common from '../../styles/common';
import text from '../../styles/text';

const MyButton = (props) => {
    const dispatch = useDispatch();

    const [disabled, setDisabled] = useState(false);
    const onPress = () => {
        setDisabled(!disabled);

        if (disabled) {
            dispatch(removeDining(props.name));
        } else {
            dispatch(addDining(props.name));
        }
        
    }

    return (
        <TouchableOpacity
                style= { disabled
                    ? [styles.buttonBase, {backgroundColor: props.color, borderColor: '#ffffff', borderWidth: 3}]
                    : [styles.buttonBase, {backgroundColor: props.color}]}
                onPress= { onPress }
        >
            <Text style= {text.normal}>
                {props.diningOp}
            </Text>
        </TouchableOpacity>
    )
}

export const DiningOpsScreen = ({navigation}) => {
    const pin = useSelector(selectPin);

    return (
        <SafeAreaView style= {[common.container, common.vertical]}>
            <Text style={text.sessionCode}>PIN: {pin}</Text>

            <Text style= {text.qnNumber}>2/4</Text>
            <Text style= {text.question}>
                Select your dining options:
            </Text>
            <MyButton
                color= '#FF5733'
                diningOp= 'Dine-in'/>
            <MyButton
                color= '#C70039'
                diningOp= 'Pick-up'
                name='pickup'/>
            <MyButton
                color= '#900C3F'
                diningOp= 'Delivery'
                name='delivery'/>
            <TouchableOpacity 
                style={buttons.clear}
                onPress={() => navigation.navigate('DietaryOps')}
            >
                <Text style={text.clearText}> NEXT </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    buttonBase: {
        width: 241,
        height: 56,
        borderRadius: 30,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonDisabled: {
        width: 241,
        height: 56,
        borderRadius: 30,
        backgroundColor: '#d3d3d3',
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
