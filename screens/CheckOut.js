import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ItemCheckOut } from "../components";
import { Divider } from "react-native-paper";
import { useMyContextController } from '../providers';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from "@react-navigation/native";

function CheckOut({ route }) {
  const { cartData, checkedItems, totalAmount } = route.params;
  const [totalProductAmount, setTotalProductAmount] = useState(0);
  const [total, setTotal] = useState(totalProductAmount);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const navigation = useNavigation();

  // user
  const [{ userLogin }] = useMyContextController();
  const { userId } = userLogin;

  // LOAD PRODUCT 
  useEffect(() => {
    // Tính tổng giá trị của tất cả sản phẩm
    const productAmount = cartData.reduce((acc, item) => acc + item.price, 0);
    setTotalProductAmount(productAmount);

    // Cập nhật tổng thanh toán
    const total = productAmount;
    setTotal(total);

    console.log("Nhận dữ liệu trong CheckOut:", cartData, checkedItems, totalAmount);
  }, [cartData, checkedItems, totalAmount]);

  // CHECKOUT
  const handleCheckout = async (cartItems, userId) => {
    console.log(userId)
    try {
      // Thêm đơn hàng vào collection "Bill"
      const billRef = await firestore().collection('Bill').add({
        items: cartItems,
        timestamp: firestore.FieldValue.serverTimestamp(),
        paymentMethod: selectedPaymentMethod, // Thêm phương thức thanh toán vào đơn hàng
        // Thêm thông tin khác nếu cần
      });

      // Xóa document trong collection "carts" của người dùng dựa trên userId
      const cartRef = firestore().collection('carts');
      await cartRef.doc(userId).delete();

      console.log('Thanh toán thành công!');
      Alert.alert('Thông báo', 'Cảm ơn bạn');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Lỗi khi thanh toán:', error);
    }
  };

  const numberWithCommas = (number) => {
    return number.toLocaleString('vi-VN');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>
        {/* product */}
        <FlatList
          data={cartData}
          keyExtractor={(item, index) => (item && item.id ? item.id.toString() : index.toString())}
          renderItem={({ item }) => (
            <ItemCheckOut
              name={item.name}
              price={item.price}
              srcImg={item.img}
              cate={item.category}
              quantity={item.quantity}
            />
          )}
        />
        <Divider />
        {/* Phần chọn phương thức thanh toán */}
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Chọn phương thức thanh toán:</Text>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
            onPress={() => setSelectedPaymentMethod('creditCard')}
          >
            <Icon name='credit-card' size={30} color='#000' />
            <Text style={{ marginLeft: 10 }}>Thẻ tín dụng</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
            onPress={() => setSelectedPaymentMethod('paypal')}
          >
            <Icon name='paypal' size={30} color='#000' />
            <Text style={{ marginLeft: 10 }}>PayPal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
            onPress={() => setSelectedPaymentMethod('creditCard')}
          >
            <Icon name='money' size={30} color='#000' />
            <Text style={{ marginLeft: 10 }}>Tiền mặt</Text>
          </TouchableOpacity>
          {/* Thêm các phương thức thanh toán khác tùy theo nhu cầu của bạn */}
        </View>
        {/* bill*/}
        <View style={{ justifyContent: 'space-around', paddingTop: 20, paddingBottom: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
            <Icon name='note-alt' size={30} color='#000' />
            <Text style={{ marginLeft: 5, fontSize: 16, fontWeight: 'bold', color: '#000' }}>Chi tiết thanh toán</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 10, marginRight: 10 }}>
            <Text>Tổng tiền hàng</Text>
            <Text>đ{numberWithCommas(totalProductAmount)}</Text>
          </View>
          {/* Phần phí vận chuyển đã được loại bỏ */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 10, marginRight: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>Tổng thanh toán</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'red' }}>{numberWithCommas(total)}VND</Text>
          </View>
        </View>
      </ScrollView>
      {/* button */}
      <View style={{ height: 70, borderTopWidth: 1, borderColor: '#ccc', flexDirection: 'row' }}>
        <TouchableOpacity style={{ flex: 1, backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center' }}
          onPress={() => handleCheckout(cartData, userId)}
        >
          <Text style={{ fontSize: 20, color: '#fff' }}>Giao hàng ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold'
  },
  txtAD: {
    marginLeft: 30,
    fontSize: 14,
    color: '#000',
  }
});

export default CheckOut;
