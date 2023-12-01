import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { useResponsiveScreen } from '../../hooks/useResponsiveScreen';

export const useOtpSendStyle = () => {
  const { hp } = useResponsiveScreen();

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flex: 1,
      },
      phoneNumber: {
        marginTop: hp(60),
      },
    });
  }, [hp]);

  return styles;
};
