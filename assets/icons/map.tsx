import React from 'react';
import Svg, {Path} from 'react-native-svg';

const MapIcon: React.FC<{color: string}> = ({color}) => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none">
    <Path
      d="M12 2L9 8H15L12 2ZM9 8L7 21L12 16L17 21L15 8H9Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default MapIcon;
