import { StyleSheet } from 'react-native';

export const PURPLE = '#be75e4';// rgba(190, 117, 228, 1)
const WHITE = '#ffffff';
const YELLOW = '#ffd966';
const DARKYELLOW = '#fac219'

export default common = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffd966'
    },
    horizontal: {
        flexDirection: 'row'
    },
    vertical: {
        flexDirection: 'column'
    }
})