import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { Formik } from 'formik';
import { primaryColor } from '../assets/color';

function SendPass({ navigation }) {
  const [email, setEmail] = useState('');

  const handleSendPassword = (values) => {
    const { email } = values;
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        console.log('Success: Password Reset Email sent.');
        Alert.alert('Thông báo', 'Yêu cầu thành công');
      })
      .catch((error) => {
        console.error('Error sending password reset email:', error.message);
        Alert.alert('Lỗi', 'Email không tồn tại');
      });
  };

  const handleBackToLogin = () => {
    // Thực hiện chuyển hướng đến trang đăng nhập
    navigation.navigate('Login');
  };

  return (
    <Formik
      initialValues={{
        email: '',
      }}
      onSubmit={(values) => handleSendPassword(values)}>
      {({ handleBlur, handleChange, handleSubmit, values, errors, touched }) => (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff' }}>
          <TextInput
            label="Email"
            placeholder="Nhập email của bạn"
            mode="outlined"
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            style={{
              marginTop: 10,
              marginLeft: 10,
              marginRight: 10,
              marginBottom: 20,
            }}
            error={touched.email && errors.email}
          />
          <Button
            mode="contained"
            style={{
              borderRadius: 0,
              marginLeft: 10,
              marginRight: 10,
              paddingTop: 5,
              paddingBottom: 5,
              backgroundColor: '#000000',
            }}
            onPress={handleSubmit}>
            <Text style={{ fontSize: 18 }}>Gửi yêu cầu</Text>
          </Button>
          <Button
            mode="text"
            style={{
              marginTop: 10,
              marginLeft: 10,
              marginRight: 10,
              paddingTop: 20,
              paddingBottom: 20,
            }}
            onPress={handleBackToLogin}>
            <Text style={{ fontSize: 18 }}>Quay lại đăng nhập</Text>
          </Button>
        </View>
      )}
    </Formik>
  );
}

export default SendPass;
