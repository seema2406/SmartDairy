import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { COLORS, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../theme';
import { useResponsiveScreen } from '../../hooks/useResponsiveScreen';

export const useDatePickerStyle = () => {
  const { hp } = useResponsiveScreen();
  const styles = useMemo(() => {
    return StyleSheet.create({
      mainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: COLORS.opecityBG,
      },
      datePickerContainer: { backgroundColor: COLORS.white, paddingTop: 12 },
      datePicker: {
        backgroundColor: COLORS.white,
        padding: 16,
      },
      container: {
        height: hp(42),
        alignItems: 'center',
        flexDirection: 'row',
        paddingRight: 4,
        justifyContent: 'space-between',
      },
      textContainer: {
        width: SCREEN_WIDTH / 1.5,
        borderBottomColor: COLORS.lightGray,
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: hp(42),
        alignItems: 'center',
      },
      leftText: {
        fontSize: 14,
        lineHeight: 17,
        textAlign: 'left',
      },
      label: {
        color: COLORS.black,
        marginBottom: 12,
        alignSelf: 'flex-start',
        marginTop: 10,
      },
      required: {
        color: COLORS.toastError,
      },
      error: {
        color: COLORS.toastError,
        textAlign: 'left',
        alignSelf: 'flex-start',
      },
    });
  }, [hp]);

  return { styles, colors: COLORS };
};
