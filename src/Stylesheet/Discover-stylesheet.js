import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent"
    },
    videoContainer:{
        flex: 1,
        backgroundColor: "lightgray"
    },
    video: {
        flex: 1,
        marginBottom: 20
    },
    videoDetails: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5
    },
    videoText: {
        color: '#616161',
    }
})