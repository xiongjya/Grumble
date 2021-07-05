import React, {useState} from 'react';
import { SafeAreaView, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import { useSelector } from 'react-redux';

import * as Authentication from '../../../firebase/auth';
import * as Database from '../../../firebase/database';

import { selectPin, selectStart } from '../../redux/sessionSlice';

import common from '../../styles/common';
import buttons from '../../styles/buttons';
import text from '../../styles/text';

const COLOR1 = '#ff5733';
const COLOR2 = '#c70039';
const COLOR3 = '#900c3f';
const COLOR4 = '#581845';

export const DietaryOpsScreen = ({ navigation }) => {
    const start = useSelector(selectStart);
    const pin = useSelector(selectPin);
    const [dietaryOps, setDietaryOps] = useState([]);

    const MyButton = (props) => {
        const [disabled, setDisabled] = useState(false);
    
        const onSelected = () => {
            setDisabled(!disabled);

            if (disabled) {

            } else {

            }
        }
    
        return (
            <TouchableOpacity
                    style= { disabled
                        ? [styles.buttonBase, {backgroundColor: props.color, borderColor: '#ffffff', borderWidth: 2, paddingVertical: 8, paddingHorizontal: 18,}]
                        : [styles.buttonBase, {backgroundColor: props.color}]}
                    onPress= {onSelected}
            >
                <Text style= {styles.buttonText}>
                    {props.option}
                </Text>
            </TouchableOpacity>
        )
    }

    const onPress = () => {
        const user = Authentication.getCurrentUserId();

        navigation.navigate('PriceRange');
    };

    return (
        <SafeAreaView style= {[common.container, common.vertical]}>
            <Text style={text.sessionCode}>PIN: {pin}</Text>

            {start ? (<Text style= {text.qnNumber}>2/3</Text>)
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

            <Text>{dietaryOps}</Text>

            <TouchableOpacity 
                style={buttons.clear}
                onPress={onPress}
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
