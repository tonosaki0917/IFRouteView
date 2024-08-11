// src/screens/SurveyScreen.tsx
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Rating } from 'react-native-ratings';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';


export default function SurveyScreen() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [surveyResults, setSurveyResults] = useState<number[]>([]); // 評価送信用
  const [currentRating, setCurrentRating] = useState<number | null>(null); // 現在の評価を保持
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<Video>(null);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const questions = [
    { id: 1, videoUri: require('../../assets/a.mp4') },
    { id: 2, videoUri: require('../../assets/b.mp4') },
    // 他の質問も追加
  ];

  // 全回答終了後に集計
  const handleNext = () => {
    const updatedResults = [...surveyResults, currentRating];
    setSurveyResults(updatedResults);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setCurrentRating(null); // リセット
    } else {
      setIsLoading(true);
      // ローディング処理後、結果を表示
      setTimeout(() => {
        setIsLoading(false);
        alert('Survey Complete!');
        navigation.navigate('Result', { surveyResults: updatedResults });
      }, 2000);
    }
  };

  useEffect(() => {
    videoRef.current?.playAsync();
  }, [currentQuestion]);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text>{questions[currentQuestion].id}</Text>
      <Video
        ref={videoRef} 
        source={questions[currentQuestion].videoUri}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay={true}
        isLooping
        style={{ width: '100%', height: 400 }}
      />
      <Rating
            showRating
            onFinishRating={(rating) => setCurrentRating(rating)}
            style={{ paddingVertical: 10 }}
          />
      <Button title="Next" onPress={() => handleNext()} />
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