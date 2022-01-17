import React from 'react';
import {Text, View, useColorScheme, Image, StyleSheet} from 'react-native';
import {useState, useEffect} from 'react';

export default function Movie({route, navigation}) {
  const {id, backdrop_path, overview, original_title} = route.params;
  const [movie, setMovie] = useState(null);
  const colourScheme = useColorScheme();
  const isDarkMode = colourScheme === 'dark';
  const textStyle = {color: isDarkMode ? 'white' : 'black'};
  const urlMovie =
    'https://api.themoviedb.org/3/movie/' +
    id +
    '?api_key=23acf9ad61b49a0fe221d40246980280&language=en-US';

  const viewStyleContent = {
    backgroundColor: isDarkMode ? 'gray' : 'white',
    borderRadius: 0,
    height: '100%',
  };

  function postData() {
    console.log('entro a consultar mvoie ');
    const response = fetch(urlMovie, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => response.json())
      .then(responseJson => {
        //alert(JSON.stringify(responseJson));

        setMovie(responseJson);
      })
      .catch(error => {
        //Error
        alert(JSON.stringify(error));
        console.error(error);
      });
  }

  useEffect(() => {
    postData();
  }, []);

  console.log('route:', route.params.release_date);
  console.log('route:', route.params);

  console.log('holi', movie);

  return (
    <View style={viewStyleContent}>
      <Image
        style={{
          width: '100%',
          height: '40%',
          alignSelf: 'center',
          borderRadius: 15,
          marginTop: -15,
        }}
        source={{
          uri: 'https://image.tmdb.org/t/p/w500/' + backdrop_path,
        }}
      />
      <View style={textStyle}>
        <Text style={styles.sectionTitle}>{original_title} </Text>
        <Text style={styles.sectionDescription}>{overview} </Text>
        <Text style={styles.sectionDescription}>
          {' '}
          Studio: {movie ? movie.production_companies[0].name : null}
        </Text>
        <Text style={styles.sectionDescription}>
          {' '}
          Genre:{' '}
          {movie
            ? movie.genres.map(n => (
                <Text key={n.id.toString()}>
                  {n.name.toString()}
                  {','}{' '}
                </Text>
              ))
            : null}
        </Text>
        <Text style={styles.sectionDescription}>
          {' '}
          Release:{' '}
          {movie
            ? new Date(movie.release_date).toDateString().substr(-4)
            : null}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    padding: 10,
  },
  sectionDescription: {
    padding: 10,
    fontSize: 14,
  },
});
