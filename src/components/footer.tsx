import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';  // Using Ionicons, you can change this

type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  introduction:undefined;
  Settings: undefined;
};

interface SidebarProps {
  toggleSidebar: () => void;
  onSelectScreen: (screen: keyof RootStackParamList) => void;
}
const Footer: React.FC<SidebarProps>  = ({toggleSidebar, onSelectScreen }) => {
  return (
    <View style={styles.footer}>
      
      <TouchableOpacity style={styles.button}>
        <Icon name="search-outline" size={35} color="#fff" />
        <Text style={styles.buttonText}>search</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => onSelectScreen('Home')}>
        <Icon name="home-outline" size={35} color="#fff" />
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
     
      <TouchableOpacity style={styles.button} onPress={() => onSelectScreen('Profile')}>
        <Icon name="person-outline" size={35} color="#fff" />
        <Text style={styles.buttonText}>person</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    padding:10,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'grey',
    color: '#fff',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  button: {
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
  },
});
