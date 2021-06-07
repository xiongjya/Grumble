import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { SafeAreaView, Text, TouchableOpacity, View, 
    StyleSheet} from 'react-native';

import { selectPin, selectStart } from '../components/sessionSlice';

const COLOR1 = '#ff5733';
const COLOR2 = '#c70039';
const COLOR3 = '#900c3f';
const COLOR4 = '#581845';

const MyButton = (props) => {
    const [disabled, setDisabled] = useState(false);
    const onPress = () => {
        setDisabled(!disabled);
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
                <MyButton color={COLOR1} option='Chinese'/>
                <MyButton color={COLOR1} option='Dessert'/>
                <MyButton color={COLOR2} option='Fast food'/>
            </View>

            <View style={styles.optionRow}>
                <MyButton color={COLOR1} option='Indian'/>
                <MyButton color={COLOR2} option='Japanese'/>
                <MyButton color={COLOR3} option='Korean'/>
            </View>

            <View style={styles.optionRow}>
                <MyButton color={COLOR2} option='Local'/>
                <MyButton color={COLOR3} option='Mexican'/>
                <MyButton color={COLOR4} option='Peranakan'/>
            </View>

            <View style={styles.optionRow}>
                <MyButton color={COLOR3} option='Thai'/>
                <MyButton color={COLOR4} option='Vietnamese'/>
                <MyButton color={COLOR3} option='Gluten-free'/>
            </View>

            <View style={styles.optionRow}>
                <MyButton color={COLOR4} option='Halal'/>
                <MyButton color={COLOR3} option='Seafood'/>
                <MyButton color={COLOR2} option='Vegan'/>
            </View>

            <View style={styles.optionRow}>
                <MyButton color={COLOR2} option='Vegetarian'/>
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
        backgroundColor: '#ffffff',
        borderRadius: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        marginTop: 30
    },
    nextText: {
        color: '#ffd966',
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
