import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useStyle } from './MenuItemStyle';
import SVG from '../../assets/svg';
import AppText from '../text/AppText';
import { useResponsiveScreen } from '../../hooks/useResponsiveScreen';

const MenuItem = ({
  icon,
  name,
  showBorder = false,
  showBG = false,
  onPressMenu,
}: any) => {
  const { styles, colors } = useStyle({ showBG });
  const { hp } = useResponsiveScreen();
  const ICON = icon ? SVG[icon as keyof typeof SVG] : null;

  return (
    <TouchableOpacity
      style={[styles.menuItem, showBorder && styles.borderStyle]}
      onPress={onPressMenu && onPressMenu}>
      <View style={styles.menuItemInner}>
        {ICON && (
          <View style={styles.menuIcon}>
            <ICON width={hp(24)} height={hp(24)} />
          </View>
        )}
        <AppText size={16} fontWeight="regular">
          {name}
        </AppText>
      </View>
      <SVG.arrowRightIcon width={16} height={16} />
    </TouchableOpacity>
  );
};

export default MenuItem;
