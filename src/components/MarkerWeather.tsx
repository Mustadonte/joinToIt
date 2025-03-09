import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Text, View} from 'react-native';
import { WEATHER_API } from '../constants/api';
import { API_KEY } from '@env';

type MarkerWeathProps = {
  latitude: number;
  longitude: number;
  markerRef: React.RefObject<any>;
};

export const MarkerWeather = ({
  latitude,
  longitude,
  markerRef,
}: MarkerWeathProps) => {
  const [city, setCity] = useState<string>('');
  const [temperature, setTemperature] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWeatherAndCity = async (lat: number, long: number) => {
      try {
        setLoading(true);

        // Fetch city name
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`,
        );
        const settlement =
          response.data.results[1].address_components[1].long_name ?? 'N/A';
        setCity(settlement);

        // Fetch weather data
        const weather = await axios.get(
          `${WEATHER_API}?latitude=${lat}&longitude=${long}&current_weather=true&format=json`,
        );
        const currentTemperature = weather.data.current_weather.temperature;
        setTemperature(
          `${currentTemperature} ${weather.data.current_weather_units.temperature}`,
        );
         if (markerRef.current && city.length !== 0 && temperature.length !== 0) {
           markerRef.current.showCallout();
         }
      } catch (error) {
        console.error('Error fetching data:', error);
        setCity('Unknown city');
        setTemperature('N/A');
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherAndCity(latitude, longitude);
  }, [city.length, latitude, longitude, markerRef, temperature.length]);
  return (
    <View style={{width: 150}}>
      <Text>{city || 'Loading city...'}</Text>
      <Text>{temperature || 'Loading temperature...'}</Text>
    </View>
  );
};
