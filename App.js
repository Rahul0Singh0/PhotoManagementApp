import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import UploadScreen from './screens/UploadScreen';
import GalleryScreen from './screens/GalleryScreen';
import PhotoDetailsScreen from './screens/PhotoDetailsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Gallery">
        <Stack.Screen name="Gallery" component={GalleryScreen} />
        <Stack.Screen name="Upload" component={UploadScreen} />
        <Stack.Screen name="Details" component={PhotoDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
