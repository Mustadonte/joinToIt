import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { WEATHER_API } from '../constants/api';
import SearchIcon from '../../assets/icons/search-button.svg';
import { API_KEY } from '@env';

export const WeekWeatherScreen = () => {

  const [temperature, setTemperature] = useState([]);
  const [address, setAddres] = useState('');
  const [coordinates, setCoordinates] = useState({lat: 0, lng: 0});
  const route: any = useRoute();
  console.log(route)
  const navigation: any = useNavigation();

   const daysOfWeek = [
     'Sunday',
     'Monday',
     'Tuesday',
     'Wednesday',
     'Thursday',
     'Friday',
     'Saturday',
  ];


  const getAdress = async (lat: number, long: number) => {
    try {
       const response = await axios.get(
         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${API_KEY}`,
      );
     const fetchedAddress = `${response.data.results[1].address_components[1].long_name}, ${response.data.results[1].address_components[2].long_name}`;
      setAddres(fetchedAddress);
    } catch (error) { }
  };

  const searchByQuerry = async (text: string) => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?key=${API_KEY}&address=${text}&`,
        );
        const fetchedCoordinates = response.data.results[0].geometry.location;
        setCoordinates(fetchedCoordinates);
          console.log(fetchedCoordinates);
      } catch (error) {

      }
    };

    const getTemeratureFromCoordinatesForWeek = async (lat: number, long: number) => {
      try {
        const response = await axios.get(
          `${WEATHER_API}?latitude=${lat}&longitude=${long}&daily=apparent_temperature_max&format=json`,
        );

        const temp = response.data.daily.apparent_temperature_max;
        setTemperature(temp);

      } catch (error)
       {
        console.error('Error fetching temperature:', error);
      }
    };

  useEffect(() => {
    if (coordinates.lat !== 0 && coordinates.lng !== 0) {
      getAdress(coordinates.lat, coordinates.lng);
      getTemeratureFromCoordinatesForWeek(coordinates.lat, coordinates.lng);
      }
    }, [coordinates]);

    useEffect(() => {
      if (route.params?.latitude && route.params?.longitude) {
          getTemeratureFromCoordinatesForWeek(
            route.params.latitude,
            route.params.longitude,
          );
        getAdress(route.params.latitude, route.params.longitude);
      }

    }, [route.params?.latitude, route.params?.longitude]);
  
  console.log(API_KEY)
  return (
    <View style={{flex: 1, padding: 20}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 25,
        }}>
        <TextInput
          style={styles.search}
          value={address}
          onChangeText={text => setAddres(text)}
        />
        <Pressable onPress={() => searchByQuerry(address)}>
          <SearchIcon width={24} fill="black" />
        </Pressable>
      </View>
      {temperature.map((dayTemp, index) => {
        return (
          <View
            key={`${dayTemp + daysOfWeek[index]}`}
            style={{
              display: 'flex',
              flexDirection: 'row',
              borderRadius: 4,
              padding: 10,
              gap: 25,
              backgroundColor: '#85CAFF',
              marginBottom: 25,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <Text style={{color: 'white'}}>{daysOfWeek[index]}</Text>
              <Text style={{color: 'white'}}>{`${dayTemp} °C`}</Text>
            </View>
          </View>
        );
      })}
      <View style={styles.buttonsContainer}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('StartScreen')}>
          <Text style={styles.buttonText}>Map</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.dispatch(CommonActions.reset({index: 0, routes:[{name: 'WeekWeatherScreen'}]}))}>
          <Text style={styles.buttonText}>Search</Text>
        </Pressable>
      </View>
    </View>
  );
    };


const styles = StyleSheet.create({
  search: {
    width: '90%',
    paddingHorizontal: 10,
    borderColor: 'grey',
    borderWidth: 1,
  },

  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    position: 'absolute',
    width: '100%',
    bottom: 25,
    paddingHorizontal: 5,
    marginHorizontal: 5,
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '25%',
    borderRadius: 25,
    paddingVertical: 10,
    backgroundColor: '#4583e7',
  },
  buttonText: {fontSize: 16, textAlign: 'center', color: 'white'},
});
