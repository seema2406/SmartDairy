import { COLORS } from '../../theme';
import { StyleSheet } from 'react-native';
import { useMemo } from 'react';

interface props {
  searchBarHeight?: number;
  containerStyle?: any;
}

export const useSearchBarStyle = ({
  searchBarHeight = 56,
  containerStyle = {},
}: props) => {
  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 4,
        ...containerStyle,
      },
      searchBarContainer: {
        flexGrow: 1,
        borderWidth: 0.2,
        borderColor: COLORS.lightGray,
        height: 42,
        backgroundColor: COLORS.white,
        borderRadius: 4,
      },
      cancelButton: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 6,
      },
      searchIcon: {
        position: 'absolute',
        right: 14,
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
      },
      closeIconContainer: {
        position: 'absolute',
        right: 0,
        paddingHorizontal: 14,
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
      },
      closeIcon: {
        height: 20,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
      textInput: {
        paddingHorizontal: 16,
        height: '100%',
      },
    });
  }, [containerStyle]);

  return { styles, colors: COLORS };
};
