import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, TouchableOpacity, Image } from 'react-native';

const HomeScreen = () => {
  const [selectedModule, setSelectedModule] = useState(null);
  const IntroductionToJava = require('../asset/image/IntroductionJavaScript.jpg')
  const VariablesDataTypesJava = require('../asset/image/ObjectOrientedJavaScript.jpg')
  const MethodsScopeJava = require('../asset/image/PromisesAndsimplifiedEasy.jpg')
  const OOPJava = require('../asset/image/VariablesDataTypes.jpg')
  const JavaExceptions = require('../asset/image/UnderstandigVuejs.png')
  const JavaCollections = require('../asset/image/FunctionsScope.jpg')
  const courseModules = [
    {
      id: 1,
      title: 'Introduction to Java',
      description: 'Learn the basics of Java, including syntax, variables, and data types.',
      imageUrl: IntroductionToJava,
    },
    {
      id: 2,
      title: 'Variables and Data Types in Java',
      description: 'Understand how to declare variables and use different data types in Java.',
      imageUrl: VariablesDataTypesJava,
    },
    {
      id: 3,
      title: 'Methods and Scope in Java',
      description: 'Explore Java methods, arguments, return values, and scope.',
      imageUrl: MethodsScopeJava,
    },
    {
      id: 4,
      title: 'Object-Oriented Programming in Java',
      description: 'Dive into classes, objects, inheritance, and polymorphism in Java.',
      imageUrl: OOPJava,
    },
    {
      id: 5,
      title: 'Java Exceptions and Error Handling',
      description: 'Understand exception handling, try-catch blocks, and custom exceptions in Java.',
      imageUrl: JavaExceptions,
    },
    {
      id: 6,
      title: 'Understanding Java Collections Framework',
      description: 'Learn about Java collections, including List, Set, Map, and more.',
      imageUrl: JavaCollections,
    },
  ];
  

  const handleCardClick = (module:any) => {
    setSelectedModule(module);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Java Course</Text>
        <Text style={styles.subHeader}>Welcome to the Java Learning Platform</Text>
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
