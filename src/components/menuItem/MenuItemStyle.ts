import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { COLORS } from '../../theme';
import { useResponsiveScreen } from '../../hooks/useResponsiveScreen';

export const useStyle = ({ showBG }: any) => {
  const { hp } = useResponsiveScreen();
  const styles = useMemo(() => {
    return StyleSheet.create({
      menuItem: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        paddingVertical: hp(10),
        alignItems: 'center',
        marginVertical: 6,
        ...(showBG && {
          backgroundColor: COLORS.grayShade,
        }),
      },
      borderStyle: {
        borderRadius: 10,
        borderColor: COLORS.lightGray,
        borderWidth: 1,
      },
      menuIcon: {
        paddingRight: 20,
      },
      menuItemInner: {
        flexDirection: 'row',
        alignItems: 'center',
      },
    });
  }, [hp, showBG]);

  return { styles, colors: COLORS };
};
