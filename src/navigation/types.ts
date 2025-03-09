import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type {RouteProp} from '@react-navigation/native';

export type RootStackParamList = {
  Main: undefined;
  StartScreen: undefined;
  WeekWeatherScreen: {longitude?: number, latitude?: number};
  Search: undefined;
};

export type WeekWeatherScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'WeekWeatherScreen'
>;
export type SearchNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Search'
    >;

export type WeekWeatherScreenRouteProp = RouteProp<
  RootStackParamList,
  'WeekWeatherScreen'
>;
export type SearchRouteProp = RouteProp<RootStackParamList, 'Search'>;
