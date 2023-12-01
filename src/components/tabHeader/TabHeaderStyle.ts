import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { COLORS } from '../../theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const useStyle = ({}: any) => {
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        width: '100%',
        // height: insets.top,
        height: 56,
        flexDirection: 'row',
        backgroundColor: COLORS.white,
      },
      innerContainer: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginTop: insets.top,
        backgroundColor: COLORS.white,
      },
      iconContainer: {
        height: 54,
        width: 54,
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 4,
      },
      dairyButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      locationIcon: {
        paddingHorizontal: 10,
      },
      arrowIcon: {
        paddingHorizontal: 10,
      },
      headerTitleContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
      },
    });
  }, [insets]);

  return { styles, colors: COLORS };
};
