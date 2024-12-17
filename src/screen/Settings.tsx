import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, TextInput, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // SafeAreaView for iOS notch support

const SettingsScreen = () => {
  const [pushNotificationsEnabled, setPushNotificationsEnabled] = useState(true);
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(false);
  const [profileName, setProfileName] = useState('John Doe');
  
  // Handle toggle changes
  const togglePushNotifications = () => setPushNotificationsEnabled(!pushNotificationsEnabled);
  const toggleEmailNotifications = () => setEmailNotificationsEnabled(!emailNotificationsEnabled);
  
  return (
    <SafeAreaView style={styles.container}> 
      <ScrollView contentContainerStyle={styles.contentContainer}>
        
        {/* Profile Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Profile</Text>
          <View style={styles.profileContainer}>
            <Image source={{ uri: 'https://www.w3schools.com/w3images/avatar2.png' }} style={styles.profileImage} />
            <TextInput
              style={styles.profileInput}
              value={profileName}
              onChangeText={setProfileName}
              placeholder="Enter your name"
            />
          </View>
        </View>
        
        {/* Notification Settings */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.optionContainer}>
            <Text style={styles.optionText}>Push Notifications</Text>
            <Switch
              value={pushNotificationsEnabled}
              onValueChange={togglePushNotifications}
            />
          </View>
          <View style={styles.optionContainer}>
            <Text style={styles.optionText}>Email Notifications</Text>
            <Switch
              value={emailNotificationsEnabled}
              onValueChange={toggleEmailNotifications}
            />
          </View>
        </View>

        {/* Privacy Settings */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Privacy Settings</Text>
          <View style={styles.optionContainer}>
            <Text style={styles.optionText}>Two Factor Authentication</Text>
            <Switch value={true} onValueChange={() => {}} />
          </View>
          <View style={styles.optionContainer}>
            <Text style={styles.optionText}>Data Sharing</Text>
            <Switch value={false} onValueChange={() => {}} />
          </View>
        </View>

        {/* Account Settings */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity style={styles.optionContainer}>
            <Text style={styles.optionText}>Linked Accounts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionContainer}>
            <Text style={styles.optionText}>Change Password</Text>
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton}>
          {/* <Text style={styles.logoutText}>Logout</Text> */}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    flexGrow: 1,
    backgroundColor: '#f8f8f8',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  sectionContainer: {
    marginBottom: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  profileInput: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 16,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#555',
  },
  logoutButton: {
    backgroundColor: '#f44336',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 30,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
