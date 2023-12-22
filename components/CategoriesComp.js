import React from "react";
import { View,StyleSheet, TouchableOpacity,Image,Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
function CategoriesComp({name,srcImg,category}) {
    const navigation = useNavigation()
    return ( 
       <TouchableOpacity style={styles.container} onPress={()=>{navigation.navigate('Categories',{category:category})}}>
            <Image source={srcImg} style={styles.img}/>
           <View style={{alignSelf:'center'}}> 
                <Text style={styles.txt}>{name}
           </Text>
           </View>
       </TouchableOpacity>
     );
}

const styles = StyleSheet.create({
    container:{
    },
    img:{
        width:400,
        height:300,
        borderRadius:20,
        marginLeft:10
    },
    txt:
    {
        fontSize:22,
        marginLeft:10,
        fontWeight:'bold',
        color:'#000'
    }
})

export default CategoriesComp;