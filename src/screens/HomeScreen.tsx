// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Past Survey Results</Text>
      {/* ここでアンケート結果を表示 */}
      <Button title="Take Survey" onPress={() => navigation.navigate('Survey')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // 縦方向に中央揃え
    paddingTop: 50, // 上部に余白を追加
    paddingHorizontal: 20, // 左右に余白を追加（オプション）
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center', // 中央揃え
  },
});
