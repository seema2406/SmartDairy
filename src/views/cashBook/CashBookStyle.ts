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
      innerContainer: { paddingVertical: 16, flex: 1 },
      rightIcon: { paddingHorizontal: 14, justifyContent: 'center' },
      dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginBottom: 8,
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
        paddingHorizontal: 20,
      },
      filterBtn: {
        borderRadius: 4,
        paddingHorizontal: wp(10),
        borderWidth: 1,
        borderColor: COLORS.primary,
        paddingVertical: hp(2),
        marginHorizontal: 4,
        marginVertical: 8,
      },
      activeFilter: {
        backgroundColor: COLORS.primary,
      },
      activeLabel: {
        color: COLORS.white,
      },
      shiftContainer: {
        paddingHorizontal: 20,

        flexDirection: 'row',
        justifyContent: 'flex-end',
      },
    });
  }, [hp, wp]);

  return styles;
};
