import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useStackHeaderStyle } from './StackHeaderStyle';
import SVGIcon from '../../assets/svg';
import SearchBar from '../searchBar/SearchBar';
import AppText from '../text/AppText';
import { useAppSelector } from '../../hooks/useRedux';

const StackHeader = (props: any) => {
  const { styles, colors } = useStackHeaderStyle({});
  const [toggleSearchBar, setToggleSearchBar] = useState(false);
  const { selectedDairy } = useAppSelector(state => state.dairy);

  const searchTextChange = (text: any) => {
    if (props?.onSearchTextChange) {
      props?.onSearchTextChange(text);
    }
  };

  const onToggleSearchBar = () => {
    setToggleSearchBar(!toggleSearchBar);
  };

  const onGoBack = () => {
    const { navigation } = props;
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {toggleSearchBar ? (
        <SearchBar onCancel={onToggleSearchBar} onSearch={searchTextChange} />
      ) : (
        <View
          style={[
            styles.innerContainer,
            !props?.showBackIcon && styles.padding24,
          ]}>
          {props?.showBackIcon && (
            <TouchableOpacity style={styles.iconContainer} onPress={onGoBack}>
              <SVGIcon.backIcon fill={colors.black} width={16} height={16} />
            </TouchableOpacity>
          )}
          {props?.options?.headerTitle ? (
            props?.options?.headerTitle()
          ) : (
            <View style={styles.headerTitleContainer}>
              <AppText size={16} fontWeight="bold" textTransform="capitalize">
                {props?.options?.title || props?.route?.name}
              </AppText>
              <AppText size={12} fontWeight="regular">
                {selectedDairy?.cDairynm}
              </AppText>
            </View>
          )}
          {props?.searchBar && (
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={onToggleSearchBar}>
              <View style={styles.searchIcon}>
                <SVGIcon.searchIcon
                  fill={colors.white}
                  width={11}
                  height={11}
                />
              </View>
            </TouchableOpacity>
          )}
          {props?.options?.headerRight && props?.options?.headerRight()}
        </View>
      )}
    </View>
  );
};

export default StackHeader;
