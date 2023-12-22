import React, { useState,useEffect } from "react";
import { View, StyleSheet, Text, ScrollView, TouchableOpacity,FlatList,Image } from "react-native";
import {Button} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { CategoriesComp,ProductComp } from "../components";
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { primaryColor } from "../assets/color";
import { useMyContextController } from '../providers'

function Home() {
    const [{ userLogin }] = useMyContextController();
    const { email,name,phoneNumber,address } = userLogin;

    const navigation = useNavigation();
    const [products, setProducts] = useState([]);
  const numberWithCommas = (number) => {
        return number.toLocaleString('vi-VN'); // Có thể sử dụng Tiếng Việt
    };

    useEffect(() => {
        const unsubscribe = firestore().collection("products").onSnapshot((snapshot) => {
            const productsData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProducts(productsData);
        });
        return () => unsubscribe();
    }, []);
    return ( 
    <View style={styles.container}>
        {/* header */}
        <View style={styles.wrapHeader}>
                    <View style={{flex:1}}>
                        <Text style={{fontSize:16,  color:'#fff', marginLeft:10}}></Text>
                        <Text style={{fontSize:20,  color:'#fff', marginLeft:10}}>{name}</Text>
                    </View>
                    <Button mode="contained" style={styles.btnIcon} onPress={() => navigation.navigate('Cart')} >
                        <Icon name='cart-outline' size={22} color='#fff' />
                    </Button>
        </View>
                 <ScrollView>
                        <Text style={styles.titleTxt}>Hot 2024</Text>
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
                 </ScrollView>
                    
    </View>
     );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        flex:1
    },
    //header
    wrapHeader:{
        backgroundColor:primaryColor,
        width:'100%',
        height:'9%',
        flexDirection:'row',
        paddingTop:10,
        paddingBottom:10
        },
    txtInputHeader:{
        height:50,
        width:50,
        marginLeft:10,
        flexDirection:'row',
        alignItems:'center',
        borderRadius:30
    },
    btnIcon:{
        height:40,
        alignSelf:'center',
        backgroundColor:'transparent',
    },
    //categories
    wrapCate:{
        width:'100%',
    },
    wrap:{
        width:'210%',
        marginTop:10,
        flexDirection:'wrap',
        flexWrap:'wrap'
    },
    
    titleTxt:{
        fontSize:25,
        fontWeight:'bold',
        color:'#000',
        marginLeft:10,
        marginBottom:10,
        marginTop:10
    }
})
export default Home;