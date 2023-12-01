import { COLORS, SCREEN_WIDTH } from '../../theme';
import { StyleSheet } from 'react-native';
import { useMemo } from 'react';

interface props {
  searchBarHeight?: number;
  containerStyle?: any;
}

export const useStyle = ({
  searchBarHeight = 56,
  containerStyle = {},
}: props) => {
  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flexDirection: 'row',
        borderRadius: 4,
        ...containerStyle,
        zIndex: 8,
      },
      searchBarContainer: {
        flexGrow: 1,
        borderWidth: 0.7,
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

      itemSeparator: {
        height: 0.5,
        backgroundColor: COLORS.lightGray,
      },
      listContainer: {
        flex: 1,
      },

      searchList: {
        position: 'absolute',
        width: SCREEN_WIDTH - 16,
        top: 50,
        left: 8,
        zIndex: 9,
        borderRadius: 4,
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 4,
        maxHeight: 48 * 5,
      },
      listItem: {
        paddingHorizontal: 18,
        backgroundColor: COLORS.white,
        width: '100%',
        height: 48,
        alignItems: 'flex-start',
        justifyContent: 'center',
      },
    });
  }, [containerStyle]);

  return { styles, colors: COLORS };
};
