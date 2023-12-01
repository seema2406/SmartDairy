import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppText from '../text/AppText';
import { COLORS, SCREEN_HEIGHT } from '../../theme';

type Props = {
  contentName?: string;
};

const EmptyView: React.FC<Props> = ({ contentName = 'data' }) => {
  const styles = stylesheet();

  return (
    <View style={styles.container}>
      <AppText size={24} fontWeight="black" color={COLORS.lightGray}>
        Oops!
      </AppText>
      <AppText
        size={18}
        fontWeight="bold"
        color={COLORS.textGray}
        style={styles.label}>
        No {contentName} found
      </AppText>
    </View>
  );
};

export default EmptyView;

const stylesheet = () =>
  StyleSheet.create({
    container: {
      height: SCREEN_HEIGHT / 2,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    label: {
      marginTop: 8,
    },
  });
