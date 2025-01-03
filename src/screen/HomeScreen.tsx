import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

type Chapter = {
  id: string;
  chapterName: string;
  image: string;
};

type HomeScreenProps = {
  chapters: Chapter[];
  loading: boolean;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ chapters, loading }) => {
  const navigation = useNavigation();

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <FlatList
      data={chapters}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            // Navigate to chapterDetails screen with the chapter index
            navigation.navigate('chapterDetails', { chapterIndex: index });
          }}
        >
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.title}>{item.chapterName}</Text>
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
