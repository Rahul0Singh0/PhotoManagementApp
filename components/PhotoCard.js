import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function PhotoCard({ photo, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: photo.image }} style={styles.thumbnail} />
      <View>
        <Text style={styles.title}>{photo.title}</Text>
        <Text style={styles.description}>{photo.description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  thumbnail: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  title: {
    fontWeight: 'bold',
  },
  description: {
    color: '#666',
  },
});
