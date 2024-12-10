import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UploadScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };


  const handleUpload = async () => {
    if (!title || !description || !image) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', {
      uri: image,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });
    formData.append('upload_preset', 'my_preset');
  
    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dq52jh3mg/image/upload',
        {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      const data = await response.json();
      if (response.ok) {
        const photoData = {
          id: Date.now(),
          title,
          description,
          image: data.secure_url,
          publicId: data.public_id, 
        };
  
        const existingPhotos = await AsyncStorage.getItem('photos');
        const updatedPhotos = existingPhotos ? JSON.parse(existingPhotos) : [];
        updatedPhotos.push(photoData);
  
        await AsyncStorage.setItem('photos', JSON.stringify(updatedPhotos));
        Alert.alert('Success', 'Photo uploaded!');
        navigation.navigate('Gallery');
      } else {
        throw new Error(data.error.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload failed:', error);
      Alert.alert('Error', 'Failed to upload image.');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Upload Photo</Text>
      <Button title="Pick an image" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Upload" onPress={handleUpload} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});
