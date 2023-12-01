import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../theme';
import { useResponsiveScreen } from '../../hooks/useResponsiveScreen';

export const useStyle = () => {
  const insets = useSafeAreaInsets();
  const { hp } = useResponsiveScreen();
  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flex: 1,
        // marginTop: insets.top,
        // marginBottom: insets.bottom + 16,
        justifyContent: 'space-between',
      },
      headerView: {
        height: 54,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: 20,
      },
      closeButton: {
        backgroundColor: '#C2C2C2',
        height: hp(26),
        width: hp(26),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
      },
      userProfileContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: hp(36),
      },
      deleteButton: {
        paddingVertical: hp(10),
        backgroundColor: COLORS.grayShade,
        marginBottom: hp(36),
      },
      deleteText: {
        textAlign: 'center',
      },
    });
  }, [hp]);

  return { styles, colors: COLORS };
};
