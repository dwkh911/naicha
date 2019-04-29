import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container:{
        flex: 1,
    },
    videoPlayer:{
        flex: 4,
        backgroundColor: 'black'
    },
    coverContainer:{
        position: 'absolute',
        width: '100%',
        height:'100%'
    },
    coverImg:{
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode:'stretch'
    },
    backIcon:{
        position: 'absolute',
        top: 10,
        left: 10
    },
    suggestion:{
        flex: 6
    },
    smallContainer:{
        flex: 1,
        padding: 10
    },
    adsImg:{
        width: null,
        height: 75
    },
    videoTitle:{
        color: 'black',
        marginBottom: 10,
        fontSize: 16,
        fontWeight: 'bold'
    },
    videoDetails:{
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 7
    },
    viewCount:{
        color:'red'
    },
    bigContainer:{
        flex: 5,
        padding: 10
    },
    divider:{
        backgroundColor:'#EEEEEE',
        marginBottom: 10
    },
    label:{
        borderLeftWidth: 5,
        borderLeftColor: 'pink',
        paddingLeft: 15,
        marginBottom: 15
    },
    videoSuggestions:{
        flex: 1,
        flexDirection: 'row',
        marginBottom: 15
    },
    videosCoverImg:{
        height: 90,
        width: 160,
        resizeMode: 'stretch'
    },
    videosSuggestionsDetails:{
        flex: 1,
        justifyContent: 'space-between',
        marginLeft: 7
    },
    commentSection:{
        flex: 1,
        flexDirection: 'row'
    },
    commentInput:{
        borderWidth:1,
        borderColor: 'gray',
        borderRadius: 15,
        width: 280
    },
    commentBtn: {
        alignSelf: 'center',
        marginLeft: 5
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