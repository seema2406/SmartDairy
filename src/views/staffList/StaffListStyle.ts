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
        height: 8,
      },
      listContainer: {
        flex: 1,
      },
      contentContainerStyle: {
        paddingHorizontal: 20,
      },
      searchBarContainer: {
        padding: 20,
      },
      buttonContainer: {
        alignSelf: 'center',
        width: wp(160),
        paddingVertical: hp(16),
      },
      rightIcon: { paddingHorizontal: 14, justifyContent: 'center' },
    });
  }, [hp, wp]);

  return { styles, colors: COLORS };
};
