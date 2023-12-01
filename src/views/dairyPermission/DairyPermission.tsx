import React, { useCallback, useState } from 'react';
import { useStyle } from './DairyPermissionStyle';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import EmptyView from '../../components/emptyView/EmptyView';
import { cloneDeep, filter, findIndex, includes, size } from 'lodash';
import { showToaster } from '../../helpers/utils';
import AppButton from '../../components/button/AppButton';
import { useTranslation } from 'react-i18next';
import SearchBar from '../../components/searchBar/SearchBar';
import { useAppSelector } from '../../hooks/useRedux';
import SVG from '../../assets/svg';
import DairyItem from '../../components/dairyItem/DairyItem';

const DairyPermission = ({ navigation, route }: any) => {
  const styles = useStyle();
  const keyboardVerticalOffset = StatusBar?.currentHeight || 0;
  const { t } = useTranslation();

  const { user } = useAppSelector(state => state.auth);
  const [selectedDairies, setSelectedDairies] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');
  const dairyList = user?.Dairy || [];
  const { onApply } = route?.params || {};

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: t('HeaderTitle.DairyPermissions'),
      headerRight: () => (
        <TouchableOpacity style={styles.rightIcon} onPress={onSelectAll}>
          <SVG.selectAllIcon />
        </TouchableOpacity>
      ),
    });
  }, [navigation, dairyList, styles, t]);

  const onSelectAll = () => {
    setSelectedDairies(
      size(selectedDairies) === size(dairyList) ? [] : dairyList,
    );
  };
  const onSaveDairies = () => {
    if (size(selectedDairies) <= 0) {
      showToaster(t('Errors.SelectDairyError'), 'E');
      return;
    }
    onApply?.(
      selectedDairies.map(item => {
        return { nDairyid: item?.nDairyid, cDairynm: item?.cDairynm };
      }),
    );
    navigation.goBack();
  };

  const onPressSelection = (data: any) => {
    const index = findIndex(selectedDairies, (element: any) => {
      return element?.nDairyid === data?.nDairyid;
    });
    let newList = cloneDeep(selectedDairies);
    if (index > -1) {
      newList = filter(newList, item => data?.nDairyid !== item?.nDairyid);
      setSelectedDairies(newList);
    } else {
      setSelectedDairies([...newList, data]);
    }
  };

  const checkIsSelected = useCallback(
    (id: string) => {
      const isSelected = selectedDairies.some(element => {
        return element?.nDairyid === id;
      });
      return isSelected;
    },
    [selectedDairies],
  );

  const handleSearch = (text: string) => {
    const query = text.toLowerCase();
    setSearchText(query);
    if (query !== searchText) {
      setSelectedDairies([]);
    }
  };

  const getFilterData = () => {
    if (searchText) {
      return filter(dairyList, item => {
        return includes(item?.cDairynm.toLowerCase(), searchText);
      });
    }
    return dairyList;
  };

  const renderItem = ({ item }: any) => {
    return (
      <DairyItem
        icon="houseIcon"
        name={item?.cDairynm}
        address="Jaipur, Rajasthan"
        onPressDairy={() => onPressSelection(item)}
        showCheckBox
        isSelected={checkIsSelected(item?.nDairyid)}
      />
    );
  };

  const renderItemSeparator = () => <View style={styles.itemSeparator} />;

  const renderEmptyView = () => {
    return <EmptyView contentName={'Dairy'} />;
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAvoidingView
        style={styles.container}
        contentContainerStyle={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={keyboardVerticalOffset}
        enabled={false}>
        <View style={styles.container}>
          <SearchBar
            containerStyle={styles.searchBarContainer}
            onSearch={handleSearch}
          />
          <FlatList
            data={getFilterData()}
            renderItem={renderItem}
            style={styles.listContainer}
            ItemSeparatorComponent={renderItemSeparator}
            contentContainerStyle={styles.contentContainerStyle}
            ListEmptyComponent={renderEmptyView}
          />
          <View style={styles.buttonContainer}>
            <AppButton
              title={t('Buttons.Save')}
              onPress={onSaveDairies}
              radius={5}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default DairyPermission;
