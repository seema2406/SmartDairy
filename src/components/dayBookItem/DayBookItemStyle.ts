import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { COLORS } from '../../theme';
import { useResponsiveScreen } from '../../hooks/useResponsiveScreen';

export const useStyle = ({}: any) => {
  const { wp, hp } = useResponsiveScreen();
  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flexDirection: 'row',
        paddingVertical: hp(12),
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
      },
      innerContainer: {
        flex: 1,
        marginHorizontal: wp(12),
      },
      topContainer: { flexDirection: 'row', justifyContent: 'space-between' },
      padding16: { paddingHorizontal: 16 },
      itemRow: { flexDirection: 'row', paddingVertical: 3 },
      rowHeader: { flexDirection: 'row', paddingTop: 6 },
      rowTitle: { flex: 1, fontSize: 15 },
      rowText: {
        flex: 1,
        fontSize: 15,
        color: COLORS.textGreen,
      },
      flex1: {
        flex: 1,
      },
      flex2: {
        flex: 2,
      },
      flex_1_2: {
        flex: 1.2,
      },
      flex_1_4: {
        flex: 1.4,
      },
      paddingTop15: {
        paddingTop: 15,
      },
    });
  }, [hp, wp]);

  return { styles, colors: COLORS };
};
