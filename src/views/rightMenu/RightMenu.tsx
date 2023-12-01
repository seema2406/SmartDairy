import React, { useCallback, useState } from 'react';
import { useStyle } from './RightMenuStyle';
import { TouchableOpacity, View } from 'react-native';
import SVG from '../../assets/svg';
import AppText from '../../components/text/AppText';
import MenuItem from '../../components/menuItem/MenuItem';
import { useResponsiveScreen } from '../../hooks/useResponsiveScreen';
import { useTranslation } from 'react-i18next';
import { LANGUAGE } from '../../constants/constants';
import { MMKV_KEYS } from '../../constants/mmkvConstant';
import MMKVStorage from '../../store/mmkv';
import modalfy from '../../helpers/modalfy';
import { MODALS, ROUTES } from '../../constants/routeConstant';

const RightMenu = ({ navigation }: any) => {
  const { styles, colors } = useStyle();
  const { hp, wp } = useResponsiveScreen();
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(
    MMKVStorage.getItem(MMKV_KEYS.language),
  );

  const closeMenu = () => {
    navigation.getParent('RightDrawer').closeDrawer();
  };

  const onSelectLanguage = useCallback(
    (item: any) => {
      setLanguage(item?.value);
      i18n.changeLanguage(item?.value);
      MMKVStorage.setItem(MMKV_KEYS.language, item?.value);
    },
    [i18n],
  );

  const onChangeLanguage = () => {
    modalfy.open(MODALS.dropdown, {
      headerTitle: t('Placeholders.SelectLanguage'),
      data: LANGUAGE,
      currentValue: language,
      valueField: 'value',
      labelField: 'label',
      onClose: () => {
        modalfy.close(MODALS.dropdown);
      },
      onSelect: onSelectLanguage,
    });
  };

  const goToStaffList = () => {
    navigation.navigate(ROUTES.staffList);
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.headerView}>
          <TouchableOpacity style={styles.closeButton} onPress={closeMenu}>
            <SVG.closeIcon width={hp(14)} height={hp(14)} fill={colors.white} />
          </TouchableOpacity>
        </View>
        <View style={styles.userProfileContainer}>
          <SVG.settingIcon width={wp(60)} height={wp(60)} />
          <AppText size={hp(20)} fontWeight="bold">
            User Name
          </AppText>
          <AppText size={hp(14)}>Owner</AppText>
        </View>
        <MenuItem
          icon={'langIcon'}
          name={t('Menu.ChangeLanguage')}
          showBG
          onPressMenu={() => onChangeLanguage()}
        />
        <MenuItem
          icon={'userStaffIcon'}
          name={t('Menu.ManageStaff')}
          showBG
          onPressMenu={() => goToStaffList()}
        />
        <MenuItem
          icon={'notificationIcon'}
          name={t('Menu.Notifications')}
          showBG
        />
        <MenuItem
          icon={'subscriptionIcon'}
          name={t('Menu.Subscription')}
          showBG
        />
        <MenuItem icon={'chatIcon'} name={t('Menu.Chat&Support')} showBG />
      </View>
      <TouchableOpacity style={styles.deleteButton}>
        <AppText size={hp(16)} color={colors.textRed} style={styles.deleteText}>
          {t('Menu.DeleteAccount')}
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

export default RightMenu;
