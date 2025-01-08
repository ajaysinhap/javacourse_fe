import React, { useState, useEffect } from 'react';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, ScrollView, Dimensions, Button } from 'react-native';
import HomeScreen from './src/screen/HomeScreen';
import Header from './src/components/Header';
import Sidebar from './src/components/Sidebar';
import RenderHTML from 'react-native-render-html';
import { db } from './firebaseConfig';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { Icon } from 'react-native-elements';

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
      const querySnapshot = await getDocs(
        query(collection(db, 'chapters'), orderBy('index'))
      );

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
        <Stack.Screen name="Home" options={{
          title: 'Java',
          headerTitleAlign: 'center',
        }}>
          {() => <HomeScreen chapters={chapters} loading={loading} />}
        </Stack.Screen>
        <Stack.Screen
          name="chapterDetails"
          options={({ route }) => {
            const { chapterIndex } = route.params;
            return {
              title: chapters[chapterIndex]?.chapterName || 'Chapter Details',
              headerTitleAlign: 'center',
            };
          }}
        >

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
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, borderRadius: 30 }}>
                  <Icon
                    name="chevron-left"
                    size={50}
                    color="black" 
                    onPress={goToPreviousChapter}
                    disabled={chapterIndex === 0}
                  />
                  <Icon
                    name="chevron-right"
                    size={50}
                    color="black" 
                    onPress={goToNextChapter}
                    disabled={chapterIndex === chapters.length - 1}
                  />
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







