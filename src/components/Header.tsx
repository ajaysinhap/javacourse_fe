import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Keep this import
import { Avatar, Icon } from 'react-native-elements';

interface HeaderProps {
  openSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ openSidebar }) => {

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
    openSidebar();
  };

  return (
    <SafeAreaView style={styles.mainHeader}> {/* Wrap your content with SafeAreaView */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSidebarToggle}>
          <Icon name="menu" size={30} color="#2c3e50" />
        </TouchableOpacity>
        <Text style={styles.title}>Java</Text>
        <Avatar
          rounded
          source={{
            uri:'https://www.w3schools.com/w3images/avatar2.png'
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainHeader:{
    backgroundColor: 'grey',
    
  },
  header: {
    height:70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'grey',
  },
  title: {   
     color:'white',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'lucida grande'
  },
});

export default Header;
