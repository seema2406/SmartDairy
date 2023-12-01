import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useStyle } from './TabHeaderStyle';
import SVGIcon from '../../assets/svg';
import AppText from '../text/AppText';
import { useAppSelector } from '../../hooks/useRedux';

const TabHeader = ({ navigation }: any) => {
  const { styles, colors } = useStyle({});
  const { selectedDairy } = useAppSelector(state => state.dairy);

  const openLeftMenu = () => {
    navigation.getParent('LeftDrawer').openDrawer();
  };

  const openRightMenu = () => {
    navigation.getParent('RightDrawer').openDrawer();
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity style={styles.dairyButton} onPress={openLeftMenu}>
          <View style={styles.locationIcon}>
            <SVGIcon.locationIcon />
          </View>
          <View>
            <AppText size={16} fontWeight="bold">
              {selectedDairy?.cDairynm}
            </AppText>
            <AppText size={10} fontWeight="regular">
              Maharashtra, India, India
            </AppText>
          </View>
          <View style={styles.arrowIcon}>
            <SVGIcon.arrowDownIcon />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={openRightMenu}>
          <SVGIcon.settingIcon fill={colors.black} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TabHeader;
