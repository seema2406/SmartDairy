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
      innerContainer: { paddingVertical: 16, flex: 1 },
      headerFilter: { flexDirection: 'row' },
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
      shiftContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingBottom: 10,
        paddingTop: 6,
        justifyContent: 'flex-end',
        width: '100%',
      },
      filterBtn: {
        borderRadius: 4,
        paddingHorizontal: wp(20),
        borderWidth: 1,
        borderColor: COLORS.primary,
        paddingVertical: hp(2),
        marginStart: 10,
      },
      marginEnd14: { marginEnd: wp(14) },
      activeFilter: {
        backgroundColor: COLORS.primary,
      },
      activeLabel: {
        color: COLORS.white,
      },
    });
  }, [hp, wp]);

  return styles;
};
