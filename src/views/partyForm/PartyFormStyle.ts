import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { COLORS, FONTS, SCREEN_WIDTH } from '../../theme';
import { useResponsiveScreen } from '../../hooks/useResponsiveScreen';

export const useStyle = () => {
  const { wp, hp } = useResponsiveScreen();
  const styles = useMemo(() => {
    return StyleSheet.create({
      mainContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
      },
      container: {
        flex: 1,
        backgroundColor: COLORS.white,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
      },
      formContainer: {
        paddingVertical: 16,
      },
      typeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
      },
      label: {
        paddingBottom: 8,
      },
      typeButton: {
        borderRadius: 4,
        paddingVertical: 8,
        borderColor: COLORS.lightGray,
        borderWidth: 1,
        alignItems: 'center',
        width: SCREEN_WIDTH / 3 - 24,
        backgroundColor: COLORS.white,
      },
      activeTypeButton: {
        borderRadius: 4,
        paddingVertical: 8,
        borderWidth: 0,
        backgroundColor: COLORS.primary,
      },
      labelStyle: {
        color: COLORS.primary,
        paddingHorizontal: 8,
        fontFamily: FONTS.medium,
        fontSize: 16,
      },
      inputStyle: {
        color: COLORS.primary,
        paddingHorizontal: 10,
        fontFamily: FONTS.medium,
      },
      button: {
        alignSelf: 'center',
        width: wp(160),
        marginBottom: hp(16),
      },
      priceButton: {
        alignSelf: 'center',
        marginTop: 24,
      },
      deleteIcon: {
        height: 56,
        width: 56,
        justifyContent: 'center',
        alignItems: 'center',
      },
    });
  }, [hp, wp]);

  return { styles, colors: COLORS };
};
