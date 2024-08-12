import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.navigate('Home');
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/login.jpg')} style={{position: 'absolute', opacity:0.6, resizeMode: 'contain'}}/>
      <Text style={styles.title}>IFRouteView</Text>
      <Text style={styles.subtitle}>ログイン</Text>
      <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} value={email} />
      <TextInput style={styles.input} placeholder="Password" onChangeText={setPassword} value={password} secureTextEntry />
      <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={handleLogin}>
        <Text style={styles.buttonText}>ログイン</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.signupButton]} onPress={() => navigation.navigate('Registration')}>
        <Text style={styles.buttonText}>サインアップ</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 60,
    marginBottom: 20,
    fontFamily: 'sans-serif',
    color: '#FFF',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    fontFamily: 'sans-serif',
    color: '#FFF',
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'transparent', // 透明に設定
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // 半透明の背景色
    color: '#000', // 入力テキストの色
  },
  button: {
    marginTop: 20,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  loginButton: {
    backgroundColor: '#69A3FF',
  },
  signupButton: {
    backgroundColor: '#FF6B6B',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
});