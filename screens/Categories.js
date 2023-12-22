import React, { useState, useEffect } from "react";
import { View,StyleSheet,Text } from "react-native";
import { SearchHeader } from "../components";
import { Divider } from "react-native-paper";
import ProductComp from "../components/ProductComp"; 
import { useNavigation } from "@react-navigation/native";

import firestore from '@react-native-firebase/firestore';

function Categories({ route }) {
  const navigation = useNavigation()
  const { category } = route.params;
  const [products, setProducts] = useState([]);
  const numberWithCommas = (number) => {
    return number.toLocaleString('vi-VN'); 
};

 
  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <SearchHeader />
      <Divider />
      <Text style={{fontSize:20,fontWeight:'bold'}}></Text>
      <View style={styles.wrap}>
        {products.map(product => (
            <ProductComp
                key={product.id}
                name={product.productName}
                price={numberWithCommas(product.price)}
                sold={product.sold}
                srcImg={product.imageUrl150}
                onClick={()=> (navigation.navigate('Details',{product}))}
            />        
                    
        ))}                     
                            
        </View>
    </View>
  );
}
const styles = StyleSheet.create({
    wrap:{
        width:'100%',
        marginTop:10,
        flexDirection:'row',
        flexWrap:'wrap'
    },
})
export default Categories;
