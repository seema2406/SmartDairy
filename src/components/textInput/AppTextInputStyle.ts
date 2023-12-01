import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { COLORS } from '../../theme';

export const useAppTextInputStyle = () => {
  const styles = useMemo(() => {
    return StyleSheet.create({
      mainContainer: {
        marginVertical: 4,
      },
      container: {
        width: '100%',
        backgroundColor: COLORS.white,
        opacity: 1,
        justifyContent: 'center',
        borderBottomColor: COLORS.lightGray,
        borderBottomWidth: 1,
        height: 42,
        paddingHorizontal: 16,
        flexDirection: 'row',
      },
      inputContainer: {
        alignItems: 'center',
      },
      error: {
        color: COLORS.toastError,
        textAlign: 'left',
        alignSelf: 'flex-start',
      },
      label: {
        color: COLORS.black,
        alignSelf: 'flex-start',
        paddingVertical: 4,
      },
      subLabel: {
        color: COLORS.black,
      },
      required: {
        color: COLORS.toastError,
      },
      errorWrapper: {
        borderColor: COLORS.textRed,
      },
      textInputStyles: {
        color: COLORS.black,
        fontSize: 14,
        flex: 1
      },
      inputLabelContainer: {
        width: '100%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      compulsory: {
        color: COLORS.textRed,
      },
      floatingLabel: {
        position: 'absolute',
        backgroundColor: COLORS.white,
        top: -10,
        left: 12,
        paddingHorizontal: 5,
      },
      labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      prefixTextStyles: {
        color: COLORS.black,
        fontSize: 14,
        paddingTop: 1,
        paddingEnd: 4,
        alignSelf: 'center',
      },
      prefixContainer: { flexDirection: 'row', justifyContent: 'flex-start'},
      prefixInputStyle: { flex: 1 },
    });
  }, []);

  return styles;
};
