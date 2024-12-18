import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, TouchableOpacity, Image } from 'react-native';

const HomeScreen = () => {
  const [selectedModule, setSelectedModule] = useState(null);
  const IntroductionJavaScript = require('../asset/IntroductionJavaScript.png')
  const ObjectOrientedJavaScript = require('../asset/ObjectOrientedJavaScript.jpg')
  const FunctionsScope = require('../asset/FunctionsScope.png')
  const VariablesDataTypes = require('../asset/VariablesDataTypes.jpg')
  const UnderstandigVuejs = require('../asset/UnderstandigVuejs.jpg')
  const PromisesAndsimplifiedEasy = require('../asset/PromisesAndsimplifiedEasy.jpg')
  const courseModules = [
    {
      id: 1,
      title: 'Introduction to JavaScript',
      description: 'Learn the basics of JavaScript, including syntax, variables, and functions.',
      imageUrl: IntroductionJavaScript,
    },
    {
      id: 2,
      title: 'Variables and Data Types',
      description: 'Understand how to declare variables and use different data types in JavaScript.',
      imageUrl: VariablesDataTypes,

    },
    {
      id: 3,
      title: 'Functions and Scope',
      description: 'Explore JavaScript functions, arguments, return values, and scope.',
      imageUrl: FunctionsScope,

    },
    {
      id: 4,
      title: 'Object-Oriented JavaScript',
      description: 'Dive into objects, methods, and classes in JavaScript.',
      imageUrl: ObjectOrientedJavaScript,

    },
    {
      id: 5,
      title: 'JavaScript promises andsimplified for Easy...',
      description: 'Dive into objects, methods, and classes in JavaScript.',
      imageUrl: PromisesAndsimplifiedEasy,
    },
    {
      id: 6,
      title: 'Understandig Vue,js ...',
      description: 'Dive into objects, methods, and classes in JavaScript.',
      imageUrl: UnderstandigVuejs,
    },
  ];

  const handleCardClick = (module:any) => {
    setSelectedModule(module);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>JavaScript Course</Text>
        <Text style={styles.subHeader}>Welcome to the JavaScript Learning Platform</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Course Modules</Text>
        <View style={styles.moduleList}>
          {courseModules.map((module) => (
            <TouchableOpacity key={module.id} onPress={() => handleCardClick(module)}>
              <View style={styles.card}>
                <Image source={module.imageUrl} style={styles.cardImage} />
                <Text style={styles.cardTitle}>{module.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* {selectedModule && (
        <View style={styles.selectedModule}>
          <Text style={styles.selectedModuleTitle}>{selectedModule.title}</Text>
          <Text style={styles.selectedModuleDescription}>{selectedModule.description}</Text>
        </View>
      )} */}

      <View style={styles.footer}>
        <Button title="Start Course" onPress={() => console.log('Course started')} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  headerText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#343a40',
  },
  subHeader: {
    fontSize: 18,
    color: '#6c757d',
  },
  section: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 15,
  },
  moduleList: {
    width: '100%',
  },
  card: {
    width: '100%',
    marginBottom: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1.5,
    elevation: 3,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
    textAlign: 'center',
    padding: 10,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});



export default HomeScreen;
