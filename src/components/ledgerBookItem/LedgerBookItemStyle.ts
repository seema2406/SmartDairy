import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { COLORS } from '../../theme';
import { useResponsiveScreen } from '../../hooks/useResponsiveScreen';

export const useStyle = ({}: any) => {
  const { wp, hp } = useResponsiveScreen();
  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flexDirection: 'row',
        paddingVertical: hp(12),
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
      },
      innerContainer: {
        flex: 1,
        marginHorizontal: wp(12),
      },
      labelStyle: {
        paddingVertical: 8,
      },
      bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      },
      topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
    });
  }, [hp, wp]);

  return { styles, colors: COLORS };
};
