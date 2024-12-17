import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';


const javascriptScreen = () => {
    const javascriptDetails = require('../asset/javscriptCoures.jpg');

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
                <Image
                    source={javascriptDetails}
                    style={styles.image}
                />
                <View style={styles.cardContent}>
                    <Text style={styles.title}>Modern JavaScript From The Beginning 2.0 (2024)</Text>
                    <Text style={styles.description}>
                        A 36-hour master course to take you from beginner to advanced JavaScript.
                    </Text>
                    <Text style={styles.details}>120,835 students</Text>
                    <Text style={styles.details}>Created by [Instructor Name]</Text>
                    <Text style={styles.details}>Last updated: 4/2024</Text>
                    <Text style={styles.language}>Languages: English [Auto], Arabic [Auto]</Text>
                </View>
            </View>
            <View style={styles.card}>
                <Text style={styles.title}> What you'll learn</Text>
                <Icon name="mobile-friendly" size={60} color="#007bff" style={styles.icon} />
                <View style={styles.pointsContainer}>
                    <Text style={styles.point}>• Learn JavaScript from scratch and in great detail - from beginner to advanced</Text>
                    <Text style={styles.point}>• Everything you need to become a JavaScript expert and apply for JavaScript jobs</Text>
                    <Text style={styles.point}>• All about variables, functions, objects and arrays</Text>
                    <Text style={styles.point}>• Deep dives into prototypes, JavaScript engines & how it works behind the scenes</Text>
                    <Text style={styles.point}>• All core features and concepts you need to know in modern JavaScript development</Text>
                </View>
            </View>
            <View style={styles.container}>
  <Text style={styles.title}>Explore related topics</Text>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Start Learning</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Start Learning</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Start Learning</Text>
    </TouchableOpacity>
  </View>
</View>
<View style={styles.container}>
  <Text style={styles.title}>Explore related topics</Text>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Start Learning</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Start Learning</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Start Learning</Text>
    </TouchableOpacity>
  </View>
</View>





        
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding:10,
        flexGrow: 1, // Ensure ScrollView content can grow
        paddingBottom: 20, // Adds padding at the bottom to prevent content from getting cut off
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5,
        margin: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    image: {
        width: '100%',
        height: 180,
        borderRadius: 10,
    },
    cardContent: {
        marginTop: 10,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#333',
    },
    description: {
        fontSize: 18,
        color: '#555',
        marginVertical: 5,
    },
    details: {
        fontSize: 18,
        color: '#777',
    },
    language: {
        fontSize: 18,
        color: '#777',
        marginVertical: 5,
    },
    button: {
        backgroundColor: '#ff6666',
        paddingVertical: 10,
        marginTop: 15,
        borderRadius: 5,
        alignItems: 'center',
        padding:10
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },


    icon: {
        marginVertical: 10,
    },
    pointsContainer: {
        marginBottom: 20,
    },
    point: {
        fontSize: 18,
        color: '#333',
        marginVertical: 2,
    },


});

export default javascriptScreen;
