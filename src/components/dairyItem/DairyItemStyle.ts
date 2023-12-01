import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { COLORS } from '../../theme';
import { useResponsiveScreen } from '../../hooks/useResponsiveScreen';

export const useStyle = ({}: any) => {
  const { wp, hp } = useResponsiveScreen();
  const styles = useMemo(() => {
    return StyleSheet.create({
      menuItem: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        paddingVertical: hp(12),
        alignItems: 'center',
      },
      menuIcon: {
        paddingRight: 20,
      },
      menuItemInner: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      checkboxContainer: { paddingLeft: wp(16) },
    });
  }, [hp, wp]);

  return { styles, colors: COLORS };
};
