import { StyleSheet } from 'react-native';

const WHITE = '#ffffff';
const PURPLE = '#be75e4';

export default text = StyleSheet.create({
    // to use with clear button
    clearText: {
        color: '#be75e4',
        fontWeight: 'bold',
        fontSize: 18
    },
    // to use with filled button
    filledText: {

    },
    // for each session
    qnNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 5
    },
    question: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 30
    },
    sessionCode: {
        position: 'absolute',
        alignSelf: 'flex-end',
        right: 20,
        top: 70,
        fontWeight: 'bold',
        fontSize: 18,
        color: '#ffffff'
    },
    // normal font size 20, can be redefined in other boxes
    normal: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff'
    }
});