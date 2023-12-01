import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { COLORS } from '../../theme';

export const useSplashStyle = () => {
  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.splashBG,
      },
      img: {
        width: '40%',
        height: '40%',
      },
    });
  }, []);

  return styles;
};
