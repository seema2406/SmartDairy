import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { COLORS, SCREEN_WIDTH } from '../../../theme';
import { useResponsiveScreen } from '../../../hooks/useResponsiveScreen';

export const useStyle = () => {
  const { wp } = useResponsiveScreen();
  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        backgroundColor: COLORS.white,
        width: SCREEN_WIDTH,
        paddingVertical: 34,
        paddingHorizontal: 24,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
      },
      body: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 4,
      },
      width40: { width: '40%' },
      inputStyle: { paddingStart: 4, paddingEnd: 16, fontSize: 14 },
      prefixStyle: {
        color: COLORS.green,
        fontSize: 18,
        paddingEnd: 20,
      },
      textRed: { color: COLORS.textRed },
      labelStyle: {
        color: COLORS.primary,
      },
      buttonContainer: {
        alignSelf: 'center',
        width: wp(160),
        marginTop: 46,
      },
    });
  }, [wp]);

  return { styles, colors: COLORS };
};
