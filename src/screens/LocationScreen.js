import React, {useState} from 'react';
import { View, Text, TouchableOpacity, 
    StyleSheet, TextInput } from 'react-native';
import Slider from '@react-native-community/slider';


export const LocationScreen = () => {
    const [postalCode, setPostalCode] = useState('');
    return (
        <View style= {styles.container}>
            <Text style= {styles.qnNumber}>4/4</Text>
            <Text style= {styles.question}>
                Choose your location:
            </Text>
            <TouchableOpacity style= {styles.useMyLocation}>
                <Text style= {styles.text}>
                    Use my location
                </Text>
            </TouchableOpacity>
            <Text style= {styles.orText}>OR</Text>
            <View style= {styles.enterPC}>
                <TextInput
                    onChangeText={text => setPostalCode(text)}
                    placeholder='Enter postal code'
                    style={styles.text}
                    value={postalCode}
                    selectionColor='#fac219'
                />
            </View>
            <Text style= {styles.question}>
                Distance radius:
            </Text>
            <Slider
                style={{width: '70%', height: 40}}
                minimumValue={0.5}
                maximumValue={5}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#rgba(255, 255, 255, 0.4)"
            />
            <View style={styles.dist}>
                <Text style= {{color: '#ffffff', fontSize: 14}}>0.5km</Text>
                <Text style= {{color: '#ffffff', fontSize: 14}}>5km</Text>
            </View>
            <TouchableOpacity style={styles.fin}>
                <Text style={styles.finText}> FINISH </Text>
            </TouchableOpacity>
        </View>
    )
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
    useMyLocation: {
        backgroundColor: '#FAC219',
        borderRadius: 30,
        width: '70%',
        height: 50,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    enterPC: {
        borderColor: '#FAC219',
        borderWidth: 2,
        borderRadius: 30,
        width: '70%',
        height: 50,
        marginBottom: 45,
        alignItems: 'center',
        justifyContent: 'center'
    },
    orText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 15,
    },
    text: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 20,
    },
    dist: {
        width: '70%',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    fin: {
        backgroundColor: '#ffffff',
        borderRadius: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        marginTop: 30
    },
    finText: {
        color: '#ffd966',
        fontWeight: 'bold',
        fontSize: 18
    },
})