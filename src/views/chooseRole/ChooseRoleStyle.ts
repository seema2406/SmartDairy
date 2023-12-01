import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { useResponsiveScreen } from '../../hooks/useResponsiveScreen';

export const useChooseRoleStyle = () => {
  const { hp } = useResponsiveScreen();

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flex: 1,
      },
      wrapperStyle: { justifyContent: 'center', height: '92%' },
      marginTop: {
        marginTop: hp(28),
      },
    });
  }, [hp]);

  return styles;
};
