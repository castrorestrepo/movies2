/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {useState, useEffect} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Input,
  TextInput,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import ListMovies from './src/ListMovies';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/Home';
import Movie from './src/Movie';
const Stack = createNativeStackNavigator();



const App = (props) => {
  
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName='Home' screenOptions={{
        headerShown: false,
      }} >
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Movie" component={Movie} />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default App;
