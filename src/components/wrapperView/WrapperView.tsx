import React from 'react';
import { useWrapperViewStyle } from './WrapperViewStyle';
import AppText from '../../components/text/AppText';
import AppButton from '../../components/button/AppButton';
import { Pressable, View } from 'react-native';
import Svg from '../../assets/svg';
import { COLORS } from '../../theme';
import { useTranslation } from 'react-i18next';

const WrapperView = ({
  wKey,
  title = '',
  subTitle,
  buttonLabel,
  onBackPress,
  onButtonPress,
  children,
}: any) => {
  const styles = useWrapperViewStyle();
  const { t } = useTranslation();

  return (
    <View style={styles.container} key={wKey}>
      <View style={styles.header}>
        <AppText size={22} fontWeight="bold" style={styles.headerLabel}>
          {title}
        </AppText>
      </View>
      {onBackPress && (
        <Pressable style={styles.backIcon} onPress={onBackPress}>
          <Svg.backIcon fill={COLORS.white} width={12} height={22} />
        </Pressable>
      )}
      <View style={styles.innerContainer}>
        {subTitle && (
          <AppText size={24} fontWeight="bold" style={styles.subTitle}>
            {subTitle}
          </AppText>
        )}
        <View style={styles.inputContainer}>{children}</View>
      </View>
      {onButtonPress && (
        <View style={styles.buttonContainer}>
          <AppButton
            title={buttonLabel || t('Buttons.Next')}
            onPress={onButtonPress}
          />
        </View>
      )}
    </View>
  );
};

export default WrapperView;
