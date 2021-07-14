import React, {useState} from 'react';
import { Dimensions, SafeAreaView, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import { useSelector } from 'react-redux';

import * as Authentication from '../../../firebase/auth';
import { updateCategories } from '../../../firebase/database';

import { selectPin, selectStart } from '../../redux/sessionSlice';

import common from '../../styles/common';
import buttons from '../../styles/buttons';
import text from '../../styles/text';

const width = Dimensions.get("window").width;

function getColor(x) {
    switch (x % 4) {
      case 0:
        return '#ff5733';
      case 1:
        return '#c70039';
      case 2:
        return '#900c3f';
      case 3:
        return '#581845';
    }
}

const MyButton = (props) => {
        const [selected, setSelected] = useState(false);
    
        const onSelected = () => {
            if (selected) {
              props.unselect();
            } else {
              props.select();
            }
            setSelected(!selected);
        }
    
        return (
            <TouchableOpacity
                    style= { selected
                        ? [styles.buttonBase, {backgroundColor: props.color}, styles.selected]
                        : [styles.buttonBase, {backgroundColor: props.color}]}
                    onPress= {onSelected}
            >
                <Text style= {styles.buttonText}>
                    {props.option}
                </Text>
            </TouchableOpacity>
        )
    }

export const DietaryOpsScreen = ({ navigation }) => {
    const start = useSelector(selectStart);
    const pin = useSelector(selectPin);
    const [selected, setSelected] = useState([].fill(false, 0, 16));

    const options = [
        {option: 'Cafes', name: 'cafes'},
        {option: 'Chinese', name: 'chinese'},
        {option: 'Fast food', name: 'hotdogs'},
        {option: 'Indian', name: 'indpak'},
        {option: 'Japanese', name: 'japanese'},
        {option: 'Kopitiam', name: 'kopitiam'},
        {option: 'Korean', name: 'korean'},
        {option: 'Malaysian', name: 'malaysian'},
        {option: 'Mexican', name: 'mexican'},
        {option: 'Kopitiam', name: 'kopitiam'},
        {option: 'Thai', name: 'thai'},
        {option: 'Vietnamese', name: 'vietnamese'},
        {option: 'Gluten-Free', name: 'gluten_free'},
        {option: 'Halal', name: 'halal'},
        {option: 'Seafood', name: 'seafood'},
        {option: 'Vegan', name: 'vegan'},
        {option: 'Vegetarian', name: 'vegetarian'}
    ]

    const onPress = () => {
        const res = [];
        for (let i = 0 ; i < options.length ; i++ ) {
            if (selected[i]) {
                res.push(options[i].name);
            }
        }
        updateCategories(pin, res);
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

            <View style={styles.body}>
            {options.map((item, index) => 
                (<MyButton 
                    key={index}
                    color={getColor(index)}
                    option={item.option}
                    name={item.name}
                    select={() => { 
                        selected[index]= true;
                        setSelected(selected);
                    }}
                    unselect={() => {
                        selected[index]= false;
                        setSelected(selected);
                    }}
                />)
            )}
            </View>

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
    body: {
        justifyContent: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    buttonBase: {
        paddingVertical: width*0.024,
        paddingHorizontal: width*0.04,
        borderRadius: 30,
        marginHorizontal: width*0.02,
        marginVertical: width*0.015,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    selected: {
        borderWidth: 2,
        borderColor: '#ffffff',
        paddingVertical: width*0.024 - 2,
        paddingHorizontal: width*0.04 - 2
    }
  });