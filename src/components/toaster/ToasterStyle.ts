import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme';

export const createStyles = (backgroundColor: string) =>
  StyleSheet.create({
    toast: {
      position: 'absolute',
      right: 0,
      width: '80%',
      bottom: 0,
    },
    content: {
      alignItems: 'center',
      flexDirection: 'row',
      width: '100%',
      padding: 16,
      backgroundColor: backgroundColor,
    },
    toastMessageContainer: {
      justifyContent: 'flex-start',
      paddingLeft: 18,
      flex: 1,
    },
    titleText: {
      color: COLORS.white,
      fontSize: 18,
    },
    messageText: {
      color: COLORS.white,
      fontSize: 16,
      flex: 1,
    },
  });
