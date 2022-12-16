import { StyleSheet } from "react-native";

const room_styles = StyleSheet.create({
    container:{
        flex : 1,
        backgroundColor:'#000000'
    },
    add_button_styles:{
        flex:1,
        backgroundColor: '#497E3C',
        margin:10,
        height:80,
        borderRadius:10
    },
    equipment_style:{
        flex : 1,
        flexDirection : 'row',
        marginLeft:10,
        marginRight:10,
        marginTop:10,
        height:150,
        borderRadius:10,
        backgroundColor: '#497E3C'
    }

})

export default room_styles;