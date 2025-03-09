import React, { useEffect, useRef, useState } from 'react';
import {useNavigation} from '@react-navigation/native';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import MapView, {
  Callout,
  MapPressEvent,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {MarkerWeather} from '../components/MarkerWeather';


export const StartScreen = () => {
  const [markerCoords, setMarkerCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const navigation = useNavigation<any>();
  const markerRef: any = useRef(null);
  const staticMarkerRef: any = useRef(null);

  const handleMapPress = (event: MapPressEvent) => {
    const {latitude, longitude} = event.nativeEvent.coordinate;
    setMarkerCoords({latitude, longitude});
  };

  useEffect(() => {
    if (staticMarkerRef && staticMarkerRef.current) {
      staticMarkerRef.current.showCallout();
    }
  }, [staticMarkerRef]);

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 48.3794,
          longitude: 31.1656,
          latitudeDelta: 8.0,
          longitudeDelta: 8.0,
        }}
        onMapReady={() => staticMarkerRef.current?.showCallout()}
        zoomEnabled={true}
        zoomTapEnabled={true}
        showsUserLocation={true}
        showsMyLocationButton
        zoomControlEnabled={true}
        onPress={handleMapPress}>
        <Marker
          coordinate={{latitude: 50.4501, longitude: 30.5234}}
          ref={staticMarkerRef}>
          <Callout>
            <Text>Kyiv</Text>
          </Callout>
        </Marker>
        {markerCoords && (
          <Marker
            coordinate={markerCoords}
            ref={markerRef}
            key={`marker-${markerCoords.latitude}-${markerCoords.longitude}`}>
            <Callout
              onPress={() =>
                navigation.navigate('WeekWeatherScreen', {
                  latitude: markerCoords.latitude,
                  longitude: markerCoords.longitude,
                })
              }>
              <MarkerWeather
                latitude={markerCoords.latitude}
                longitude={markerCoords.longitude}
                markerRef={markerRef}
              />
            </Callout>
          </Marker>
        )}
      </MapView>
      <View style={styles.buttonsContainer}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('StartScreen')}>
          <Text style={styles.buttonText}>Map</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('WeekWeatherScreen')}>
          <Text style={styles.buttonText}>Search</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 5},
  map: {...StyleSheet.absoluteFillObject, padding: 55},
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    rowGap: 10,
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
