import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { COLORS, SCREEN_WIDTH } from '../../theme';
import { useResponsiveScreen } from '../../hooks/useResponsiveScreen';

export const useStyle = ({}: any) => {
  const { wp, hp } = useResponsiveScreen();
  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: COLORS.white,
      },
      kpiContainer: {
        flexDirection: 'row',
        margin: 14,
        padding: 12,
        borderWidth: 1,
        borderColor: COLORS.grayBG,
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      kpiInnerLeftContainer: {},
      kpiInnerRightContainer: {
        alignItems: 'center',
      },
      actionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: wp(80),
      },
      actionIconButton: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      actionIconLabel: {
        marginTop: 8,
      },
      hrLine: {
        height: 1.5,
        backgroundColor: COLORS.grayBG,
        width: '100%',
        marginVertical: 8,
      },
      formContainer: {
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
      },
      formInnerRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
      },
      inputStyle: {
        width: SCREEN_WIDTH / 2 - 68,
      },
      disabledInput: {
        borderBottomWidth: 0,
      },
      remarkInputStyle: {
        width: SCREEN_WIDTH - 68,
      },
      button: {
        alignSelf: 'center',
        width: SCREEN_WIDTH - 20,
        marginTop: 16,
      },
      searchBarContainer: {
        flexDirection: 'row',
        marginTop: 12,
        zIndex: 1,
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
      datePickerContainer: {
        paddingHorizontal: 16,
      },
    });
  }, [wp]);

  return { styles, colors: COLORS };
};
