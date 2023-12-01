import { StyleSheet } from 'react-native';
import { COLORS, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../theme';
import { useResponsiveScreen } from '../../../hooks/useResponsiveScreen';
import { useMemo } from 'react';

export const useStyle = ({}: any) => {
  const { hp } = useResponsiveScreen();
  const styles = useMemo(() => {
    return StyleSheet.create({
      modalStyle: {
        width: SCREEN_WIDTH,
        justifyContent: 'flex-end',
        overflow: 'hidden',
        backgroundColor: 'transparent',
        flex: 1,
      },
      modalContainer: {
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden',
        height: hp(310),
      },
      headerContainer: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 24,
        paddingTop: 12,
      },
      contentContainer: {
        marginHorizontal: 24,
        marginVertical: 16,
        borderColor: COLORS.grayBG,
        borderWidth: 1,
        borderRadius: 6,
        padding: 12,
        height: '30%',
      },
      cancelButton: {
        width: '100%',
        alignSelf: 'center',
        backgroundColor: COLORS.white,
      },
      cancelButtonText: { fontSize: 14, lineHeight: 17 },
      cancelIcon: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
        backgroundColor: COLORS.grayShade,
        marginRight: 24,
      },
      button: {
        width: '40%',
      },
      buttonContainer: {
        paddingHorizontal: 24,
        marginTop: 30,
        marginBottom: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      buttonLabel: {
        fontSize: 14,
        lineHeight: 17,
      },
    });
  }, [hp]);

  return { styles, colors: COLORS };
};
