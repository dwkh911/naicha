import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1
    },
    headerContainer: {
        flex: 2,
        margin: 10,
        borderRadius: 15,
        padding: 10,
        backgroundColor: 'rgba(128, 128, 128, 0.5)',
    },
    novelTitle: {
        color: 'white',
        fontSize: 22,
        padding: 5
    },
    novelDetails: {
        flexDirection: 'row',
        padding: 5
    },
    viewIcon: {
        alignSelf: 'center',
        paddingRight: 5
    },
    whiteText: {
        color: 'white'
    },
    categoryIcon: {
        alignSelf: 'center',
        paddingRight: 5,
        marginLeft: 10
    },
    categoryText: {
        color: '#ff70ab'
    },
    contentContainer: {
        flex: 8, 
        backgroundColor: 'rgba(128,128,128,0.5)', 
        margin: 10, 
        padding: 10
    },
    content: {
        color: 'white',
        fontSize: 16
    },
    endContent: {
        color: 'white', 
        marginVertical: 5, 
        alignSelf: 'center'
    },
    suggestionContainer: {
        flex: 1,
        marginTop: 15
    },
    suggestion:{
        borderLeftWidth: 5,
        borderLeftColor: 'pink',
        paddingLeft: 15,
        marginBottom: 15,
        color: 'white',
        margin: 4
    },
    suggestionBtn: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        alignItems: 'center',
        padding: 8,
        margin: 4,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    suggestionTitle: {
        color: 'black',
        fontSize: 15
    },
    switchModal: {
        flex: 1,
        backgroundColor: 'rgba(211,211,211,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    switchContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 15,
        height: 45,
        width: 150
    },
    switchText: {
        color: 'black',
        fontSize: 17
    }

})