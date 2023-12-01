import React from 'react';
import { StyleProp } from 'react-native';
import FastImage, {
  ImageStyle,
  ResizeMode,
  Source,
} from 'react-native-fast-image';

interface Props {
  style?: StyleProp<ImageStyle>;
  source: Source;
  resizeMode?: ResizeMode;
}
export const AppImage = ({
  style = {},
  source = {},
  resizeMode = FastImage.resizeMode.cover,
}: Props) => {
  return <FastImage style={style} source={source} resizeMode={resizeMode} />;
};
export default AppImage;
