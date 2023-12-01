import React, { useMemo } from 'react';
import { StyleProp, Text, TextProps } from 'react-native';
import { useAppTextStyle } from './AppTextStyle';
import { FONTS } from '../../theme';

interface props extends TextProps {
  fontWeight?: keyof typeof FONTS;
  size?: number;
  color?: string;
  textAlign?: string;
  textTransform?: string;
}

const AppText = ({
  children,
  style,
  fontWeight = 'regular',
  size,
  color,
  textAlign,
  textTransform = 'none',
  ...props
}: props) => {
  const fontFamily = useMemo(() => {
    return FONTS[fontWeight];
  }, [fontWeight]);

  const styles = useAppTextStyle({
    style: {
      fontFamily,
    },
    size,
    color,
    textAlign,
    textTransform,
  });
  return (
    <Text style={[styles.container, style]} {...props}>
      {children}
    </Text>
  );
};

export default AppText;
