import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { COLORS } from '../../theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const useStackHeaderStyle = ({}: any) => {
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        // marginTop: inset.top,
        height: 56,
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.16,
        shadowRadius: 1.51,
        elevation: 2,
      },
      innerContainer: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      iconContainer: {
        height: 56,
        width: 56,
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 4,
      },
      searchIcon: {
        height: 25,
        width: 25,
        backgroundColor: '#D1D1D1',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
      },
      headerTitleContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
      },
      padding24: { paddingLeft: 24 },
    });
  }, []);

  return { styles, colors: COLORS };
};
