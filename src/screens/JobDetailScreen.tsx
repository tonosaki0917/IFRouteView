import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function JobDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { name, detail } = route.params as { name: string; detail: string };

  const message = "選択された職業は\"気になる職業リスト\"に追加されました！\n\"もっと見る\"から詳細を再度確認できます！";

  return (
    <LinearGradient
      colors={['#f5f7fa', '#c3cfe2']}
      style={styles.container}
    >
    <View style={styles.container}>
      <Text style={styles.title}>{name}になるために...</Text>
      <Text style={styles.detail}>{detail}</Text>
      <TouchableOpacity style={[styles.OKbutton]} onPress={() => {alert(message); navigation.navigate('Home')}}>
            <Text style={styles.buttonText}>完了</Text>
        </TouchableOpacity>
    </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  detail: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  OKbutton: {
    height: 60,
    marginHorizontal: 50,
    paddingVertical: 20,
    backgroundColor: '#ff75da',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginTop: 20,
    paddingHorizontal: 40,

  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
});
