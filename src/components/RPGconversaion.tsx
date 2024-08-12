import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function RPGConversation({ story = {scenes:[]}, onStoryEnd }) {
  const [currentScene, setCurrentScene] = useState(0);
  const [displayedText, setDisplayedText] = useState(''); // RPGっぽい文字の出力用
  const [index, setIndex] = useState(0);

  const scene = story.scenes[currentScene] || {};

  // シーンが変更されたときにリセット
  useEffect(() => {
    setDisplayedText('');
    setIndex(0);
  }, [scene.dialogue]);

  // RPGっぽい文字の出力(1文字ずつ出力)
  useEffect(() => {
    if (index < scene.dialogue.length) {
      const timer = setTimeout(() => {
        setDisplayedText(displayedText + scene.dialogue[index]);
        setIndex(index + 1);
      }, 24);
      return () => clearTimeout(timer);
    }
  }, [index, displayedText, scene.dialogue]);
  

  const handleNext = () => {
    setDisplayedText('');
    setIndex(0);
    if (currentScene < story.scenes.length - 1) {
        setCurrentScene(currentScene + 1);
    } else {
        // ストーリーが終了したら呼び出し
        onStoryEnd();
        setCurrentScene(0);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleNext}>
        <Image source={scene.background} style={styles.background} />
        <View style={styles.dialogueContainer}>
            <Image source={scene.character} style={styles.character} />
            <View style={styles.textContainer}>
            <Text style={styles.speaker}>{scene.speaker}</Text>
            <Text style={styles.dialogue}>{displayedText}</Text>
            </View>
        </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end', // 下側に配置
    alignItems: 'center',
    aspectRatio: 9 / 16,
    width: '90%',
    borderWidth: 1,
    marginBottom: 160,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  dialogueContainer: {
    width: '100%',
    padding: 10,
    justifyContent: 'flex-end',
  },
  character: {
    position: 'absolute',
    bottom: 40,
    left: '25%',
    transform: [{ translateX: -75 }],
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  textContainer: {
    marginTop: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
    borderRadius: 5,
  },
  speaker: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  dialogue: {
    fontSize: 14,
    color: '#fff',
  },
});