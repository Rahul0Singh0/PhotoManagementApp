import React from 'react';
import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js';

export default function ProductDetailsScreen({ route, navigation }) {
  const { photo } = route.params;

  const handleDelete = async () => {
    Alert.alert(
      'Delete Photo',
      'Are you sure you want to delete this photo?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const publicId = extractPublicId(photo.image);
  
              const timestamp = Math.floor(Date.now() / 1000);
              const stringToSign = `public_id=${publicId}&timestamp=${timestamp}lcKasFmW1Qc_mYcN0EKuBkq6Z8g`;
              const hash = CryptoJS.SHA1(stringToSign).toString();
  
              const response = await fetch(
                `https://api.cloudinary.com/v1_1/dq52jh3mg/image/destroy`,
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    public_id: publicId,
                    api_key: '927938858853285',
                    timestamp,
                    signature: hash,
                  }),
                }
              );
  
              const data = await response.json();
  
              if (response.ok) {
                const storedPhotos = await AsyncStorage.getItem('photos');
                const photos = storedPhotos ? JSON.parse(storedPhotos) : [];
                const updatedPhotos = photos.filter((item) => item.id !== photo.id);
  
                await AsyncStorage.setItem('photos', JSON.stringify(updatedPhotos));
  
                Alert.alert('Success', 'Photo deleted successfully!');
                navigation.navigate('Gallery');
              } else {
                throw new Error(data.error.message || 'Failed to delete from Cloudinary');
              }
            } catch (error) {
              console.error('Delete error:', error);
              Alert.alert('Error', 'Failed to delete photo.');
            }
          },
        },
      ]
    );
  };
  
  const extractPublicId = (url) => {
    const parts = url.split('/');
    const fileName = parts[parts.length - 1];
    const [publicId] = fileName.split('.');
    return publicId;
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo.image }} style={styles.image} />
      <Text style={styles.title}>{photo.title}</Text>
      <Text style={styles.description}>{photo.description}</Text>
      <Button title="Delete Photo" color="red" onPress={handleDelete} />
      <Button title="Back" color="blue" onPress={() => navigation.navigate("Gallery")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e6f5e4',
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
});
