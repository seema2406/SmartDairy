import React, { ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableStateCallbackType,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import AppText from '../text/AppText';
import { useAppButtonStyle } from './AppButtonStyle';
import { FONTS } from '../../theme';

interface props extends TouchableOpacityProps {
  type?: 'text' | 'outlined' | 'contained';
  title: string;
  style?: Object;
  labelStyle?: Object;
  backgroundColor?: string;
  optionalTitle?: string | number;
  optionalLabelStyle?: Object;
  onPress?: () => void;
  labelColor?: string;
  loading?: boolean;
  children?: ReactNode;
  fontweight?: keyof typeof FONTS;
  leftIcon?: ReactNode | ((state: PressableStateCallbackType) => ReactNode);
  radius?: number;
}

const AppButton = ({
  title,
  style = {},
  labelStyle = {},
  backgroundColor,
  onPress,
  disabled,
  labelColor,
  type,
  loading,
  children,
  fontweight = 'bold',
  leftIcon,
  radius,
}: props) => {
  const styles = useAppButtonStyle({
    style,
    labelStyle,
    disabled,
    backgroundColor,
    labelColor,
    type,
    leftIcon,
    radius,
  });

  const renderButtonContent = () => {
    return (
      <>
        {loading ? <ActivityIndicator style={styles.loader} /> : null}
        {leftIcon ? <Pressable disabled>{leftIcon}</Pressable> : null}
        {title ? (
          <AppText
            size={16}
            numberOfLines={1}
            ellipsizeMode="tail"
            fontWeight={fontweight}
            style={[styles.label, labelStyle]}>
            {title}
          </AppText>
        ) : null}
      </>
    );
  };
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.button}
      onPress={onPress}
      disabled={disabled}>
      {children || renderButtonContent()}
    </TouchableOpacity>
  );
};

export default AppButton;
