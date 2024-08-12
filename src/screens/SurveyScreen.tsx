import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { Rating } from 'react-native-ratings';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { stories } from '../data/stories';
import RPGConversation from '../components/RPGconversaion';
import { LinearGradient } from 'expo-linear-gradient';

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
        navigation.navigate('Result', { surveyResults: updatedResults });
      }, 1000);
    }
  };

  // ストーリー終了時に星とNextボタンを表示
  const handleStoryEnd = () => {
    setShowRating(true);
  };

  if (isLoading) {
    return (
      <LinearGradient
      colors={['#f5f7fa', '#c3cfe2']}
      style={styles.container}
      >
        <ActivityIndicator style={styles.container} size="large" color="#0000ff" />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#f5f7fa', '#c3cfe2']}
      style={styles.container}
    >
    <View style={styles.container}>
      <Text style={styles.title}>{stories[currentQuestion].title}</Text>
      <RPGConversation story={stories[currentQuestion]} onStoryEnd={handleStoryEnd}/>
      {showRating && (
            <View style={styles.ratingContainer}>
              <Text style={styles.text}>このストーリーに共感できますか？</Text>
              <Rating
                style={styles.rating}
                ratingColor='blue'
                ratingBackgroundColor="transparent"
                fractions={1}
                ratingCount={5}
                onFinishRating={(rating) => setCurrentRating(rating)}
              />
              <TouchableOpacity style={styles.nextButton} onPress={() => handleNext()}>
                <Text style={styles.nextButtonText}>Next</Text>
              </TouchableOpacity>
            </View>
          )}
      
    </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // 縦方向に中央揃え
    paddingTop: 50, // 余白を追加
    paddingBottom: 40,
    paddingHorizontal: 20, // 左右に余白を追加
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 5,
  },
  ratingContainer: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
  },
  rating: {
    backgroundColor: 'transparent', // 星の背景色を透明に
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: '#6200EA',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  nextButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});