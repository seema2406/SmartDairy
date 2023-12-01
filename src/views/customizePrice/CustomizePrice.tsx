import React, { useEffect, useState } from 'react';
import { useStyle } from './CustomizePriceStyle';
import { SafeAreaView, View } from 'react-native';
import SearchBar from '../../components/searchBar/SearchBar';
import { FlatList } from 'react-native-gesture-handler';
import EmptyView from '../../components/emptyView/EmptyView';
import PartyItem from '../../components/partyItem/PartyItem';
import { useTranslation } from 'react-i18next';
import { getFormData, openModal, showToaster } from '../../helpers/utils';
import AppButton from '../../components/button/AppButton';
import Svg from '../../assets/svg';
import { COLORS } from '../../theme';
import { MODALS, ROUTES } from '../../constants/routeConstant';
import { filter, includes } from 'lodash';
import ItemCard from '../../components/itemCard/ItemCard';
import {
  useAddCustomPriceMutation,
  useLazyFetchCustomPriceQuery,
} from '../../services/itemService';

const CustomizePrice = ({ navigation, route }: any) => {
  const { styles } = useStyle();
  const { t } = useTranslation();
  const [fetchCustomPrice, result] = useLazyFetchCustomPriceQuery();
  const [saveCustomPrice] = useAddCustomPriceMutation();
  const { data, isFetching, isLoading } = result;
  const [searchText, setSearchText] = useState('');
  const from: 'item' | 'party' = route?.params?.from || 'party';
  const partyId = route?.params?.partyId || 0;
  const itemId = route?.params?.itemId || 0;
  const itemName = route?.params?.itemName || '';
  const dataLists = data?.Data || [];

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: t('HeaderTitle.CustomizePrice') + ` for ${itemName}`,
    });
  }, [itemName, navigation, styles, t]);

  useEffect(() => {
    fetchCustomPrice(getFormData({ nPartyid: partyId, nItemid: itemId }));
  }, [partyId, itemId]);

  const onItemPress = (item: any) => {
    openModal(MODALS.customPrice, {
      item,
      from,
      callback: (updatedData: any) => {
        onUpdateCustomPrice(updatedData);
      },
    });
  };

  const onUpdateCustomPrice = (item: any) => {
    const payload = {
      Party: [
        {
          nPartyid: partyId,
          nItemid: item?.nItemid,
          nPRate: item?.nPRate,
          nSRate: item?.nSRate,
        },
      ],
    };
    saveCustomPrice(getFormData(payload)).then((res: any) => {
      if (res?.data?.success) {
        showToaster('Custom price updated successfully', 'S');
      } else {
        showToaster(res?.data?.message || 'Something went wrong', 'E');
      }
    });
  };

  const renderItem = ({ item }: any) => {
    return (
      <ItemCard
        id={item?.nItemid}
        name={from === 'item' ? item?.cPartyNm : item?.cItemNm}
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
      return <EmptyView contentName={from === 'item' ? 'Parties' : 'Items'} />;
    }
    return <></>;
  };

  const onRefreshList = () => {
    fetchCustomPrice(getFormData({ nPartyid: partyId, nItemid: itemId }));
  };

  const onItemOrPartyPress = () => {
    navigation.navigate(ROUTES.selectItemParty, {
      title:
        from === 'item'
          ? t('HeaderTitle.SelectParty')
          : t('HeaderTitle.SelectItem'),
      from,
      partyId: partyId,
      itemId: itemId,
    });
  };

  const handleSearch = (text: string) => {
    const query = text?.toLowerCase();
    setSearchText(query);
  };

  const getFilterData = () => {
    if (searchText) {
      return filter(dataLists, item => {
        return (
          (from === 'item'
            ? includes(item?.cPartynm?.toLowerCase(), searchText)
            : includes(item?.cItemNm?.toLowerCase(), searchText)) ||
          includes(item?.nSRate?.toString()?.toLowerCase(), searchText) ||
          includes(item?.nPRate?.toString()?.toLowerCase(), searchText)
        );
      });
    }
    return dataLists;
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
          onRefresh={onRefreshList}
          refreshing={false}
        />
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          title={
            from === 'party' ? t('Buttons.AddItem') : t('Buttons.AddParty')
          }
          onPress={onItemOrPartyPress}
          radius={100}
          leftIcon={
            <Svg.housePlusIcon width={24} height={24} fill={COLORS.white} />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default CustomizePrice;
