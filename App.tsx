import React, { useState, useEffect } from 'react';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, ScrollView, Dimensions, Button } from 'react-native';
import HomeScreen from './src/screen/HomeScreen';
import Header from './src/components/Header';
import Sidebar from './src/components/Sidebar';
import RenderHTML from 'react-native-render-html';
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

type Chapter = {
  id: string;
  chapterName: string;
  content: string;
  image: string;
};

const contentWidth = Dimensions.get('window').width;
const Stack = createStackNavigator();

const App: React.FC = () => {
  const navigationRef = createNavigationContainerRef();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchChapters = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'chapters'));
      const fetchedChapters = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Chapter[];
      setChapters(fetchedChapters);
    } catch (error) {
      console.error('Error fetching chapters: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChapters();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Header openSidebar={() => setIsSidebarOpen(true)} />
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home">
          {() => <HomeScreen chapters={chapters} loading={loading} />}
        </Stack.Screen>
        <Stack.Screen name="chapterDetails">
          {({ route, navigation }) => {
            const { chapterIndex } = route.params;
            const chapter = chapters[chapterIndex];

            const goToNextChapter = () => {
              if (chapterIndex < chapters.length - 1) {
                navigation.navigate('chapterDetails', { chapterIndex: chapterIndex + 1 });
              }
            };

            const goToPreviousChapter = () => {
              if (chapterIndex > 0) {
                navigation.navigate('chapterDetails', { chapterIndex: chapterIndex - 1 });
              }
            };

            return chapter ? (
              <ScrollView contentContainerStyle={{ padding: 16 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
                  {chapter.chapterName}
                </Text>
                <RenderHTML contentWidth={contentWidth} source={{ html: chapter.content }} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                  <Button title="Previous" onPress={goToPreviousChapter} disabled={chapterIndex === 0} />
                  <Button title="Next" onPress={goToNextChapter} disabled={chapterIndex === chapters.length - 1} />
                </View>
              </ScrollView>
            ) : (
              <Text>Chapter not found</Text>
            );
          }}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
