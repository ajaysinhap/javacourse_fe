import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const chapters = [
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

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  onSelectScreen: (id: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, onSelectScreen }) => {
  return (
    <View style={[styles.sidebar, !isOpen && styles.sidebarCollapsed]}>
      {isOpen && (
        <>
          <TouchableOpacity onPress={toggleSidebar} style={styles.toggleButton}>
            <Icon name="close" size={24} color="#ecf0f1" />
          </TouchableOpacity>
          {chapters.map((chapter) => (
            <TouchableOpacity
              key={chapter.id}
              onPress={() => onSelectScreen(chapter.id)}
              style={styles.menuItem}
            >
              <Text style={styles.menuText}>{chapter.chapterName}</Text>
            </TouchableOpacity>
          ))}
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
