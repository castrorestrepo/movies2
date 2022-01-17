import React from 'react';

import {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Input,
  TouchableOpacity,
  TextInput,
  Button,
  Image,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';

export default function ListMovies({
  topRated,
  settopRated,
  movie,
  setMovie,
  urlAPI,
  section,
  navigation,
}) {
  const colourScheme = useColorScheme();
  const isDarkMode = colourScheme === 'dark';
  const textStyle = {color: isDarkMode ? 'white' : 'black'};

  function postData() {
    console.log('entro 2');
    const response = fetch(urlAPI, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => response.json())
      .then(responseJson => {
        //alert(JSON.stringify(responseJson));
        settopRated(responseJson.results);
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

  

  const StarRating = ({stars}) => {
    var myloop = [];
    const maxStars = 5;
    const starPercentage = ((maxStars * stars) / 100) * 10;
    const starPercentageRounded = Math.round(starPercentage);
    const StarStyles = () => {
      return {
        width: starPercentageRounded + '%',
      };
    };
    for (let i = 0; i <= starPercentage; i++) {
      myloop.push(
        <View key={i}>
          <FontAwesomeIcon icon={faStar} color="yellow" />
        </View>,
      );
    }
    return (
      <View
        style={{
          flexDirection: 'column',
          flex: 1,
          position: 'absolute',
          zIndex: 2,
          marginTop: 1,
          maxHeight: '100%',
          maxWidth: '100%',
          width: '100%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            position: 'relative',
            alignContent: 'space-around',
            maxHeight: '100%',
            maxWidth: '80%',
            alignItems: 'flex-start',
            zIndex: 4,
            height: '100%',
            width: '100%',
          }}>
          {myloop}
        </View>
      </View>
    );
  };

  return (
    <View>
      <Text style={textStyle}>{section}</Text>

      <View>
        <ScrollView horizontal={true}>
          {topRated.map(e => {
            return (
              <View
                style={{
                  position: 'relative',
                  zIndex: 3,
                  flexDirection: 'column',
                  flex: 1,
                  width: 130,
                  height: '100%',
                  maxHeight: '100%',
                  maxWidth: '100%',
                }}>
                <TouchableOpacity 
                onPress={() => navigation.navigate('Movie',e)}
                style={styles.touchable}>
                  <Image
                    style={{
                      width: 120,
                      height: 160,
                      alignSelf: 'center',
                      borderRadius: 15,
                    }}
                    source={{
                      uri: 'https://image.tmdb.org/t/p/w500/' + e.poster_path,
                    }}
                  />
                </TouchableOpacity>
                
                <Text
                  style={{
                    margin: 2,
                    width: 130,
                    alignSelf: 'center',
                    borderRadius: 15,
                    color: textStyle.color,
                  }}>
                  {e.title}
                
                </Text>
                <Text
                  style={{
                    margin: 2,
                    color: textStyle.color,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      position: 'relative',
                      flex: 1,
                      zIndex: 1,
                      maxHeight: '100%',
                      maxWidth: '100%',
                    }}>
                    <StarRating stars={e.vote_average}></StarRating>

                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                  </View>
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  starsGray: {
    color: 'blue',
  },
  starsYellow: {
    color: '#f8ce0b',
  },
});
