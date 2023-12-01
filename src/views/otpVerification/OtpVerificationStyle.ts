import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { useResponsiveScreen } from '../../hooks/useResponsiveScreen';
import { COLORS } from '../../theme';

export const useOtpVerificationStyle = () => {
  const { wp, hp } = useResponsiveScreen();

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flex: 1,
      },
      subTitile: {
        color: COLORS.textDarkDray,
        textAlign: 'center',
      },
      codeFieldRoot: { marginTop: 20 },
      cellContainer: {
        backgroundColor: COLORS.grayShade,
        borderRadius: 8,
        justifyContent: 'center',
        alignSelf: 'center',
      },
      cell: {
        width: wp(56),
        height: hp(56),
        paddingTop: hp(12),
        fontSize: 24,
        textAlign: 'center',
        alignItems: 'center',
      },
      focusCell: {
        borderBottomColor: COLORS.borderBlack,
        borderBottomWidth: 2,
        marginHorizontal: 8,
        marginTop: -2,
      },
      timer: {
        marginTop: hp(20),
        textAlign: 'center',
        color: COLORS.textDarkGray,
      },
      flexView: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: hp(20),
      },
      text: {
        color: COLORS.textDarkBlue,
      },
      resendCode: {
        color: COLORS.textLightBlue,
      },
      changeMobileView: {
        marginTop: hp(60),
      },
      changeMobile: {
        color: COLORS.textLightBlue,
        textAlign: 'center',
      },
    });
  }, [hp, wp]);

  return styles;
};
