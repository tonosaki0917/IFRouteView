import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function JobDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { name, detail } = route.params as { title: string; detail: string };


  return (
    <LinearGradient
      colors={['#f5f7fa', '#c3cfe2']}
      style={styles.container}
    >
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.detail}>{detail}</Text>
      <Button title="完了" onPress={() => navigation.navigate('Home')} />
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
    marginBottom: 20,
    textAlign: 'center',
  },
  detail: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
});
