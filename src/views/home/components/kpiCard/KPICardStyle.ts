import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { COLORS } from '../../../../theme';

export const useStyle = () => {
  const styles = useMemo(() => {
    return StyleSheet.create({
      kpiContainer: {
        paddingHorizontal: 16,
        borderRadius: 10,
        borderColor: COLORS.lightGray,
        borderWidth: 1,
        marginBottom: 12,
      },
      kpiRowItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 16,
      },
      kpiItem: {
        flex: 1,
      },
    });
  }, []);

  return { styles, colors: COLORS };
};
