import React from "react";
import {View, StyleSheet,Image,Text, TouchableOpacity} from 'react-native'
function ItemCheckOut({name,price,cate,quantity,srcImg}) {
    const numberWithCommas = (number) => {
        return number.toLocaleString('vi-VN'); // 'vi-VN' là mã ngôn ngữ của Tiếng Việt
    };
    return ( 
        <View style={styles.container}>
            {/* address */}
            <View>
                <View style={{flexDirection:'row'}}>
                    <Image source={{uri:srcImg}} style={styles.img}/>
                    <View style={{flex:1}}>
                        <Text style={styles.txt}>{name}</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                            <Text style={styles.txt3}>{numberWithCommas(price)}VND</Text>
                            <Text style={styles.txt2}>x{quantity}</Text>
                        </View>
                    </View>
                </View>
                
            </View>
        </View>
     );
}

const styles = StyleSheet.create({
    container:{
        marginLeft:10,
        marginRight:10,
        marginBottom:20
    },
    txt:{
        fontSize:16,
        color:'#000',
        marginBottom:10
    },
    txt2:{
        fontSize:14,
        marginBottom:10
    },
    txt3:{
        fontSize:18
    },
    img: {
        width: 150,
        height: 150,
        borderRadius:30,
        marginRight:20,
        resizeMode: 'cover',
        alignSelf:'center'
    },
})
export default ItemCheckOut;