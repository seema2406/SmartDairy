import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { COLORS } from '../../theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useResponsiveScreen } from '../../hooks/useResponsiveScreen';

export const useStyle = () => {
  useSafeAreaInsets();
  const { wp } = useResponsiveScreen();
  const insets = useSafeAreaInsets();
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
      scrollviewStyle: {
        paddingHorizontal: 20,
        paddingVertical: 24,
      },
      bodyContainer: {
        flex: 1,
      },
      searchBarContainer: {
        marginVertical: 8,
      },
      buttonContainer: {
        alignSelf: 'center',
        width: wp(160),
        paddingVertical: 10,
      },
      listContainer: {
        paddingTop: 10,
        paddingBottom: 48,
        flex: 1,
      },
      itemSeparator: {
        height: 8,
      },
    });
  }, [wp]);

  return styles;
};
