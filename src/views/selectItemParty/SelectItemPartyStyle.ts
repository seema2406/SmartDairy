import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { COLORS } from '../../theme';
import { useResponsiveScreen } from '../../hooks/useResponsiveScreen';

export const useStyle = () => {
  const { wp } = useResponsiveScreen();
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
        paddingVertical: 10,
      },
      rightIcon: { paddingHorizontal: 14, justifyContent: 'center' },
    });
  }, [wp]);

  return { styles, colors: COLORS };
};
