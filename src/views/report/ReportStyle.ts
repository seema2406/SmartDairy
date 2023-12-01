import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { COLORS } from '../../theme';

export const useStyle = () => {
  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: 6,
      },
      titleView: {
        paddingVertical: 12,
        borderBottomColor: COLORS.lightGray,
        borderBottomWidth: 1,
        marginBottom: 6,
        paddingHorizontal: 18,
      },
      title: {
        color: COLORS.primary,
      },
    });
  }, []);

  return styles;
};
