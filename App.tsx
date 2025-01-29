import React, { useState, useEffect } from 'react';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, ScrollView, Dimensions, StyleSheet, Alert } from 'react-native';
import HomeScreen from './src/screen/HomeScreen';
import Header from './src/components/Header';
import Sidebar from './src/components/Sidebar';
import RenderHTML from 'react-native-render-html';
import { db, COURSE_ID } from './firebaseConfig';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { Icon } from 'react-native-elements';
import SplashScreen from './src/components/splashScreen';
import Clipboard from '@react-native-clipboard/clipboard';

type Chapter = {
  courseId: string;
  chapterName: string;
  content: string;
  image: string;
};

const contentWidth = Dimensions.get('window').width;
const Stack = createStackNavigator();

// Function to copy text to clipboard
const copyToClipboard = (text: string) => {
  Clipboard.setString(text);
  Alert.alert('Copied to Clipboard', 'The code snippet has been copied!');
};

const App: React.FC = () => {
  const navigationRef = createNavigationContainerRef();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchChapters = async () => {
    try {
      const courseId = COURSE_ID;

      const chaptersQuery = query(
        collection(db, 'chapters'),
        where('courseId', '==', courseId),
        orderBy('index')
      );

      const querySnapshot = await getDocs(chaptersQuery);

      const fetchedChapters = querySnapshot.docs.map((doc) => ({
        courseId: doc.id,
        ...doc.data(),
      })) as Chapter[];

      if (fetchedChapters.length > 0) {
        setChapters(fetchedChapters);
      } else {
        console.log('No chapters found for this courseId');
      }
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
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="MainStack" options={{ headerShown: false }}>
          {() => (
            <>
              <Header openSidebar={() => setIsSidebarOpen(true)} />
              <Sidebar
                isOpen={isSidebarOpen}
                toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
              />
              <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                  name="Home"
                  options={{
                    title: 'Java',
                    headerTitleAlign: 'center',
                  }}
                >
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
                        navigation.navigate('chapterDetails', {
                          chapterIndex: chapterIndex + 1,
                        });
                      }
                    };

                    return chapter ? (
                      <>
                        <ScrollView contentContainerStyle={{ padding: 16 }}>
                          <Text
                            style={{
                              fontSize: 20,
                              fontWeight: 'bold',
                              marginBottom: 10,
                            }}
                          >
                            {chapter.chapterName}
                          </Text>
                          <RenderHTML
                            contentWidth={contentWidth}
                            source={{ html: chapter.content }}
                            tagsStyles={{
                              code: {
                                backgroundColor: '#f4f4f4', 
                                color: 'black',
                                fontFamily: 'monospace',
                                padding: 5,
                                borderRadius: 5,
                                fontSize: 16,
                              },
                              pre: {
                                backgroundColor: '#000', 
                                color: '#fff', 
                                padding: 10,
                                borderRadius: 5,
                                fontFamily: 'monospace',
                                fontSize: 12, 
                                marginBottom: 20, 
                              },
                              h2: {
                                fontSize: 22,
                                fontWeight: 'bold',
                                marginVertical: 10,
                              },
                              h3: {
                                fontSize: 20,
                                fontWeight: 'bold',
                                marginVertical: 8,
                              },
                              a: {
                                color: 'black', // Link color
                                backgroundColor: '#E7E9EB',
                                padding: 5,
                                borderRadius: 5,
                              },
                            }}
                            renderers={{
                              pre: ({ TDefaultRenderer, ...props }) => {
                                // Extract the code text from the <pre> tag
                                const codeText = props.tnode?.domNode?.children?.[0]?.data || '';
                                return (
                                  <View style={{ position: 'relative' }}>
                                    {/* Default renderer for <pre> */}
                                    <TDefaultRenderer {...props} />
                                    {/* Copy icon in the top-right corner */}
                                    <Icon
                                      name="content-copy"
                                      type="material"
                                      size={20}
                                      color="#fff"
                                      containerStyle={styles.copyIcon}
                                      onPress={() => copyToClipboard(codeText)}
                                    />
                                  </View>
                                );
                              },
                            }}
                          />
                        </ScrollView>
                        {/* Footer with Next Icon */}
                        <View style={styles.footer}>
                          <Icon
                            name="chevron-left"
                            size={50}
                            color={chapterIndex > 0 ? 'black' : '#ddd'}
                            onPress={() =>
                              chapterIndex > 0 &&
                              navigation.navigate('chapterDetails', {
                                chapterIndex: chapterIndex - 1,
                              })
                            }
                          />
                          <Icon
                            name="chevron-right"
                            size={50}
                            color={chapterIndex < chapters.length - 1 ? 'black' : '#ddd'}
                            onPress={goToNextChapter}
                            disabled={chapterIndex === chapters.length - 1}
                          />
                        </View>
                      </>
                    ) : (
                      <Text>Chapter not found</Text>
                    );
                  }}
                </Stack.Screen>
              </Stack.Navigator>
            </>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#f8f8f8',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  copyIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#444',
    padding: 5,
    borderRadius: 5,
  },
});

export default App;






















