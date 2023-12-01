import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { COLORS, SCREEN_WIDTH } from '../../theme';
import { useResponsiveScreen } from '../../hooks/useResponsiveScreen';

export const useImportContactsStyle = () => {
  const { wp, hp } = useResponsiveScreen();
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
        paddingHorizontal: 20,
      },
      searchBarContainer: {
        paddingHorizontal: 16,
        marginVertical: 20,
      },
      buttonContainer: {
        alignSelf: 'center',
        width: wp(160),
        marginTop: hp(16),
        marginBottom: hp(16),
      },
      loaderContainer: { flex: 1, justifyContent: 'center' },
      rightIcon: { paddingHorizontal: 14, justifyContent: 'center' },
      typeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
        paddingHorizontal: 16,
      },
      typeButton: {
        borderRadius: 4,
        paddingVertical: 8,
        borderColor: COLORS.lightGray,
        borderWidth: 1,
        alignItems: 'center',
        width: SCREEN_WIDTH / 3 - 24,
        backgroundColor: COLORS.white,
      },
      activeTypeButton: {
        borderRadius: 4,
        paddingVertical: 8,
        borderWidth: 0,
        backgroundColor: COLORS.primary,
      },
    });
  }, [hp, wp]);

  return { styles, colors: COLORS };
};
