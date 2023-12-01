import React, { useEffect, useState } from 'react';
import { useStyle } from './LeftMenuStyle';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import SVG from '../../assets/svg';
import AppText from '../../components/text/AppText';
import SearchBar from '../../components/searchBar/SearchBar';
import DairyItem from '../../components/dairyItem/DairyItem';
import EmptyView from '../../components/emptyView/EmptyView';
import { useResponsiveScreen } from '../../hooks/useResponsiveScreen';
import { ROUTES } from '../../constants/routeConstant';
import { useTranslation } from 'react-i18next';
import AppButton from '../../components/button/AppButton';
import { COLORS } from '../../theme';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { cloneDeep, filter, includes } from 'lodash';
import { setSelectedDairy } from '../../store/slices/dairySlice';

const LeftMenu = ({ navigation }: any) => {
  const { styles, colors } = useStyle();
  const { hp } = useResponsiveScreen();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const keyboardVerticalOffset = StatusBar?.currentHeight || 0;
  const { user } = useAppSelector(state => state.auth);
  const { selectedDairy } = useAppSelector(state => state.dairy);
  const [allDairies, setAllDairies] = useState<any[]>([]);
  const [dairyList, setDairyList] = useState<any[]>([]);

  const closeMenu = () => {
    navigation.getParent('LeftDrawer').closeDrawer();
  };

  useEffect(() => {
    if (user?.Dairy) {
      const filteredData = filter(
        user?.Dairy,
        item => item?.nDairyid !== selectedDairy?.nDairyid,
      );
      setDairyList(filteredData);
      setAllDairies(filteredData);
    }
  }, [selectedDairy, user?.Dairy]);

  const handleSearch = (text: string) => {
    const query = text.toLowerCase();
    if (query) {
      const listData = cloneDeep(allDairies);
      const filteredData = filter(listData, item => {
        const { cDairynm } = item;
        if (includes(cDairynm.toLowerCase(), query)) {
          return true;
        }
        return false;
      });
      setDairyList(filteredData);
    } else {
      const listData = cloneDeep(allDairies);
      setDairyList(listData);
    }
  };

  const onPressDairy = (item: any) => {
    dispatch(setSelectedDairy(item));
  };

  const renderItem = ({ item }: any) => {
    return (
      <DairyItem
        icon="houseIcon"
        name={item?.cDairynm}
        address="Jaipur, Rajasthan"
        onPressDairy={() => onPressDairy(item)}
      />
    );
  };

  const renderItemSeparator = () => <View style={styles.itemSeparator} />;

  const renderEmptyView = () => {
    if (!dairyList?.length) {
      return <EmptyView contentName={'Dairy'} />;
    }
    return <></>;
  };

  const renderStickyHeaderComponent = () => (
    <View style={styles.stickyHeaderContainer}>
      <AppText size={16} fontWeight="italic">
        {t('Labels.SelectDairy')}
      </AppText>
    </View>
  );

  const onAddDairyPress = () => {
    navigation.navigate(ROUTES.addDairy, {
      phone_number: user?.cMobile,
      from: 'leftMenu',
    });
  };

  const onEditDairyPress = () => {
    navigation.navigate(ROUTES.addDairy, {
      dairyData: selectedDairy,
      from: 'leftMenu',
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      contentContainerStyle={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={keyboardVerticalOffset}
      enabled={false}>
      <View style={styles.container}>
        <View style={styles.headerView}>
          <TouchableOpacity style={styles.closeButton} onPress={closeMenu}>
            <SVG.closeIcon width={hp(14)} height={hp(14)} fill={colors.white} />
          </TouchableOpacity>
        </View>
        <View style={styles.dairyContainer}>
          <AppText size={16} fontWeight="bold">
            {selectedDairy?.cDairynm}
          </AppText>
          <AppText size={12}>Maharashtra, India, India</AppText>
        </View>
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.actionIconButton}
            onPress={onEditDairyPress}>
            <SVG.editIcon />
            <AppText size={14} fontWeight="regular">
              {t('Buttons.Edit')}
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionIconButton}
            onPress={() => {
              navigation.navigate(ROUTES.partyList);
            }}>
            <SVG.userIcon />
            <AppText size={14} fontWeight="regular">
              {t('Buttons.Parties')}
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionIconButton}
            onPress={() => {
              navigation.navigate(ROUTES.itemList);
            }}>
            <SVG.boxIcon />
            <AppText size={14} fontWeight="regular">
              {t('Buttons.Items')}
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionIconButton}>
            <SVG.reportIcon />
            <AppText size={14} fontWeight="regular">
              {t('Buttons.Reports')}
            </AppText>
          </TouchableOpacity>
        </View>
        <SearchBar
          containerStyle={styles.searchBarContainer}
          onSearch={handleSearch}
        />
        <FlatList
          data={dairyList}
          renderItem={renderItem}
          style={styles.listContainer}
          ItemSeparatorComponent={renderItemSeparator}
          ListEmptyComponent={renderEmptyView}
          StickyHeaderComponent={renderStickyHeaderComponent}
        />
        <View style={styles.buttonContainer}>
          <AppButton
            title={t('Buttons.AddDairy')}
            onPress={onAddDairyPress}
            radius={100}
            leftIcon={
              <SVG.housePlusIcon width={24} height={24} fill={COLORS.white} />
            }
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LeftMenu;
