import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the Icon library

const ProfileScreen: React.FC = () => {
  function alert(arg0: string): void {
    Alert.alert('Profile Change', 'Redirecting to edit profile screen...');
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ 
          uri:'https://www.w3schools.com/w3images/avatar2.png'
        }} // Replace with your profile image URL
        style={styles.avatar}
      />
      <View style={styles.nameContainer}>
        <Icon name="user" size={24} color="#34495e" style={styles.icon} /> {/* Adding an icon next to the name */}
        <Text style={styles.name}>John Doe</Text>
      </View>
      <Text style={styles.email}>johndoe@example.com</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Location:</Text>
        <Text style={styles.infoText}>New York, USA</Text>

        <Text style={styles.infoTitle}>Phone:</Text>
        <Text style={styles.infoText}>+1 234 567 890</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => alert('Edit Profile')}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10, // Add some space between the icon and text
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#34495e',
  },
  email: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 20,
  },
  infoContainer: {
    width: '100%',
    marginBottom: 30,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34495e',
  },
  infoText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
