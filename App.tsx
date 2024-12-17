import React, { useState } from 'react';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import HomeScreen from './src/screen/HomeScreen';
import Header from './src/components/Header';
import Sidebar from './src/components/Sidebar';
import ProfileScreen from './src/screen/ProfileScreen';
import SettingsScreen from './src/screen/Settings';
import introductionScreen from './src/screen/introduction';
import Footer from './src/components/footer';
import javascriptScreen from './src/screen/javascriptDetails';

type Chapter = {
  id: number;
  chapterName: string;
  content: string;
 
};

const chapters: Chapter[] = [
  {
    id: 1,
    chapterName: "Introduction to Java",
    content: "<h1>Introduction to Java</h1><p>Java is a high-level, class-based, object-oriented programming language...</p>",
   
  },
  {
    id: 2,
    chapterName: "Data Types and Variables",
    content: "<h1>Data Types and Variables</h1><p>Java supports various data types such as int, float, char, and more...</p>",
   
  },
  {
    id: 3,
    chapterName: "Control Flow Statements",
    content: "<h1>Control Flow Statements</h1><p>Java provides control flow statements like if-else, switch, loops, and more...</p>",
    
  },
  {
    id: 4,
    chapterName: "Object-Oriented Programming",
    content: "<h1>Object-Oriented Programming</h1><p>OOP concepts in Java include classes, objects, inheritance, polymorphism...</p>",
    
  },
  {
    id: 5,
    chapterName: "Exception Handling",
    content: "<h1>Exception Handling</h1><p>Exception handling in Java is achieved using try-catch blocks...</p>",
    
  }
];

type RootStackParamList = {
  Home: undefined;
  introduction: undefined;
  Profile: undefined;
  Settings: undefined;
  javascriptScreen: undefined;
  chapterDetails: { chapterId: number };
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const navigationRef = createNavigationContainerRef();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleSelectChapter = (id: number) => {
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
            // Ensure 'chapter' is typed correctly
            const chapter = chapters.find((chapter: Chapter) => chapter.id === chapterId);
            return (
              chapter && (
                <View>
                  <Text>{chapter.chapterName}</Text>
                  <Text>{chapter.content}</Text>
                </View>
              )
            );
          }}
        </Stack.Screen>
      </Stack.Navigator>

      <Footer
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onSelectScreen={handleSelectChapter} // Pass the new handler
      />
    </NavigationContainer>
  );
};

export default App;
