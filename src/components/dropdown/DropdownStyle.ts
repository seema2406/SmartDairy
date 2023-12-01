import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SCREEN_WIDTH } from '../../theme';

export const useDropdownStyle = () =>
  StyleSheet.create({
    mainWrap: {},
    mainContainer: {
      marginVertical: 4,
    },
    dropdown: {
      backgroundColor: COLORS.white,
      borderRadius: 4,
      height: 42,
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 16,
      justifyContent: 'space-between',
      borderBottomColor: COLORS.lightGray,
      borderBottomWidth: 1,
    },
    modalStyle: {
      width: SCREEN_WIDTH,
      height: '100%',
      justifyContent: 'flex-end',
      overflow: 'hidden',
    },
    modalContainer: {
      backgroundColor: COLORS.white,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      maxHeight: '90%',
      overflow: 'hidden',
    },
    headerText: {
      textAlign: 'center',
      paddingVertical: 16,
      fontSize: 16,
      color: COLORS.primary,
    },
    rowView: {
      width: '100%',
      paddingVertical: 10,
      alignSelf: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.white,
    },
    item: {
      paddingHorizontal: 20,
      alignItems: 'center',
      flex: 1,
      textAlign: 'center',
      paddingVertical: 4,
    },
    textItem: {
      fontSize: 14,
      lineHeight: 17,
      textAlign: 'center',
      color: COLORS.primary,
    },
    placeholderStyle: {
      color: COLORS.textGray,
      fontFamily: FONTS.medium,
    },
    textItemLeft: {
      textAlign: 'left',
    },
    cancelButton: {
      width: '100%',
      alignSelf: 'center',
      backgroundColor: COLORS.white,
    },
    cancelButtonText: {
      fontSize: 14,
      lineHeight: 17,
      textTransform: 'uppercase',
    },
    cancelIcon: {
      position: 'absolute',
      width: 28,
      height: 28,
      top: 14,
      right: 16,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLORS.grayBG,
      borderRadius: 28 / 2,
    },
    itemSeparator: {
      height: 1,
      opacity: 0.3,
      backgroundColor: COLORS.lightGray,
      marginHorizontal: 10,
    },
    hrLine: {
      height: 3,
      opacity: 0.3,
      backgroundColor: COLORS.lightGray,
    },
    label: {
      color: COLORS.black,
      alignSelf: 'flex-start',
      paddingVertical: 4,
    },
    required: {
      color: COLORS.toastError,
    },
    error: {
      color: COLORS.toastError,
      textAlign: 'left',
      alignSelf: 'flex-start',
    },
  });
