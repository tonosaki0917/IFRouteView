import React from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ResultScreen({ route, navigation }: any) {

  // 紹介する職業のリスト
  var jobs = [
    {name: '通訳者', image: require('../../assets/jobs/tsuuyaku.png'), 
      overview: "異なる言語を使う人たちの間に入って、話し手の言葉を聞き手が使う言語に変換する人！",
      detail: "通訳者には高い語学力が必要です！\n週に1回模擬試験を受けるなど、結果を分析して弱点を補強しましょう！\n\n英語ディスカッションが行われる\nオンラインコミュニティ\n（例: Redditの英語ディスカッショングループ）\nに参加してみよう！\n\n法律に関する通訳であれば、\n専門知識や実際の現場を知るために\n法廷の見学をしてみよう！",
      interestRate: 0},
    {name: '小説家', image: require('../../assets/jobs/write.png'), 
      overview: "物語を創作して小説を執筆する人！\n印税で生計を立てる人が多いね。",
      detail: "ああああああああああああああああああああああああああああ",
      interestRate: 0}
  ]


  const { surveyResults } = route.params;

  console.log("surveyResults: ", surveyResults);

  // 評価率の計算
  var sum = 0;
  for(var x of surveyResults) sum += x;
  var result = (sum / (surveyResults.length * 5) * 100);
  result = Math.round(result * 10) / 10;
  
  console.log(result)

  var id = 0;
  if(result > 50){
    id = 0
  }else {
    id = 1;
  }

  // 選択した職業を保存
  const handleInterested = async () => {
    const currentFavorites = await AsyncStorage.getItem('favoriteJobs');
    const updatedFavorites = currentFavorites ? JSON.parse(currentFavorites) : [];
    jobs[id].interestRate = result;
    updatedFavorites.push(jobs[id]);
    await AsyncStorage.setItem('favoriteJobs', JSON.stringify(updatedFavorites));
    alert("この職業になるために必要なことを見てみよう！");
    navigation.navigate('JobDetail', { name: jobs[id].name , detail: jobs[id].detail});
  };

  return (
    <LinearGradient
      colors={['#f5f7fa', '#c3cfe2']}
      style={styles.container}
    >
    <View style={styles.container}>
      <Text style={styles.title}>ストーリー終了！</Text>
      <Text style={styles.text}>このストーリーでの評価は{result}%でした！</Text>
      <Text style={styles.text}>あなたにオススメする職業は...</Text>
      
      <Text style={styles.title}>{jobs[id].name}</Text>
      <Image style={styles.image} source={jobs[id].image} />
      <Text style={styles.overview}>{jobs[id].overview}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.interestedButton]} onPress={handleInterested}>
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
    marginTop:5,
    marginBottom: 20,
    textAlign: 'center',
  },
  text:{
    marginBottom: 5,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
    borderRadius: 125,
    borderWidth: 1,
    backgroundColor: '#FFF',
  },
  overview: {
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

