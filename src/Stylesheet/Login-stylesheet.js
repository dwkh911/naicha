import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#23272A'
    },
    headerImg: {
        resizeMode: 'stretch',
        width: width,
        height: height/3
    },
    loginHeader: {
        textAlign: 'center',
        fontSize: 16,
        padding: 15,
        color: 'white',
        backgroundColor: 'tomato'
    },
    inputContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        margin: 10
    },
    input: {
        marginBottom: 10
    },
    btnStyle: {
        backgroundColor: 'tomato',
        borderRadius: 35,
        marginBottom: 8
    },
    warning: {
        color: 'red',
        textAlign: 'center',
        fontSize: 12
    }
})