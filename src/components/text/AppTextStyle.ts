import { StyleSheet, TextStyle } from 'react-native';
import { useMemo } from 'react';
import { COLORS } from '../../theme';
interface props {
  style: TextStyle;
  size?: number;
  color?: string;
  textAlign?: string;
  textTransform?: string;
}

export const useAppTextStyle = ({
  style,
  size,
  color,
  textAlign,
  textTransform,
}: props) => {
  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        color: color ? color : COLORS.primary,
        fontSize: size ? size : 14,
        textAlign: textAlign,
        marginVertical: 2,
        ...style,
        textTransform: textTransform,
      },
    });
  }, [color, size, textAlign, style, textTransform]);

  return styles;
};
