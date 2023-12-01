import React from 'react';
import { Pressable, StyleProp, ViewStyle } from 'react-native';
import SVGIcon from '../../assets/svg';
import { useCheckboxStyle } from './CheckboxStyle';

interface Props {
  active?: boolean;
  onPress: () => void;
  size?: number;
  style?: StyleProp<ViewStyle>;
}
export const Checkbox = ({
  active = false,
  size = 24,
  onPress = () => {},
  style = {},
}: Props) => {
  const styles = useCheckboxStyle({
    size,
  });
  return (
    <Pressable onPress={onPress} style={[styles.btnContainer, style]}>
      {!active ? (
        <SVGIcon.checkIcon height={size} width={size} />
      ) : (
        <SVGIcon.checkboxCheckedIcon height={size} width={size} />
      )}
    </Pressable>
  );
};
export default Checkbox;
