import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { COLORS } from '../../theme';
import { useResponsiveScreen } from '../../hooks/useResponsiveScreen';

export const useStyle = () => {
  const { wp, hp } = useResponsiveScreen();
  const styles = useMemo(() => {
    return StyleSheet.create({
      mainContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
      },
      container: {
        flex: 1,
        backgroundColor: COLORS.white,
      },
      itemSeparator: {
        height: 0.5,
        backgroundColor: COLORS.lightGray,
        marginVertical: 8,
      },
      listContainer: {
        flex: 1,
      },
      contentContainerStyle: {
        paddingHorizontal: 0,
      },
      searchBarContainer: {
        paddingHorizontal: 16,
        marginVertical: 20,
      },
      buttonContainer: {
        alignSelf: 'center',
        width: wp(160),
        marginTop: hp(16),
        marginBottom: hp(16),
      },
      loaderContainer: { flex: 1, justifyContent: 'center' },
      rightIcon: { paddingHorizontal: 14, justifyContent: 'center' },
    });
  }, [hp, wp]);

  return styles;
};
