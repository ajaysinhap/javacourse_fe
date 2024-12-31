import React, { useState, useEffect } from 'react';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Dimensions, Alert, ScrollView } from 'react-native';
import HomeScreen from './src/screen/HomeScreen';
import Header from './src/components/Header';
import Sidebar from './src/components/Sidebar';
import ProfileScreen from './src/screen/ProfileScreen';
import SettingsScreen from './src/screen/Settings';
import introductionScreen from './src/screen/introduction';
import Footer from './src/components/footer';
import javascriptScreen from './src/screen/javascriptDetails';
import RenderHTML from 'react-native-render-html';
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

type Chapter = {
  id: any;
  chapterName: any;
  content: any;
};

const contentWidth = Dimensions.get('window').width;

const Stack = createStackNavigator();

const App: React.FC = () => {
  const navigationRef = createNavigationContainerRef();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };


  // Fetch chapters from Firestore
  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "chapters"));
        const fetchedChapters = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          
        }));
        setChapters(fetchedChapters);
      } catch (error) {
        console.error("Error fetching chapters: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, []);

  const handleSelectChapter = (id: string) => {
    closeSidebar();
    if (navigationRef.isReady()) {
      navigationRef.navigate('chapterDetails', { chapterId: id }); // Navigate with chapterId
    }
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <Header openSidebar={openSidebar} />
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onSelectScreen={handleSelectChapter} // Pass the new handler
      />
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="chapterDetails">
          {({ route }) => {
            const { chapterId } = route.params;
            const chapter = chapters.find((chapter) => chapter.id === chapterId);
            return (
              chapter ? (
                <ScrollView contentContainerStyle={{ padding: 16 }}>
                <View>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
                    {chapter.chapterName}
                  </Text>
                  <RenderHTML contentWidth={contentWidth} source={{ html: chapter.content }} />
                </View>
              </ScrollView>
              ) : (
                <Text>Chapter not found</Text>
              )
            );
          }}
        </Stack.Screen>
      </Stack.Navigator>

    </NavigationContainer>
  );
};

export default App;
