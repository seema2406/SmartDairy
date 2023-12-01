import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useStyle } from './PartyItemStyle';
import AppText from '../text/AppText';
import { useResponsiveScreen } from '../../hooks/useResponsiveScreen';
import Checkbox from '../checkbox/Checkbox';
import { useTranslation } from 'react-i18next';
import { size } from 'lodash';

const PartyItem = ({
  id,
  mobile,
  name,
  address,
  data,
  onItemPress = () => {},
  onPressSelection,
  isSelected,
}: any) => {
  const { styles, colors } = useStyle({});
  const { hp } = useResponsiveScreen();
  const { t } = useTranslation();

  const dispayProfile = (nameStr: string) => {
    const nameArr = nameStr?.split(' ');
    let profileText = size(nameArr) > 0 ? nameArr[0]?.charAt(0) : 'N/A';
    profileText += nameArr?.[1] ? nameArr[1]?.charAt(0) : '';
    return profileText;
  };

  return (
    <TouchableOpacity style={styles.menuItem} key={id} onPress={onItemPress}>
      <View style={styles.menuItemInner}>
        <View style={styles.menuIcon}>
          <AppText size={hp(20)} fontWeight="medium" textTransform="uppercase">
            {dispayProfile(name)}
          </AppText>
        </View>
        <View>
          <AppText size={hp(16)} fontWeight="medium" textTransform="capitalize">
            {name}
          </AppText>
          {address && (
            <AppText size={hp(14)} fontWeight="regular">
              {t('Labels.Address')}
              {` - ${address}`}
            </AppText>
          )}
          <AppText size={hp(14)} fontWeight="regular">
            {t('Labels.MobileNumber')}
            {` - ${mobile}`}
          </AppText>
        </View>
      </View>
      {onPressSelection && (
        <View style={styles.checkboxContainer}>
          <Checkbox
            onPress={() => onPressSelection(data)}
            active={isSelected}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default PartyItem;
