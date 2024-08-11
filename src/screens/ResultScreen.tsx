// src/screens/ResultScreen.tsx
import React from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ResultScreen({ route, navigation }: any) {

  // 紹介する職業のリスト
  const jobs = [
    {name: '通訳者', image: require('../../assets/jobs/tsuuyaku.png'), description: "異なる言語を使う人たちの間に入って、話し手の言葉を聞き手が使う言語に変換する人！"},
    {name: '小説家', image: require('../../assets/jobs/write.png'), description: "物語を創作して小説を執筆する人！\n印税で生計を立てる人が多いね。"}
  ]


  const { surveyResults } = route.params;

  console.log("surveyResults: ", surveyResults);

  // 評価率の計算
  var sum = 0;
  for(var x of surveyResults) sum += x;
  const result = (sum / (surveyResults.length * 5) * 100);
  
  console.log(result)

  var id = 0;
  if(result > 50){
    id = 0
  }else {
    id = 1;
  }

  return (
    <LinearGradient
      colors={['#f5f7fa', '#c3cfe2']}
      style={styles.container}
    >
    <View style={styles.container}>
      <Text style={styles.title}>Survey Results</Text>
      {surveyResults.map((stars: number, index: number) => (
        <Text key={index}>Event {index + 1}: {stars} / 5 stars</Text>
      ))}
      <Text>このストーリーでの評価は{result}%でした！</Text>
      <Text>あなたにオススメする職業は...</Text>
      
      <Text style={styles.title}>{jobs[id].name}</Text>
      <Image style={styles.image} source={jobs[id].image} />
      <Text style={styles.description}>{jobs[id].description}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.interestedButton]} onPress={() => { /* ここに「気になる！」ボタンの処理を追加 */ }}>
            <Text style={styles.buttonText}>気になる！</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.notInterestedButton]} 
          onPress={() => {alert("別のストーリーを見てみよう！"); navigation.navigate('Home')}}>
          <Text style={styles.buttonText}>そうでもない...</Text>
        </TouchableOpacity>
      </View>
    </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
    borderRadius: 125,
    borderWidth: 1,
  },
  description: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 10,
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  interestedButton: {
    backgroundColor: '#FF6B6B',
  },
  notInterestedButton: {
    backgroundColor: '#A5A5A5',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
});

