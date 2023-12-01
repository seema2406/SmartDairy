import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { COLORS } from '../../theme';
import { useResponsiveScreen } from '../../hooks/useResponsiveScreen';

export const useStyle = ({}: any) => {
  const { wp } = useResponsiveScreen();
  const styles = useMemo(() => {
    return StyleSheet.create({
      menuItem: {
        flexDirection: 'row',
        paddingVertical: 12,
        alignItems: 'center',
        backgroundColor: COLORS.lightBlue,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
      },
      menuIcon: {
        backgroundColor: COLORS.white,
        borderRadius: 100,
        height: 56,
        width: 56,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 12,
      },
      menuItemInner: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
      },
      checkboxContainer: { paddingHorizontal: wp(20) },
    });
  }, [wp]);

  return { styles, colors: COLORS };
};
