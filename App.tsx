

import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { RootStackParamList } from './src/navigation/types';
import { StartScreen } from './src/screens/StartScreen';
import { WeekWeatherScreen } from './src/screens/WeekWeatherScreen';
export default function App() {

  const Stack = createStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartScreen">
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="WeekWeatherScreen" component={WeekWeatherScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
