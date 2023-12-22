import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Divider, Button, TextInput } from "react-native-paper";
import { primaryColor } from "../assets/color";
import { useNavigation } from "@react-navigation/native";
import { useMyContextController } from '../providers';
import auth from "@react-native-firebase/auth";

function Setting() {
  const [{ userLogin }] = useMyContextController();
  const navigation = useNavigation();

  const [isEditing, setIsEditing] = useState(false);
  const [updatedUserInfo, setUpdatedUserInfo] = useState({
    name: userLogin.name,
    phoneNumber: userLogin.phoneNumber,
    address: userLogin.address,
  });

  useEffect(() => {
    // Cập nhật thông tin người dùng khi có sự thay đổi
    setUpdatedUserInfo({
      name: userLogin.name,
      phoneNumber: userLogin.phoneNumber,
      address: userLogin.address,
    });
  }, [userLogin]);

  const handleLogout = async () => {
    try {
      const currentUser = auth().currentUser;
      if (currentUser) {
        await auth().signOut();
        navigation.navigate('Login');
      } else {
        console.warn('Không có người dùng đang đăng nhập.');
      }
    } catch (error) {
      console.error('Đăng xuất thất bại:', error.message);
    }
  };

  const handleUpdateUserInfo = () => {
    // Thực hiện logic cập nhật thông tin người dùng
    // ...

    // Tắt chế độ chỉnh sửa và cập nhật thông tin người dùng mới
    setIsEditing(false);
    // Cập nhật thông tin người dùng trong context hoặc redux nếu sử dụng
    // dispatch(updateUserInfo(updatedUserInfo));
  };

  const handleOrderHistory = () => {
    // Xử lý khi người dùng chọn xem lịch sử đơn hàng
    // ...
  };

  const handlePurchaseHistory = () => {
    // Xử lý khi người dùng chọn xem lịch sử mua hàng
    // ...
  };

  const handleAppSettings = () => {
    // Xử lý khi người dùng chọn cài đặt ứng dụng
    // ...
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', height: 200, backgroundColor: primaryColor }}>
        <Image source={require('../assets/user.png')} style={{ height: 100, width: 100, tintColor: '#fff' }} />
        <View style={{ flex: 1, marginLeft: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>{userLogin.email}</Text>
        </View>
      </View>

      <View style={{ padding: 20 }}>
        {isEditing ? (
          <Button
            mode="contained"
            onPress={handleUpdateUserInfo}
            style={{ marginTop: 20, backgroundColor: primaryColor }}
          >
            Cập nhật
          </Button>
        ) : (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(true)}
          >
            
            <Text style={{  fontSize: 20 }}>Chỉnh sửa thông tin</Text>
          </TouchableOpacity>
        )}

        <Divider />

        {/* Button for Order History */}
        <TouchableOpacity
          style={styles.historyButton}
          onPress={handleOrderHistory}
        >
          <Text style={{ fontSize: 20 }}>Lịch sử đơn hàng</Text>
        </TouchableOpacity>
        <Divider />

        {/* Button for Purchase History */}
        <TouchableOpacity
          style={styles.historyButton}
          onPress={handlePurchaseHistory}
        >
          <Text style={{ fontSize: 20 }}>Lịch sử mua hàng</Text>
        </TouchableOpacity>
        <Divider />

        {/* Button for App Settings */}
        <TouchableOpacity
          style={styles.historyButton}
          onPress={handleAppSettings}
        >
          <Text style={{ fontSize: 20 }}>Cài đặt ứng dụng</Text>
        </TouchableOpacity>
        <Divider />

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name='arrow-circle-left' size={25} color={primaryColor} />
            <Text style={{ marginLeft: 10, fontSize: 20 }}>Đăng xuất</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  userInfoContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfoLabel: {
    fontSize: 16,
    marginLeft: 10,
    width: 100,
  },
  userInfoText: {
    fontSize: 16,
    marginLeft: 10,
  },
  userInfoTextInput: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
  },
  historyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 10,
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
});

export default Setting;
