import React, { useEffect, useState } from 'react';
import { View, FlatList, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PhotoCard from '../components/PhotoCard';

export default function GalleryScreen({ navigation }) {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      const storedPhotos = await AsyncStorage.getItem('photos');
      setPhotos(storedPhotos ? JSON.parse(storedPhotos) : []);
    };
  
    const unsubscribe = navigation.addListener('focus', fetchPhotos);
    return unsubscribe;
  }, [navigation]);
  

  return (
    <View style={styles.container}>
      <Button title="Upload Photo" onPress={() => navigation.navigate('Upload')} />
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PhotoCard
            photo={item}
            onPress={() => navigation.navigate('Details', { photo: item })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
