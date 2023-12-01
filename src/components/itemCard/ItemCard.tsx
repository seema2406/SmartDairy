import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useStyle } from './ItemCardStyle';
import AppText from '../text/AppText';
import { useResponsiveScreen } from '../../hooks/useResponsiveScreen';
import { useTranslation } from 'react-i18next';

const ItemCard = ({
  id,
  name,
  sale,
  purchase,
  onItemPress = () => {},
}: any) => {
  const { styles, colors } = useStyle({});
  const { t } = useTranslation();
  const { hp } = useResponsiveScreen();

  return (
    <TouchableOpacity style={styles.menuItem} key={id} onPress={onItemPress}>
      <View style={styles.menuItemInner}>
        <View>
          <AppText size={hp(16)} fontWeight="medium" textTransform="capitalize">
            {name}
          </AppText>
          <AppText size={hp(14)} fontWeight="regular">
            {t('Labels.SaleRate')}
            {` : ${sale}/-`}
          </AppText>
          <AppText size={hp(14)} fontWeight="regular">
            {t('Labels.PurchaseRate')}
            {` : ${purchase}/-`}
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemCard;
