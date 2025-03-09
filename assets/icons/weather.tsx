import React from 'react';
import Svg, {Path} from 'react-native-svg';

const WeatherIcon: React.FC<{color: string}> = ({color}) => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none">
    <Path
      d="M19 18a4 4 0 1 0-8 0H7a4 4 0 1 0 0 8h10a4 4 0 1 0 0-8z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 2v4M4.22 4.22l2.83 2.83M2 12h4M4.22 19.78l2.83-2.83M12 20v-4M19.78 19.78l-2.83-2.83M22 12h-4M19.78 4.22l-2.83 2.83"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default WeatherIcon;
