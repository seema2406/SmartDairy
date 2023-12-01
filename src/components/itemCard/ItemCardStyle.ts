import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { COLORS } from '../../theme';

export const useStyle = ({}: any) => {
  const styles = useMemo(() => {
    return StyleSheet.create({
      menuItem: {
        flexDirection: 'row',
        paddingVertical: 12,
        alignItems: 'center',
        backgroundColor: COLORS.lightBlue,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
      },
      menuItemInner: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 12,
      },
    });
  }, []);

  return { styles, colors: COLORS };
};
