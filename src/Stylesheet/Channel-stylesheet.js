import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container:{
        flex: 1
    },
    mainContainer:{
        flex: 1,
        backgroundColor: "#23272A"
    },
    novelContainer:{
        flex: 1,
        paddingVertical: 20
    },
    mustRead:{
        fontWeight: "bold",
        color: "white"
    },
    novelView: {
        flex: 1,
        borderRadius: 5,
        alignItems: 'flex-start',
        backgroundColor: "white",
        height: 150,
        margin: 10
    },
    novelHeader: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        padding: 10
    },
    blackText:{
        color: 'black'
    },
    novelPreview:{
        color: 'black',
        padding: 10
    },
    novelBtnContainer:{
        alignSelf: 'flex-end',
        margin: 10
    },
    novelBtnStyle: {
        backgroundColor: '#C5B358',
        borderRadius: 20, 
        paddingHorizontal: 8,
        paddingVertical: 0
    },
    divider:{
        alignSelf: 'center',
        width: '90%',
        backgroundColor: 'black'
    },
    contentLoader:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },
    typeContainer:{
        flex: 1,
        marginTop: 20,
    },
    type:{
        color: 'white',
        fontWeight: 'bold'
    },
    iconsContainer: {
        flex: 1,
        alignItems: "center",
        margin: 15
    },
    text: {
        fontSize: 12,
        color: "white",
        alignSelf: 'center'
    },
    iconImg: {
        width: 40,
        height: 40,
        marginBottom: 8
    },
    showMore: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 12
    },
    categoriesContainer: {
        flex: 1,
        backgroundColor: 'lightgray'
    },
    categorySelector: {
        flex: 2,
    },
    videoContainer: {
        flex: 8,
    },
})