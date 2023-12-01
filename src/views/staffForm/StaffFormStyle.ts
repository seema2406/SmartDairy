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
        color: COLORS.black,
        alignSelf: 'flex-start',
        paddingVertical: 4,
      },
      permissionContainer: {
        marginVertical: 10,
      },
      permissionView: {
        flexDirection: 'row',
        borderBottomWidth: 0.4,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingBottom: 8,
      },
      permissionText: { paddingEnd: 0 },
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
      addButton: {
        flexDirection: 'row',
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        paddingHorizontal: 20,
        alignItems: 'center',
        height: 40,
        alignSelf: 'center',
        marginBottom: 10,
      },
      addButtonLabel: {
        marginLeft: 20,
      },
      error: {
        color: COLORS.toastError,
        textAlign: 'left',
        alignSelf: 'flex-start',
      },
      textStyle: {
        paddingEnd: 12,
      },
    });
  }, [hp, wp]);

  return { styles, colors: COLORS };
};
