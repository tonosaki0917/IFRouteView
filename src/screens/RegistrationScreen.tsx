// src/screens/RegistrationScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function RegistrationScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [grade, setGrade] = useState('');
  const [faculty, setFaculty] = useState('');
  const navigation = useNavigation();

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.navigate('Login');
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/login.jpg')} style={{position: 'absolute', opacity:0.6, resizeMode: 'contain'}}/>
      <Text style={styles.title}>IFRouteView</Text>
      <Text style={styles.subtitle}>サインアップ</Text>
      <TextInput style={styles.input} placeholder="Username" onChangeText={setUsername} value={username} />
      <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} value={email} />
      <TextInput style={styles.input} placeholder="Password" onChangeText={setPassword} value={password} secureTextEntry />
      <TextInput style={styles.input} placeholder="Password(確認用)" onChangeText={setConfirmPassword} value={confirmPassword} secureTextEntry />
      <TextInput style={styles.input} placeholder="名字" onChangeText={setLastName} value={lastName} />
      <TextInput style={styles.input} placeholder="名前" onChangeText={setFirstName} value={firstName} />
      <View style={styles.pickerContainer}>
        <RNPickerSelect style={pickerSelectStyles} onValueChange={(value) => setGrade(value)} placeholder={{ label: '学年を選択', value: ''}}
            items={[
              { label: '1年生', value: '1' },
              { label: '2年生', value: '2' },
              { label: '3年生', value: '3' },
              { label: '4年生', value: '4' },
            ]} />
        <RNPickerSelect style={pickerSelectStyles} onValueChange={(value) => setFaculty(value)} placeholder={{label: '学部を選択', value: ''}}
            items={[
              { label: '法学部', value: 'law' },
              { label: '経済学部', value: 'economics' },
              { label: '工学部', value: 'engineering' },
              { label: '文学部', value: 'literature' },
            ]} />
      </View>
      <TouchableOpacity style={[styles.button, styles.signupButton]} onPress={handleSignUp}>
        <Text style={styles.buttonText}>新規登録</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>ログインに戻る</Text>
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
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  signupButton: {
    backgroundColor: '#FF6B6B',
  },
  backButton: {
    backgroundColor: '#A5A5A5',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 40,
    width: 165,
    borderColor: 'white',
    borderWidth: 0,
    borderRadius: 5,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 10, 
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  inputAndroid: {
    height: 50,
    width: '50%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});