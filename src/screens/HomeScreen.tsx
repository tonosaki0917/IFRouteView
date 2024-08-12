import React, { useState, useEffect } from 'react';
import { Alert, View, Text, ImageBackground, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';

interface Job {
  name: string;
  overview: string;
  image: any;
  detail: string;
  interestRate: number;
}

export default function HomeScreen() {
  const navigation = useNavigation();
  const [favoriteJobs, setFavoriteJobs] = useState<Job[]>([]);
  const [expandedItems, setExpandedItems] = useState(new Set());

  // ログアウト処理
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate('Login');
      })
      .catch(error => {
        console.error(error);
      });
  };

  // アンケート結果をロードして、職業リストを更新
  const loadSurveyResults = async () => {
    const jobs = await AsyncStorage.getItem('favoriteJobs');
    if (jobs) {
      const parsedJobs: Job[] = JSON.parse(jobs);
      // 重複した職業を除外
      const uniqueJobs = parsedJobs.filter((job, index, self) =>
        index === self.findIndex((j) => j.name === job.name)
      );
      parsedJobs.sort((a: Job, b: Job) => b.interestRate - a.interestRate);
      setFavoriteJobs(uniqueJobs);
    }
  };

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      loadSurveyResults();
    });

    return focusListener;
  }, [navigation]);

  const handleExpand = (job) => {
    const newExpandedItems = new Set(expandedItems);
    if (newExpandedItems.has(job)) {
        newExpandedItems.delete(job);
    } else {
        newExpandedItems.add(job);
    }
    setExpandedItems(newExpandedItems);
  };

  const removeJob = async (jobToRemove) => {
    const updatedJobs = favoriteJobs.filter(job => job.name !== jobToRemove.name);
    setFavoriteJobs(updatedJobs);
    await AsyncStorage.setItem('favoriteJobs', JSON.stringify(updatedJobs));
  };

  // 削除確認
  const handleDelete = (job) => {
    Alert.alert(
      "削除確認",
      "この職業を削除してもよろしいですか？",
      [
        { text: "キャンセル", style: "cancel" },
        { text: "削除", onPress: () => {removeJob(job); alert(`${job.name}が削除されました。`)} }
      ]
    );
  };

  console.log("favoriteJobs:", favoriteJobs)
  const message = "このストーリーでは、あなたに起こるかもしれない未来を想定しています。\nこのストーリーの魅力度を評価してください！";

  // 職業の概要表示と詳細説明への移動
  const renderProfession = ({ item }) => (
    <View style={styles.professionContainer}>
      <View style={styles.professionContent}>
        <Image source={item.image} style={styles.professionImage} />
        <View style={styles.professionDetails}>
          <Text style={styles.professionName}>{item.name}</Text>
          <Text >気になる率</Text>
          <Text style={styles.interestRate}>{`${item.interestRate}%`}</Text>
        </View>
        <TouchableOpacity style={styles.moreButton} onPress={() => handleDelete(item)}>
          <Text style={styles.moreText}>...</Text>
        </TouchableOpacity>
      </View>
      {expandedItems.has(item.name) && (
        <View style={styles.overviewContainer}>
          <Text style={styles.overviewText}>{item.overview}</Text>
          <TouchableOpacity 
            style={styles.detailButton} 
            onPress={() => navigation.navigate('JobDetail', { name: item.name , detail: item.detail})}
          >
            <Text style={styles.detailButtonText}>やるべきこと</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity onPress={() => handleExpand(item.name)} style={styles.expandButton}>
        <Text style={styles.expandText}>{expandedItems.has(item.name) ? '閉じる' : 'もっと見る'}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient
      colors={['#f5f7fa', '#c3cfe2']}
      style={styles.container}
    >
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.logoutIcon} onPress={handleLogout}>
          <Image source={require('../../assets/logout.png')} style={styles.logoutImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileIcon} onPress={() => navigation.navigate('Profile')}>
          <Image source={require('../../assets/prof.png')} style={styles.profileImage} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>気になる職業リスト</Text>
      <FlatList
        data={favoriteJobs}
        renderItem={renderProfession}
        keyExtractor={item => item.name}
        contentContainerStyle={styles.professionList}
      />
      <TouchableOpacity 
        onPress={() => {
          Alert.alert(
            "ご説明", message,
            [
              {text: "キャンセル", style:'cancel'},
              {text: "OK!", onPress: ()=>{navigation.navigate('Survey')}}
            ]
          )
        }}
      >
        <ImageBackground source={require('../../assets/watercolor.jpg')} style={styles.startButton} >
        <Text style={styles.startButtonText}>ストーリー開始</Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // 縦方向に中央揃え
    paddingTop: 40,
    paddingBottom: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // 左右にスペースを均等に配置
    marginBottom: 20,
  },
  profileIcon: {
    alignSelf: 'flex-end',
    padding: 8,
    borderWidth: 1.5,
    borderRadius: 200,
  },
  profileImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  logoutIcon: {
    alignSelf: 'flex-end',
    marginRight: 10, // 左端から少しスペースを作る
  },
  logoutImage:{
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 20,
    textAlign: 'center',
  },
  professionList: {
    paddingBottom: 20,
  },
  professionContainer: {
    backgroundColor: '#FEE2E2',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  professionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  professionImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    borderWidth: 1,
    backgroundColor: '#FFF',
  },
  professionDetails: {
    flex: 1,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  professionName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  interestRate: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ff6b6b',
    marginLeft: 0,
  },
  moreButton: {
    paddingHorizontal: 10,
  },
  moreText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  jobOverview: {
    fontSize: 16,
    color: '#555',
  },
  overviewContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  overviewText: {
    fontSize: 14,
    marginBottom: 10,
  },
  detailButton: {
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#FF69B4',
    borderRadius: 5,
  },
  detailButtonText: {
    color: '#FFF',
    fontSize: 14,
  },
  expandButton: {
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  expandText: {
    color: '#FF69B4',
  },
  startButton: {
    height: 200,
    marginTop: 20,
    marginBottom: 0,
    alignSelf: 'center',
    paddingVertical: 15,
    paddingHorizontal: 75,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
  },
  startButtonText: {
    flex: 1,
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
    justifyContent: 'center',
    marginTop: 65,
  },
});
