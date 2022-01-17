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
  Button,
  TextInput,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import ListMovies from './ListMovies';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

export default function Home({navigation}) {
  const colourScheme = useColorScheme();
  const isDarkMode = colourScheme === 'dark';
  const textStyleTitle = {
    justifyContent: 'center',
    color: isDarkMode ? 'white' : 'black',
    fontSize: 30,
    fontWeight: '600',
    marginTop: 10,
    padding: 20,
    alignSelf: 'center',
    width: '90%',
  };
  const viewStyleContent = {
    backgroundColor: isDarkMode ? 'gray' : 'white',
    borderRadius: 15,
    height: '100%',
    flex: 2.4,
    padding: 15,
    marginTop: 20,
    position: 'relative',
  };

  const viewStyle = {
    flex: 1, 
    backgroundColor: '#4c8ec9',
  };
  const textStyle = {color: isDarkMode ? 'white' : 'black'};

  const [topRated, settopRated] = useState([]);
  const [recomended, setRecomended] = useState([]);
  const urlTopRated =
    'https://api.themoviedb.org/3/movie/top_rated?api_key=23acf9ad61b49a0fe221d40246980280&language=en-US&page=1';
  const urlRecomended =
    'https://api.themoviedb.org/3/movie/popular?api_key=23acf9ad61b49a0fe221d40246980280&language=en-US&page=1';

  const [filter, setFilter] = useState("")

 

  return (
    <View style={viewStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      
      <View>
        <Text style={textStyleTitle}>Hello, what do you want to watch ?</Text>
        <FontAwesomeIcon
          icon={faSearch}
          color="#B7DDFF"
          style={{paddingHorizontal: 60, translateY: 37, zIndex: 2}}
        />

        <TextInput
          style={styles.input}
          placeholder="       Search"
          value={filter}
          onChangeText={(e) => setFilter(e)}
          ></TextInput>
        <Button
          title="Buscar"
          onPress={(e) =>
            setRecomended(
              recomended.filter(recomended =>
                recomended.title.includes(filter),
              ),
            )
          }></Button>
      </View>
      <View style={viewStyleContent}>
        <ScrollView>
          <ListMovies
            topRated={recomended}
            settopRated={setRecomended}
            urlAPI={urlRecomended}
            section={'RECOMENDED FOR YOU'}
            navigation={navigation}></ListMovies>
          <ListMovies
            topRated={topRated}
            settopRated={settopRated}
            urlAPI={urlTopRated}
            section={'TOP RATED'}
            navigation={navigation}></ListMovies>
        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 10,
    alignSelf: 'center',
    width: '100%',
    height: '100%',
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
  },
  carrousel: {
    width: '100%',
    height: 160,
    borderWidth: 0,
    backgroundColor: 'blue',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    backgroundColor: '#4c8ec9',
    height: '50%',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  input: {
    height: 37,
    margin: 12,
    borderWidth: 0,
    padding: 10,
    backgroundColor: '#7DB0DA',
    borderRadius: 20,
    width: '80%',
    alignSelf: 'center',
  },
});
