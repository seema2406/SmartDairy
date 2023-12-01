import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { COLORS, FONTS } from '../../theme';

export const useChooseLanguageStyle = () => {
  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flex: 1,
      },
      dropdownStyle: {
        borderColor: COLORS.primary,
        borderBottomColor: COLORS.primary,
        borderWidth: 1,
      },
      labelStyle: {
        color: COLORS.black,
        marginLeft: 4,
        fontFamily: FONTS.bold,
        fontSize: 16,
      },
    });
  }, []);

  return styles;
};
