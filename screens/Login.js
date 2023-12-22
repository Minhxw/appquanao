import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text, Alert } from "react-native";
import { TextInput, Button } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMyContextController, login } from '../providers';
import { TouchableOpacity } from "react-native-gesture-handler";
import { primaryColor } from "../assets/color";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Vui lòng điền email').required('Vui lòng điền email'),
  password: Yup.string().min(6, 'Password gồm 6 chữ').required('Vui lòng điền Password'),
});

function Login() {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [controller, dispatch] = useMyContextController();
  const { userLogin } = controller;

  useEffect(() => {
    if (userLogin !== null) {
      navigation.navigate("Home");
    }
  }, [userLogin]);

  const handleLogin = (values) => {
    const { email, password } = values;
    login(dispatch, email, password);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/Logo.png')} style={styles.img} />
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={values => handleLogin(values)}
      >
        {({ handleBlur, handleChange, handleSubmit, values, touched, errors }) => (
          <View>
            <TextInput
              label="Email"
              placeholder="Enter your email address"
              value={values.email}
              onBlur={handleBlur('email')}
              onChangeText={handleChange('email')}
              style={styles.txtInput}
              left={<TextInput.Icon name='email' />}
            />
            {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <TextInput
              label="Password"
              placeholder="Enter your password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              style={styles.txtInput}
              secureTextEntry={!showPassword}
              right={
                <TextInput.Icon
                  name={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
              left={<TextInput.Icon name='key' />}
            />
            {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <TouchableOpacity onPress={() => { navigation.navigate('SendPass') }}>
              <Text style={styles.txtLink}>Quên mật khẩu?</Text>
            </TouchableOpacity>

            <Button mode="contained" style={styles.btn} onPress={handleSubmit}>
              <Text style={styles.txtBtn}>Đăng nhập</Text>
            </Button>

            <View style={styles.linkContainer}>
              <Text style={styles.txt}>Chưa có tài khoản?</Text>
              <TouchableOpacity onPress={() => { navigation.navigate('Signup') }}>
                <Text style={styles.txtLink}>Đăng ký ngay</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  img: {
    width: 120,
    height: 140,
    alignSelf: 'center',
    marginBottom: 80,
  },
  txtInput: {
    marginVertical: 10,
  },
  btn: {
    borderRadius: 5,
    marginVertical: 80,
    paddingVertical: 15,
    backgroundColor: '#000000',
  },
  txtBtn: {
    fontSize: 20,
    color: '#fff',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontSize: 16,
    color: '#000',
  },
  txtLink: {
    fontSize: 16,
    color: '#27A2F0',
    marginLeft: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginLeft: 10,
  },
});

export default Login;
