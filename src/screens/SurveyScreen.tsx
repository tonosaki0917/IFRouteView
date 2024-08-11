import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { Rating } from 'react-native-ratings';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { stories } from '../data/stories';
import RPGConversation from '../components/RPGconversaion';


export default function SurveyScreen() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [surveyResults, setSurveyResults] = useState<number[]>([]); // 評価送信用
  const [currentRating, setCurrentRating] = useState<number | null>(null); // 現在の評価を保持
  const [isLoading, setIsLoading] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();


  // 各回答終了後に記録・集計
  const handleNext = () => {
    if(currentRating == null) setCurrentRating(2.5);
    const updatedResults = [...surveyResults, currentRating];
    setSurveyResults(updatedResults);
    setCurrentRating(null);
    setShowRating(false);  // 星を選択後、星とNextボタンを隠す

    if (currentQuestion < stories.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setCurrentRating(null); // リセット
      //console.log(stories[currentQuestion].scenes);
    } else {
      setIsLoading(true);
      // ローディング処理後、結果を表示
      setTimeout(() => {
        setIsLoading(false);
        alert('Survey Complete!');
        navigation.navigate('Result', { surveyResults: updatedResults });
      }, 1000);
    }
  };

  // ストーリー終了時に星とNextボタンを表示
  const handleStoryEnd = () => {
    setShowRating(true);
  };

  if (isLoading) {
    return <ActivityIndicator style={styles.container} size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{stories[currentQuestion].title}</Text>
      <RPGConversation story={stories[currentQuestion]} onStoryEnd={handleStoryEnd}/>
      {showRating && (
            <View style={{ marginVertical: 20 }}>
              <Rating
                style={{ paddingVertical: 10 }}
                ratingColor='blue'
                ratingBackgroundColor="transparent"
                fractions={1}
                onFinishRating={(rating) => setCurrentRating(rating)}
              />
              <Button title="Next" onPress={() => handleNext()} />
            </View>
          )}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // 縦方向に中央揃え
    paddingTop: 50, // 余白を追加
    paddingBottom: 50,
    paddingHorizontal: 20, // 左右に余白を追加
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 30,
    textAlign: 'center', // 中央揃え
  },
});