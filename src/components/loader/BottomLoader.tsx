import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

const BottomLoader: React.FC = () => {
  const styles = stylesheet();

  return (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  );
};

export default BottomLoader;

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
  });
