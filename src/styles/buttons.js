import { StyleSheet } from 'react-native';

const YELLOW = '#ffd966';
const PURPLE = '#be75e4';

export default buttons = StyleSheet.create({
    // clear buttons: purple border and yellow inside
    clear: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffd966',
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#be75e4',
        height: 30,
        paddingHorizontal: 15,
        marginTop: 30,
    },
    filled: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#be75e4',
        borderRadius: 30,
        marginTop: 30
    }
});