import {
  PressableProps,
  PressableStateCallbackType,
  StyleSheet,
} from 'react-native';
import { ReactNode, useMemo } from 'react';
import { useResponsiveScreen } from '../../hooks/useResponsiveScreen';
import { COLORS } from '../../theme';

interface props {
  type?: 'text' | 'outlined' | 'contained';
  style: Object;
  labelStyle: Object;
  disabled: PressableProps['disabled'];
  backgroundColor: string | undefined;
  labelColor?: string;
  leftIcon?: ReactNode | ((state: PressableStateCallbackType) => ReactNode);
  radius?: number;
}

export const useAppButtonStyle = ({
  style,
  labelStyle,
  disabled,
  backgroundColor,
  labelColor,
  type,
  leftIcon,
  radius,
}: props) => {
  const { hp } = useResponsiveScreen();
  const styles = useMemo(() => {
    return StyleSheet.create({
      button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        paddingHorizontal: 16,
        opacity: disabled ? 0.5 : 1,
        height: 42,
        borderRadius: radius ? radius : 4,
        borderColor: type === 'outlined' ? COLORS.primary : backgroundColor,
        borderWidth: type === 'outlined' ? 1.5 : 0,
        backgroundColor: backgroundColor
          ? backgroundColor
          : type === 'outlined'
          ? COLORS.white
          : type === 'text'
          ? COLORS.transparent
          : COLORS.primary,
        ...style,
      },
      label: {
        fontSize: hp(16),
        lineHeight: hp(20),
        textAlign: 'center',
        marginLeft: leftIcon ? 16 : 0,
        color: labelColor
          ? labelColor
          : type === 'outlined'
          ? COLORS.primary
          : type === 'text'
          ? COLORS.primary
          : COLORS.white,
        ...labelStyle,
      },
      loader: {
        marginRight: 10,
      },
    });
  }, [
    disabled,
    radius,
    type,
    backgroundColor,
    style,
    hp,
    leftIcon,
    labelColor,
    labelStyle,
  ]);

  return styles;
};
