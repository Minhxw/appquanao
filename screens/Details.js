import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { primaryColor } from "../assets/color";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

function Details({ route }) {
  const { product } = route.params;
  const navigation = useNavigation();
  const [isCart, setIsCart] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const userId = auth().currentUser ? auth().currentUser.uid : null;

  
  const numberWithCommas = (number) => {
    return number.toLocaleString("vi-VN"); 
  };

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const cartRef = firestore().collection('carts').doc(userId);
        const cartDoc = await cartRef.get();

        if (cartDoc.exists) {
          const cartData = cartDoc.data();
          let totalCount = 0;

          // Lặp sản phẩm và tính tổng số lượng
          Object.values(cartData).forEach((item) => {
            totalCount += item.quantity || 0;
          });

          console.log('Tổng Số Lượng:', totalCount);

          setCartCount(totalCount);
        } else {
          setCartCount(0);
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu giỏ hàng:', error);
      }
    };

    if (userId) {
      fetchCartData();
    }
  }, [userId]);

  const addToCart = async () => {
    console.log("User: " + userId)
  console.log('Product ID:', product.id);
    try {
      const cartRef = firestore().collection('carts').doc(userId);
      const cartDoc = await cartRef.get();
  
      if (!cartDoc.exists) {
       
        // Nếu giỏ hàng chưa tồn tại, tạo giỏ hàng mới
        cartRef.set({
          [product.id]: {
            name: product.productName,
            price: product.price,
            shop:product.nameShop,
            img: product.imageUrl150,
            quantity: 1,
          },
        });
      } else {
        // Nếu giỏ hàng đã tồn tại, kiểm tra sản phẩm đã có hay chưa
        const cartData = cartDoc.data();
  
        if (cartData[product.id]) {
          const newQuantity = cartData[product.id].quantity + 1;
        const newPrice = product.price * newQuantity;
          // Nếu sản phẩm đã có trong giỏ, tăng số lượng lên 1
          cartRef.update({
            // [`${product.id}.quantity`]: cartData[product.id].quantity + 1,
            // [`${product.id}.price`]: cartData[product.id].price * cartData[product.id].quantity,
            [`${product.id}.quantity`]: newQuantity,
            [`${product.id}.price`]: newPrice,
          });
        } else {
          // Nếu sản phẩm chưa có trong giỏ, thêm mới với số lượng là 1
          cartRef.update({
            [product.id]: {
            name: product.productName,
            price: product.price,
            shop:product.nameShop,
            img: product.imageUrl150,
              quantity: 1,
            },
          });
        }
      }
  
      Alert.alert('Thông báo', 'Thêm thành công vào giỏ hàng');
    } catch (error) {
      console.error('Lỗi khi thêm vào giỏ hàng:', error);
      // Xử lý lỗi hoặc hiển thị thông báo lỗi cho người dùng
      Alert.alert('Lỗi', 'Đã có lỗi xảy ra khi thêm vào giỏ hàng. Vui lòng thử lại.');
    }
  };
  
  
  return (
    <View style={styles.container}>
      <View style={styles.navigator}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={30} color="#fff" />
        </TouchableOpacity>

        <View style={styles.cartAndMore}>
          <View style={styles.cartIconContainer}>
            {isCart && (
              <Text style={styles.cartBadge}>{cartCount}</Text>
            )}
            <TouchableOpacity
              style={styles.cartIcon}
              onPress={() => navigation.navigate("Cart")}
            >
              <Icon name="cart-outline" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.wrapAll}>
        <Image style={styles.backgroundImage} source={{ uri: product.imageUrl400 }} />
        <Text style={styles.name}>{product.productName}</Text>
        <Text style={{ color: 'red', fontSize: 30 }}>{numberWithCommas(product.price)} VND</Text>
        
        <View style={styles.wrap}>

          {/* đã bán */}
          
          <Text style={{ color: '#000', fontSize: 20 }}>Đã bán : {product.sold}</Text>
          
        </View>
        <View style={{marginTop:20}}>
            <Text style={{fontSize:18,color:'#000'}}></Text>
            <Text style={{fontSize:16, marginTop:5}}>{product.description}</Text>
        </View>
      </ScrollView>
      <View style={styles.wrapBtn}>
        <TouchableOpacity style={styles.btnAddCart} onPress={addToCart}>
          <Icon name='plus' size={25} color='#fff' />
          <Text style={{ fontSize: 18, color: '#fff', marginRight: 20 }}>
            Thêm vào giỏ 
          </Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navigator: {
    backgroundColor:primaryColor,
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    position: 'relative',
    left: 20,
    backgroundColor: 'rgba(211,211,211,0.3)',
    borderRadius: 30,
    padding: 5,
  },
  cartAndMore: {
    flexDirection: 'row',
  },
  cartIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartIcon: {
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(211,211,211,0.5)',
    borderRadius: 30,
    padding: 5,
    marginRight: 10,
  },
  cartBadge: {
    position: 'relative',
    top: -15,
    left: 50,
    backgroundColor: 'red',
    fontSize: 14,
    color: '#fff',
    borderRadius: 14,
    marginRight: 5,
    paddingHorizontal: 7,
    zIndex: 1,
  },
  moreIcon: {
    position: 'relative',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(211,211,211,0.5)',
    borderRadius: 30,
    padding: 5,
    marginRight: 10,
  },
  wrapAll: {
    marginLeft: 10,
    marginRight: 10,
  },
  backgroundImage: {
    borderRadius:30,
    marginTop:10,
    height: 400,
    width: '100%',
  },
  starRating: {},
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 30,
    color: '#000000',
    paddingTop: 10,
    paddingBottom: 10,
  },
  wrapBtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  btnAddCart: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: primaryColor,
    padding: 20,
    justifyContent:'center',
  },
  btnBuy: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'red',
    padding: 20,
    justifyContent: 'space-between',
  },
});

export default Details;