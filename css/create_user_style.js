import {StyleSheet} from 'react-native'

const creat_user_style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#E1E8E8',
        justifyContent:'center',
        alignItems:'center'
    },
    botton_styles:{
        margin:12,
        backgroundColor: '#0F3D3E',
        height: 50,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingHorizontal: 80,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        justifyContent:'center',
        alignItems:'center'
    },
    botton_styles_login:{
        margin:12,
        backgroundColor: '#9ABEC2',
        height: 50,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingHorizontal: 80,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        justifyContent:'center',
        alignItems:'center'
    },
    text_styles:{
        justifyContent:'center',
        alignItems:'center',
        color: '#FFFFFF',
        fontSize: 16,
        marginLeft: 5,
        fontFamily: 'IBMPlexSansThai-Light',
        marginVertical: 2,
        marginBottom: 5
    },
    inputText:{
        height: 50,
        width:240,
        margin: 5,
    }
})

export default creat_user_style;