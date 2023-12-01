import React from 'react';
import { useSplashStyle } from './SplashStyle';
import { ActivityIndicator, Image, View } from 'react-native';
import IMAGE from '../../assets/images';
import { COLORS } from '../../theme';

const Splash = () => {
  const styles = useSplashStyle();

  return (
    <View style={styles.container}>
      <Image source={IMAGE.logo} style={styles.img} resizeMode="contain" />
      <ActivityIndicator size={'large'} color={COLORS.primary} />
    </View>
  );
};

export default Splash;
