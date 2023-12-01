import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
interface props {
  size: number;
}

export const useCheckboxStyle = ({ size }: props) => {
  const styles = useMemo(() => {
    return StyleSheet.create({
      btnContainer: {
        height: size,
        width: size,
        alignItems: 'center',
        justifyContent: 'center',
      },
    });
  }, [size]);

  return styles;
};
