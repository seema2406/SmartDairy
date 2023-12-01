import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { useResponsiveScreen } from '../../hooks/useResponsiveScreen';
import { COLORS, FONTS } from '../../theme';

export const useCreateDairyStyle = () => {
  const { hp } = useResponsiveScreen();

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flex: 1,
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
      dropdownStyle: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: COLORS.grayBG,
        paddingLeft: 10,
        height: 32,
      },
      placeholderStyle: {
        color: COLORS.textGray,
        fontFamily: FONTS.medium,
      },
      selectedTextStyle: {
        color: COLORS.primary,
        fontFamily: FONTS.medium,
      },
    });
  }, []);

  return styles;
};
