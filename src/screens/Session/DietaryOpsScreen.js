import React, {useState} from 'react';
import { SafeAreaView, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { selectPin, selectStart } from '../../redux/sessionSlice';
import { addDietary, removeDietary, selectDietary } from '../../redux/filterOptionsSlice';

import common from '../../styles/common';
import buttons from '../../styles/buttons';
import text from '../../styles/text';

const COLOR1 = '#ff5733';
const COLOR2 = '#c70039';
const COLOR3 = '#900c3f';
const COLOR4 = '#581845';

const MyButton = (props) => {
    const dispatch = useDispatch();
    const [disabled, setDisabled] = useState(false);

    const onPress = () => {
        setDisabled(!disabled);

        if (disabled) {
            dispatch(removeDietary(props.name));
        } else {
            dispatch(addDietary(props.name));
        }
    }

    return (
        <TouchableOpacity
                style= { disabled
                    ? [styles.buttonBase, {backgroundColor: props.color, borderColor: '#ffffff', borderWidth: 2, paddingVertical: 8, paddingHorizontal: 18,}]
                    : [styles.buttonBase, {backgroundColor: props.color}]}
                onPress= {onPress}
        >
            <Text style= {styles.buttonText}>
                {props.option}
            </Text>
        </TouchableOpacity>
    )
}

export const DietaryOpsScreen = ({navigation}) => {
    const start = useSelector(selectStart);
    const pin = useSelector(selectPin);

    return (
        <SafeAreaView style= {[common.container, common.vertical]}>
            <Text style={text.sessionCode}>PIN: {pin}</Text>

            {start ? (<Text style= {text.qnNumber}>3/4</Text>)
                   : (<Text style= {text.qnNumber}>1/2</Text>)
            }

            <Text style= {text.question}>
                What are your cravings/dietary restrictions?
            </Text>

            <View style={common.horizontal}>
                <MyButton color={COLOR1} option='Cafes' name='cafes'/>
                <MyButton color={COLOR1} option='Chinese' name='chinese'/>
                <MyButton color={COLOR2} option='Fast food' name='hotdogs'/>
            </View>

            <View style={common.horizontal}>
                <MyButton color={COLOR1} option='Indian' name='indpak'/>
                <MyButton color={COLOR2} option='Japanese' name='japanese'/>
                <MyButton color={COLOR3} option='Kopitiam' name='kopitiam'/>
            </View>

            <View style={common.horizontal}>
                <MyButton color={COLOR2} option='Korean' name='korean'/>
                <MyButton color={COLOR3} option='Malaysian' name='malaysian'/>
                <MyButton color={COLOR4} option='Mexican' name='mexican'/>
            </View>

            <View style={common.horizontal}>
                <MyButton color={COLOR3} option='Thai' name='thai'/>
                <MyButton color={COLOR4} option='Vietnamese' name='vietnamese'/>
                <MyButton color={COLOR3} option='Gluten-Free' name='gluten_free'/>
            </View>

            <View style={common.horizontal}>
                <MyButton color={COLOR4} option='Halal' name='halal'/>
                <MyButton color={COLOR3} option='Seafood' name='seafood'/>
                <MyButton color={COLOR2} option='Vegan' name='vegan'/>
            </View>

            <View style={common.horizontal}>
                <MyButton color={COLOR2} option='Vegetarian' name='vegetarian'/>
            </View>

            <TouchableOpacity 
                style={buttons.clear}
                onPress={() => navigation.navigate('PriceRange')}
            >
                <Text style={text.clearText}> NEXT </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    buttonBase: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        marginHorizontal: 10,
        marginVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 18,
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
