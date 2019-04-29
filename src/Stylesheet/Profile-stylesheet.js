import { StyleSheet } from 'react-native'

export default StyleSheet.create ({
    container: {
        flex: 1,
    },
    bgImg:{
        flex:1,
        height:'25%',
        backgroundColor:'#EEEEEE'
    },
    header:{
        flex:1, 
        alignItems:'flex-end',
        justifyContent: 'center'
    },
    contentContainer:{
        flex:9,
        backgroundColor:'transparent'
    },
    contentScrollview:{
        flex:1, 
        marginHorizontal: '3%',
    },
    contentBody:{
        flex:1, 
    },
    content:{
        flex:1,
        backgroundColor:'white',
        borderRadius:10,
        padding:10,
        marginTop:'17%',
    },
    buttonBanner:{
        flex:1,
        backgroundColor:'transparent',
        flexDirection:'row',
        justifyContent: 'space-around'
    },
    button:{
        borderWidth:1, 
        borderColor:'#FFCA28', 
        width: 100, 
        paddingVertical: 2,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 7,
        margin:10
    },
    buttonLabel:{
        color:'#FFCA28',
        fontSize:15
    },
    centralised:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginText:{
        color:'#FFCA28',
        fontSize:20, 
        marginVertical: 17
    },
    kuotaContainer:{
        flex:1,
        flexDirection:'row',
        marginTop:15
    },
    kuota:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderColor: 'lightgray',
    },
    levelup:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: 'lightgray',
    },
    kuotaCount:{
        color:'#FFCA28',
        fontSize:28,
        padding:10
    },
    iconContainer:{
        flex:1,
        backgroundColor:'white',
        borderRadius:10,
        padding:10,
        marginVertical:10
    },
    iconLabel:{
        fontSize:12
    },
    record:{
        flex:1,
        backgroundColor:'white',
        borderRadius:10,
        padding:10,
        marginTop:10,
        marginBottom:28
    },
    recordText:{
        fontSize:12,
        color:'lightgray'
    },
    avatar: {
        position:'absolute',
        left:'39%',
        top:'2%'
    },
    changeProfileText: {
        marginLeft: 5,
        fontSize: 18,
        color: "gold",
        padding: 4
    }
})