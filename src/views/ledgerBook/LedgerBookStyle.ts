import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { COLORS, SCREEN_WIDTH } from '../../theme';
import { useResponsiveScreen } from '../../hooks/useResponsiveScreen';

export const useStyle = () => {
  const { wp, hp } = useResponsiveScreen();
  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: COLORS.white,
      },
      headerFilter: { flexDirection: 'row' },
      innerContainer: { paddingVertical: 16 },
      rightIcon: { paddingHorizontal: 14, justifyContent: 'center' },
      dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginVertical: 8,
      },
      textContainer: {
        borderBottomColor: COLORS.lightGray,
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: hp(42),
        alignItems: 'center',
        marginLeft: hp(8),
        paddingHorizontal: wp(6),
      },
      listContainer: {
        flex: 1,
      },
      itemSeparator: {
        height: 8,
      },
      contentContainerStyle: {
        paddingHorizontal: 8,
        paddingBottom: 100,
      },
      searchBar: {
        flexGrow: 1,
        paddingHorizontal: 8,
        zIndex: 2,
        paddingBottom: 8,
      },
      topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
    });
  }, [hp, wp]);

  return { styles, colors: COLORS };
};
