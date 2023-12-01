import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useStyle } from './DairyItemStyle';
import SVG from '../../assets/svg';
import AppText from '../text/AppText';
import { useResponsiveScreen } from '../../hooks/useResponsiveScreen';
import Checkbox from '../checkbox/Checkbox';

const DairyItem = ({
  icon,
  name,
  address,
  onPressDairy,
  showCheckBox,
  isSelected,
}: any) => {
  const { styles, colors } = useStyle({});
  const { hp } = useResponsiveScreen();
  const ICON = SVG[icon as keyof typeof SVG];

  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPressDairy}>
      <View style={styles.menuItemInner}>
        <View style={styles.menuIcon}>
          <ICON width={hp(30)} height={hp(30)} />
        </View>
        <View>
          <AppText size={hp(16)} fontWeight="medium">
            {name}
          </AppText>
          <AppText size={hp(14)} fontWeight="regular">
            {address}
          </AppText>
        </View>
      </View>
      {/* <SVG.arrowRightIcon width={16} height={16} /> */}
      {showCheckBox && (
        <View style={styles.checkboxContainer}>
          <Checkbox onPress={onPressDairy} active={isSelected} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default DairyItem;
