import React, { useEffect, useState } from 'react';
import { useStyle } from './ItemListStyle';
import { SafeAreaView, View } from 'react-native';
import SearchBar from '../../components/searchBar/SearchBar';
import { FlatList } from 'react-native-gesture-handler';
import EmptyView from '../../components/emptyView/EmptyView';
import { useTranslation } from 'react-i18next';
import { getFormData } from '../../helpers/utils';
import AppButton from '../../components/button/AppButton';
import Svg from '../../assets/svg';
import { COLORS } from '../../theme';
import { ROUTES } from '../../constants/routeConstant';
import { filter, includes } from 'lodash';
import { useAppSelector } from '../../hooks/useRedux';
import ItemCard from '../../components/itemCard/ItemCard';
import { useLazyFetchItemsQuery } from '../../services/itemService';

const ItemList = ({ navigation }: any) => {
  const { styles } = useStyle();
  const { t } = useTranslation();
  const { selectedDairy } = useAppSelector(state => state.dairy);
  const [fetchItems, result] = useLazyFetchItemsQuery();
  const [items, setItems] = useState<any>([]);
  const { data, isLoading } = result;
  const [searchText, setSearchText] = useState('');

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: t('HeaderTitle.AllItems'),
    });
  }, [navigation, t]);

  useEffect(() => {
    setItems(data?.Data || []);
  }, [data?.Data]);

  useEffect(() => {
    fetchItems(
      getFormData({
        nDairyid: selectedDairy?.nDairyid,
        cType: 'A',
      }),
    );
  }, [selectedDairy]);

  const onAddItemPress = () => {
    navigation.navigate(ROUTES.itemForm, {
      mode: 'create',
    });
  };

  const onItemPress = (item: any) => {
    navigation.navigate(ROUTES.itemForm, {
      mode: 'edit',
      itemData: item,
    });
  };

  const renderItem = ({ item }: any) => {
    return (
      <ItemCard
        id={item?.nItemid}
        name={item?.cItemnm}
        sale={item?.nSRate}
        purchase={item?.nPRate}
        onItemPress={() => {
          onItemPress(item);
        }}
      />
    );
  };

  const renderItemSeparator = () => <View style={styles.itemSeparator} />;

  const renderEmptyView = () => {
    if (!isLoading) {
      return <EmptyView contentName={'Items'} />;
    }
    return <></>;
  };

  const onRefreshPartyList = () => {
    fetchItems(
      getFormData({
        nDairyid: selectedDairy?.nDairyid,
        cType: 'A',
      }),
    );
  };

  const handleSearch = (text: string) => {
    const query = text.toLowerCase();
    setSearchText(query);
  };

  const getFilterData = () => {
    if (searchText) {
      return filter(items, item => {
        return (
          includes(item?.cPartynm.toLowerCase(), searchText) ||
          includes(item?.nSRate.toLowerCase(), searchText) ||
          includes(item?.nPRate.toLowerCase(), searchText)
        );
      });
    }
    return items;
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <SearchBar
          containerStyle={styles.searchBarContainer}
          onSearch={handleSearch}
        />
        <FlatList
          data={getFilterData() || []}
          renderItem={renderItem}
          style={styles.listContainer}
          ItemSeparatorComponent={renderItemSeparator}
          contentContainerStyle={styles.contentContainerStyle}
          ListEmptyComponent={renderEmptyView}
          onRefresh={onRefreshPartyList}
          refreshing={false}
        />
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          title={t('Buttons.AddItem')}
          onPress={onAddItemPress}
          radius={100}
          leftIcon={
            <Svg.housePlusIcon width={24} height={24} fill={COLORS.white} />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default ItemList;
