import React from 'react';
import { useChooseRoleStyle } from './ChooseRoleStyle';
import { SafeAreaView, View } from 'react-native';
import AppButton from '../../components/button/AppButton';
import WrapperView from '../../components/wrapperView/WrapperView';
import { ROUTES } from '../../constants/routeConstant';
import { useTranslation } from 'react-i18next';
interface Props {
  navigation?: any;
}

const ChooseRole = ({ navigation }: Props) => {
  const styles = useChooseRoleStyle();
  const { t } = useTranslation();

  const onSelectPress = (role: number) => {
    navigation.navigate(ROUTES.otpSend, {
      role,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <WrapperView wKey={2} title={t('SmartDairy')}>
        <View style={styles.wrapperStyle}>
          <AppButton
            radius={5}
            type="outlined"
            title={t('Buttons.DairyOwner')}
            onPress={() => onSelectPress(2)}
          />
          <AppButton
            style={styles.marginTop}
            radius={5}
            type="outlined"
            title={t('Buttons.DairyUser')}
            onPress={() => onSelectPress(1)}
          />
        </View>
      </WrapperView>
    </SafeAreaView>
  );
};

export default ChooseRole;
