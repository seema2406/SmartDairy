import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { COLORS } from '../../theme';

type Props = {
  color?: string;
};

const LoadingIndicator: React.FC<Props> = ({}) => {
  const styles = stylesheet();

  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={COLORS.primary} />
    </View>
  );
};

export default LoadingIndicator;

const stylesheet = () =>
  StyleSheet.create({
    container: {
      height: 70,
      width: 70,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: 35,
    },
    imgStyle: {
      width: 28,
      height: 28,
      position: 'absolute',
      alignSelf: 'center',
    },
  });
