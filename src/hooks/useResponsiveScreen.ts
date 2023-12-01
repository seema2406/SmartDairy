import { Dimensions } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export const useResponsiveScreen = () => {
  const DEFAULT_WIDTH = 414;
  const DEFAULT_HEIGHT = 896;

  const wp = (width: any): number => {
    const percent = (width * 100) / DEFAULT_WIDTH;
    return widthPercentageToDP(percent);
  };
  const hp = (height: any): number => {
    const percent = (height * 100) / DEFAULT_HEIGHT;
    return heightPercentageToDP(percent);
  };

  return {
    wp,
    hp,
    ...Dimensions.get('window'),
  };
};
