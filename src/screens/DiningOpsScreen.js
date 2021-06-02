import React, {useState} from 'react';
import { SafeAreaView, Text, TouchableOpacity, 
    StyleSheet} from 'react-native';

const selected = [];

const MyButton = (props) => {
    const [disabled, setDisabled] = useState(false);
    return (
        <TouchableOpacity
                style= { disabled
                    ? [styles.buttonBase, {backgroundColor: props.color, borderColor: '#ffffff', borderWidth: 3}]
                    : [styles.buttonBase, {backgroundColor: props.color}]}
                onPress= {() => {
                    setDisabled(!disabled);
                    selected.push(props.diningOp);
                }}
        >
            <Text style= {styles.buttonText}>
                {props.diningOp}
            </Text>
        </TouchableOpacity>
    )
}

export const DiningOpsScreen = ({navigation}) => {
    return (
        <SafeAreaView style= {styles.container}>
            <Text style= {styles.qnNumber}>2/4</Text>
            <Text style= {styles.question}>
                Select your dining options:
            </Text>
            <MyButton
                color= '#FF5733'
                diningOp= 'Dine-in'/>
            <MyButton
                color= '#C70039'
                diningOp= 'Takeaway'/>
            <MyButton
                color= '#900C3F'
                diningOp= 'Delivery'/>
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
        width: 241,
        height: 56,
        borderRadius: 30,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 20,
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
    }
})