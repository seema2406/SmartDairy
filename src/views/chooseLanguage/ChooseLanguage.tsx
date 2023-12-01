import React, { useCallback, useState } from 'react';
import { useChooseLanguageStyle } from './ChooseLanguageStyle';
import WrapperView from '../../components/wrapperView/WrapperView';
import Dropdown from '../../components/dropdown/Dropdown';
import { LANGUAGE } from '../../constants/constants';
import { ROUTES } from '../../constants/routeConstant';
import { useTranslation } from 'react-i18next';
import { MMKV_KEYS } from '../../constants/mmkvConstant';
import MMKVStorage from '../../store/mmkv';
import { SafeAreaView } from 'react-native';
import { isEmpty } from 'lodash';

interface Props {
  navigation?: any;
}

const ChooseLanguage = ({ navigation }: Props) => {
  const styles = useChooseLanguageStyle();

  const [language, setLanguage] = useState();
  const [errorMsg, setErrorMsg] = useState('');

  const { t, i18n } = useTranslation();
  const onSelectLanguage = useCallback(
    (item: any) => {
      setErrorMsg('');
      setLanguage(item?.value);
      i18n.changeLanguage(item?.value);
      MMKVStorage.setItem(MMKV_KEYS.language, item?.value);
    },
    [i18n],
  );

  const onNextPress = () => {
    if (isEmpty(language)) {
      setErrorMsg(t('Placeholders.SelectLanguage'));
      return;
    }
    navigation.navigate(ROUTES.chooseRole);
  };

  return (
    <SafeAreaView style={styles.container}>
      <WrapperView wKey={1} title={t('SmartDairy')} onButtonPress={onNextPress}>
        <Dropdown
          dropdownStyle={styles.dropdownStyle}
          labelStyle={styles.labelStyle}
          headerTitle={t('Placeholders.SelectLanguage')}
          placeholder={t('Placeholders.SelectLanguage')}
          data={LANGUAGE}
          value={language}
          labelField={'label'}
          valueField={'value'}
          confirmSelectItem={true}
          onConfirmSelectItem={onSelectLanguage}
          error={errorMsg}
        />
      </WrapperView>
    </SafeAreaView>
  );
};

export default ChooseLanguage;
