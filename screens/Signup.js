import React, { useState } from "react";
import { View, StyleSheet, Image, Text, Alert } from "react-native";
import { TextInput, Button } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from "@react-navigation/native";
import { primaryColor } from "../assets/color";
import { TouchableOpacity } from "react-native-gesture-handler";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Nhập email'),
  password: Yup.string()
    .min(6, 'Password ít nhất 6 chữ')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password cần có 1 ký tự in hoa, số và có ít nhất 1 ký tự đặc biệt')
    .required('Nhập Password'),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords chưa đúng')
    .required('Xác nhận Password'),
});

function Signup() {
  const [show, setShow] = useState(true);
  const navigation = useNavigation();

  const handleSignUp = async (values) => {
    const { email, password } = values;

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const userId = userCredential.user.uid;

      await firestore().collection('users').doc(email).set({
        email: email,
        userId: userId,
      });

      navigation.navigate('Login');
    } catch (error) {
      console.error('Error signing up:', error);
      Alert.alert('Notification', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/Logo.png')} style={styles.img} />
      <Text style={styles.title}>Tạo Tài Khoản Mới</Text>

      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmpassword: '',
        }}
        onSubmit={values => handleSignUp(values)}
        validationSchema={SignupSchema}
      >
        {({ handleBlur, handleChange, handleSubmit, values, touched, errors }) => (
          <View>
            <TextInput
              label="Email"
              placeholder="Enter your email address"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              style={styles.txtInput}
            />
            {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <TextInput
              label="Password"
              placeholder="Enter your password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              style={styles.txtInput}
              secureTextEntry={show}
              right={<TextInput.Icon name={show ? 'eye' : 'eye-off'} onPress={() => setShow(!show)} />}
            />
            {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <TextInput
              label="Confirm Password"
              placeholder="Confirm your password"
              value={values.confirmpassword}
              onChangeText={handleChange('confirmpassword')}
              onBlur={handleBlur('confirmpassword')}
              style={styles.txtInput}
              secureTextEntry={show}
              right={<TextInput.Icon name={show ? 'eye' : 'eye-off'} onPress={() => setShow(!show)} />}
            />
            {touched.confirmpassword && errors.confirmpassword && <Text style={styles.errorText}>{errors.confirmpassword}</Text>}

            <Button mode="contained" style={styles.btn} onPress={handleSubmit}>
              <Text style={styles.txtBtn}>Đăng Ký</Text>
            </Button>

            <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => { navigation.navigate('Login') }}>
              <Text style={styles.txt}>
                Bạn có sẵn sàn tạo tài khoản ? <Text style={styles.txtLink}>Đăng Nhập</Text>
              </Text>
            </TouchableOpacity>
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
    marginBottom: 80
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20
  },
  txt: {
    fontSize: 16,
    color: '#000',
  },
  txtInput: {
    marginVertical: 10,
  },
  btn: {
    borderRadius: 5,
    marginVertical: 20,
    paddingVertical: 5,
    backgroundColor: '#000000',
  },
  txtBtn: {
    fontSize: 20,
    color: '#fff',
  },
  txtLink: {
    fontSize: 16,
    color: '#27A2F0',
    marginLeft: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginLeft: 15,
  },
});

export default Signup;
