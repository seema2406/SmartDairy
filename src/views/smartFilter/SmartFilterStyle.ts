import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { COLORS } from '../../theme';
import { useResponsiveScreen } from '../../hooks/useResponsiveScreen';

export const useStyle = () => {
  const { wp } = useResponsiveScreen();
  const styles = useMemo(() => {
    return StyleSheet.create({
      mainContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
      },
      container: {
        flex: 1,
        backgroundColor: COLORS.white,
      },
      itemSeparator: {
        height: 8,
      },
      listContainer: {
        flex: 1,
      },
      contentContainerStyle: {
        paddingHorizontal: 10,
      },
      buttonContainer: {
        alignSelf: 'center',
        width: wp(160),
        paddingVertical: 10,
      },
      rightIcon: { paddingHorizontal: 14, justifyContent: 'center' },
      searchBarContainer: {
        flexDirection: 'row',
        zIndex: 1,
        marginVertical: 12,
      },
      searchBar: {
        flexGrow: 1,
        paddingHorizontal: 8,
        zIndex: 2,
      },
      addButton: {
        flexDirection: 'row',
        backgroundColor: COLORS.primary,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        paddingHorizontal: 20,
        alignItems: 'center',
        paddingVertical: 8,
        height: 42,
        alignSelf: 'center',
      },
      addButtonLabel: {
        marginRight: 8,
      },
      shiftContainer: {
        paddingHorizontal: 10,

        flexDirection: 'row',
        justifyContent: 'flex-end',
      },
      filterBtn: {
        borderRadius: 4,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: COLORS.primary,
        paddingVertical: 2,
        marginHorizontal: 4,
        marginVertical: 8,
      },
      activeFilter: {
        backgroundColor: COLORS.primary,
      },
      activeLabel: {
        color: COLORS.white,
      },
    });
  }, [wp]);

  return { styles, colors: COLORS };
};
