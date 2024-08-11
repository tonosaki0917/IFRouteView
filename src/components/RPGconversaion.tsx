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

  // RPGっぽい文字の出力
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    width: '90%',
    height: '90%',
    position: 'absolute',
  },
  dialogueContainer: {
    width: '80%',
    position: 'absolute',
    bottom: 80,
  },
  character: {
    width: 200,
    height: 200,
  },
  textContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 10,
  },
  speaker: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 5,
  },
  dialogue: {
    fontSize: 16,
    color: '#fff',
  },
});