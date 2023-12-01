import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { COLORS } from '../../theme';
import { useResponsiveScreen } from '../../hooks/useResponsiveScreen';

export const useStyle = () => {
  const { wp, hp } = useResponsiveScreen();
  const styles = useMemo(() => {
    return StyleSheet.create({
      headerFilter: { flexDirection: 'row' },
      container: {
        flex: 1,
        backgroundColor: COLORS.white,
      },
      innerContainer: { paddingVertical: hp(16), flex: 1 },
      rightIcon: { paddingHorizontal: wp(14), justifyContent: 'center' },
      filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: wp(10),
        marginBottom: hp(8),
      },
      rightFilter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      dateContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: wp(10),
        marginBottom: hp(8),
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
      filterBtn: {
        borderRadius: 4,
        paddingHorizontal: wp(10),
        borderWidth: 1,
        borderColor: COLORS.primary,
        paddingVertical: hp(2),
      },
      marginEnd14: { marginEnd: wp(14) },
      activeFilter: {
        backgroundColor: COLORS.primary,
      },
      activeLabel: {
        color: COLORS.white,
      },
      listContainer: {
        flex: 1,
      },
      itemSeparator: {
        height: hp(8),
      },
      contentContainerStyle: {
        paddingHorizontal: wp(20),
      },
    });
  }, [hp, wp]);

  return styles;
};
