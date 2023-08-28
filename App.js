import React from 'react';
import { Dimensions} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import SingleImage from './src/screens/SingleImage';
import BreedScreen from './src/screens/BreedScreen';
import SingleGif from './src/screens/SingleGif';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="DogoPedia" component={HomeScreen} />
        <Stack.Screen name="Image Info" component={SingleImage} />
        <Stack.Screen name="Gif Info" component={SingleGif} />
        <Stack.Screen name="Breed Info" component={BreedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}