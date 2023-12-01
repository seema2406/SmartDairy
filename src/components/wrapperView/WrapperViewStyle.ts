import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { useResponsiveScreen } from '../../hooks/useResponsiveScreen';
import { COLORS } from '../../theme';

export const useWrapperViewStyle = () => {
  const { hp, wp } = useResponsiveScreen();

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: COLORS.white,
      },
      header: {
        height: 54,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
      },
      backIcon: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 54,
        height: 54,
        justifyContent: 'center',
        alignItems: 'center',
      },
      innerContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: hp(100),
      },
      headerLabel: {
        color: COLORS.white,
      },
      subTitle: {
        color: COLORS.primary,
      },
      inputContainer: {
        width: '100%',
      },
      buttonContainer: {
        alignSelf: 'center',
        width: wp(160),
        marginBottom: hp(60),
      },
    });
  }, [hp, wp]);

  return styles;
};
