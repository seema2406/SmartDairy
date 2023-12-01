import React from 'react';
import { View, TouchableOpacity, Pressable } from 'react-native';
import { useStyle } from './StaffItemStyle';
import AppText from '../text/AppText';
import { useResponsiveScreen } from '../../hooks/useResponsiveScreen';
import { useTranslation } from 'react-i18next';
import { size } from 'lodash';
import Svg from '../../assets/svg';

const StaffItem = ({
  id,
  mobile,
  name,
  status,
  onItemPress = () => {},
  onStatusPress = () => {},
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
    <TouchableOpacity
      style={[
        styles.menuItem,
        status === 'I' && { backgroundColor: colors.lighterGrayBG },
      ]}
      key={id}
      onPress={onItemPress}
      disabled={status === 'I' ? true : false}>
      <View style={styles.menuItemInner}>
        <View style={styles.menuItemInner}>
          <View style={styles.menuIcon}>
            <AppText
              size={hp(20)}
              fontWeight="medium"
              textTransform="uppercase">
              {dispayProfile(name)}
            </AppText>
          </View>
          <View>
            <AppText
              size={hp(16)}
              fontWeight="medium"
              textTransform="capitalize">
              {name || 'N/A'}
            </AppText>
            <AppText size={hp(14)} fontWeight="regular">
              {t('Labels.MobileNumber')}
              {` - ${mobile}`}
            </AppText>
          </View>
        </View>

        <Pressable style={styles.statusBtn} onPress={onStatusPress}>
          {status === 'I' ? (
            <Svg.inactiveUserIcon width={28} height={28} />
          ) : (
            <Svg.activeUserIcon width={24} height={24} />
          )}
        </Pressable>
      </View>
    </TouchableOpacity>
  );
};

export default StaffItem;
