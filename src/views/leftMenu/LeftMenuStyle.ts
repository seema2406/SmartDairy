import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { COLORS } from '../../theme';
import { useResponsiveScreen } from '../../hooks/useResponsiveScreen';

export const useStyle = () => {
  const { wp, hp } = useResponsiveScreen();
  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flex: 1,
      },
      headerView: {
        height: 54,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: 20,
      },
      closeButton: {
        backgroundColor: '#C2C2C2',
        height: hp(26),
        width: hp(26),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
      },
      dairyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: hp(16),
      },
      actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: wp(40),
        marginVertical: hp(16),
      },
      actionIconButton: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      searchBarContainer: {
        paddingHorizontal: 16,
      },
      itemSeparator: {
        height: 0.5,
        backgroundColor: COLORS.lightGray,
      },
      listContainer: {
        flex: 1,
      },
      stickyHeaderContainer: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 6,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.textGray,
      },
      buttonContainer: {
        alignSelf: 'center',
        width: wp(160),
        marginBottom: hp(16),
      },
    });
  }, [hp, wp]);

  return { styles, colors: COLORS };
};
