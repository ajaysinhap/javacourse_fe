import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Alert, TouchableOpacity } from 'react-native';

const IntroductionScreen: React.FC = () => {
    const images = require('../asset/JavaScriptTutorial.png');
    const Separator = () => <View style={styles.separator} />;

    const [messageVisible, setMessageVisible] = useState(false);

    const handleCopyClick = () => {
        setMessageVisible(true);
        setTimeout(() => setMessageVisible(false), 2000); // Hide the message after 2 seconds
        Alert.alert('Copied to Clipboard');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.text}>JavaScript Basics</Text>
            <Image source={images} style={styles.image} />

            <Text style={styles.text}>What is JavaScript?</Text>
            <Separator />

            <Text style={styles.text_one}>
                JavaScript is a powerful programming language that can add interactivity to a website. It was invented by Brendan Eich.
            </Text>
            <Text style={styles.text_one}>
                JavaScript is versatile and beginner-friendly. With more experience, you'll be able to create games, animated 2D and 3D graphics, comprehensive database-driven apps, and much more!
            </Text>
            <Text style={styles.text_one}>
                JavaScript itself is relatively compact, yet very flexible. Developers have written a variety of tools on top of the core JavaScript language, unlocking a vast amount of functionality with minimum effort. These include:
            </Text>

            <Text style={styles.text_two}>1.A "Hello world!" example</Text>
            <Separator />

           <View style={styles.containerOne}>
           <Text style={styles.languageName}>HTML</Text>
            <TouchableOpacity onPress={handleCopyClick} style={styles.copyButton}>
                <Text style={styles.copyIcon}>📋</Text>
            </TouchableOpacity>
            {messageVisible && (
                <Text style={styles.copyMessage} role="alert">
                    Copied to Clipboard
                </Text>
            )}

           </View>
           <Text style={styles.text_one}>JavaScript is one of the most popular modern web technologies! As your JavaScript skills grow, your websites will enter a new dimension of power and creativity.</Text>
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1, // Ensures the ScrollView takes up the whole space
        padding: 10,
    },
    image: {
        width: '100%',
        height: 300,
        marginBottom: 10,
    },
    text: {
        fontSize: 30,
        color: 'green',
        marginBottom: 10,
    },
    text_one: {
        fontSize: 20,
        color: 'black',
        marginBottom: 10,
    },
    text_two: {
        fontSize: 30,
        color: 'green',
        marginBottom: 10,
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: 'green',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    boldText: {
        fontWeight: 'bold',
        marginBottom: 10,
    },
    italicText: {
        fontStyle: 'italic',
        marginBottom: 10,
    },
    underlineText: {
        textDecorationLine: 'underline',
        marginBottom: 10,
    },
    customSizeText: {
        fontSize: 25,
        marginBottom: 10,
    },
    combinedText: {
        fontSize: 18,
        marginBottom: 10,
    },
    languageName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
    copyButton: {
        backgroundColor: '#e0e0e0',
        padding: 8,
        borderRadius: 5,
    },
    copyIcon: {
        fontSize: 18,
    },
    copyMessage: {
        marginLeft: 10,
        color: 'green',
    },
    containerOne:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0', // You can change this to any color
        padding: 10,
        borderRadius: 5,

    }

});

export default IntroductionScreen;
