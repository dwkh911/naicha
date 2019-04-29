import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flex: 1,
        backgroundColor: '#23272A',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    content: {
        flex: 9,
        backgroundColor: 'lightgray',
        marginTop: 15
    },
    unfound:{
        flex: 9,
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cancelBtnContainer:{
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 7
    },
    cancelBtn: {
        color: 'deepskyblue',
        fontSize: 12
    },
    thumbnailContainer: {
        flex: 0.5,
        marginBottom: 30
    },
    thumbnail: {
        flex: 1,
        height: 100,
        width: 173,
        alignSelf: 'center',
        resizeMode: 'stretch'
    }
})