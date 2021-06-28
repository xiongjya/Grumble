import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView, Text, TouchableOpacity, View, 
    StyleSheet} from 'react-native';

import { selectPin, selectStart } from '../redux/sessionSlice';
import { addDietary, removeDietary } from '../redux/filterOptionsSlice';

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
        <SafeAreaView style= {styles.container}>
            <Text style={styles.sessionCode}>PIN: {pin}</Text>

            {start ? (<Text style= {styles.qnNumber}>3/4</Text>)
                   : (<Text style= {styles.qnNumber}>1/2</Text>)
            }

            <Text style= {styles.question}>
                What are your cravings/dietary restrictions?
            </Text>

            <View style={styles.optionRow}>
                <MyButton color={COLOR1} option='Cafes' name='cafes'/>
                <MyButton color={COLOR1} option='Chinese' name='chinese'/>
                <MyButton color={COLOR2} option='Fast food' name='hotdogs'/>
            </View>

            <View style={styles.optionRow}>
                <MyButton color={COLOR1} option='Indian' name='indpak'/>
                <MyButton color={COLOR2} option='Japanese' name='japanese'/>
                <MyButton color={COLOR3} option='Kopitiam' name='kopitiam'/>
            </View>

            <View style={styles.optionRow}>
                <MyButton color={COLOR2} option='Korean' name='korean'/>
                <MyButton color={COLOR3} option='Malaysian' name='malaysian'/>
                <MyButton color={COLOR4} option='Mexican' name='mexican'/>
            </View>

            <View style={styles.optionRow}>
                <MyButton color={COLOR3} option='Thai' name='thai'/>
                <MyButton color={COLOR4} option='Vietnamese' name='vietnamese'/>
                <MyButton color={COLOR3} option='Gluten-Free' name='gluten_free'/>
            </View>

            <View style={styles.optionRow}>
                <MyButton color={COLOR4} option='Halal' name='halal'/>
                <MyButton color={COLOR3} option='Seafood' name='seafood'/>
                <MyButton color={COLOR2} option='Vegan' name='vegan'/>
            </View>

            <View style={styles.optionRow}>
                <MyButton color={COLOR2} option='Vegetarian' name='vegetarian'/>
            </View>

            <TouchableOpacity 
                style={styles.next}
                onPress={() => navigation.navigate('PriceRange')}
            >
                <Text style={styles.nextText}> NEXT </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffd966',
    },
    qnNumber: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 5
    },
    question: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 30
    },
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
    },
    next: {
        backgroundColor: '#ffd966',
        borderRadius: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        marginTop: 30,
        borderWidth: 2,
        borderColor: '#be75e4'
    },
    nextText: {
        color: '#be75e4',
        fontWeight: 'bold',
        fontSize: 18
    },
    optionRow: {
        flexDirection: 'row',
    },
    sessionCode: {
        position: 'absolute',
        alignSelf: 'flex-end',
        right: 20,
        top: 70,
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 18
    }
})
