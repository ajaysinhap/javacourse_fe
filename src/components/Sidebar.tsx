import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { db } from '.././../firebaseConfig'; // Import Firestore
import { collection, getDocs } from 'firebase/firestore';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  onSelectScreen: (id: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, onSelectScreen }) => {
    // State to hold the chapters data and loading state
  const [chapters, setChapters] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Chapter"));
        const chaptersData: any[] = [];
        querySnapshot.forEach((doc) => {
          chaptersData.push({ id: doc.id, ...doc.data() });
        });
        setChapters(chaptersData); 
      } catch (error) {
        console.error("Error fetching chapters data: ", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchChapters(); 
  }, []);

  return (
    <View style={[styles.sidebar, !isOpen && styles.sidebarCollapsed]}>
      {isOpen && (
        <>
          <TouchableOpacity onPress={toggleSidebar} style={styles.toggleButton}>
            <Icon name="close" size={24} color="#ecf0f1" />
          </TouchableOpacity>
          
          {loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            chapters.map((chapter) => (
              <TouchableOpacity
                key={chapter.id}
                onPress={() => onSelectScreen(chapter.id)}
                style={styles.menuItem}
              >
                <Text style={styles.menuText}>{chapter.chapterName}</Text>
              </TouchableOpacity>
            ))
          )}
        </>
      )}
    </View>
  );
};

const { height: screenHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    width: 300,
    zIndex: 999,
    backgroundColor: '#2c3e50',
    paddingVertical: 20,
    height: screenHeight,
  },
  sidebarCollapsed: {
    width: 0,
  },
  toggleButton: {
    alignSelf: 'flex-end',
    marginHorizontal: 10,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 30,
    color: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  menuText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
    fontFamily: 'lucida grande',
    cursor: 'pointer',
  },
});

export default Sidebar;
