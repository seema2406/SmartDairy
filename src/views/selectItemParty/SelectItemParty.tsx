import React, { useEffect, useState } from 'react';
import { useStyle } from './SelectItemPartyStyle';
import { View } from 'react-native';
import SearchBar from '../../components/searchBar/SearchBar';
import { FlatList } from 'react-native-gesture-handler';
import EmptyView from '../../components/emptyView/EmptyView';
import PartyItem from '../../components/partyItem/PartyItem';
import { useTranslation } from 'react-i18next';
import { useLazyFetchPartytoCustomQuery } from '../../services/partyService';
import { getFormData, openModal, showToaster } from '../../helpers/utils';
import { MODALS } from '../../constants/routeConstant';
import { filter, includes } from 'lodash';
import { useAppSelector } from '../../hooks/useRedux';
import {
  useAddCustomPriceMutation,
  useLazyFecthItemstoCustomQuery,
} from '../../services/itemService';
import ItemCard from '../../components/itemCard/ItemCard';

const SelectItemParty = ({ navigation, route }: any) => {
  const { styles } = useStyle();
  const { t } = useTranslation();
  const [fetchItemstoCustom] = useLazyFecthItemstoCustomQuery();
  const [fetchPartytoCustom] = useLazyFetchPartytoCustomQuery();
  const [saveCustomPrice] = useAddCustomPriceMutation();
  const { selectedDairy } = useAppSelector(state => state.dairy);
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const from: 'item' | 'party' = route?.params?.from || 'party';
  const title = route?.params?.title;
  const partyId = route?.params?.partyId || 0;
  const itemId = route?.params?.itemId || 0;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, [navigation, title]);

  useEffect(() => {
    onFetchData();
  }, [from, selectedDairy?.nDairyid]);

  const onFetchData = () => {
    if (from === 'item') {
      setIsLoading(true);
      fetchPartytoCustom(
        getFormData({ nDairyid: selectedDairy?.nDairyid, nItemid: itemId }),
      ).then((res: any) => {
        setIsLoading(false);
        if (res?.data?.success) {
          setData(res?.data?.Data || []);
        }
      });
    } else {
      setIsLoading(true);
      fetchItemstoCustom(
        getFormData({ nDairyid: selectedDairy?.nDairyid, nPartyid: partyId }),
      ).then((res: any) => {
        setIsLoading(false);
        if (res?.data?.success) {
          setData(res?.data?.Data || []);
        }
      });
    }
  };

  const onRefreshList = () => {
    onFetchData();
  };

  const handleSearch = (text: string) => {
    const query = text.toLowerCase();
    setSearchText(query);
  };

  const getFilterData = () => {
    if (searchText) {
      return filter(data, (item: any) => {
        return from === 'item'
          ? includes(item?.cPartynm?.toLowerCase(), searchText) ||
              includes(item?.cMobile?.toLowerCase(), searchText)
          : includes(item?.cItemnm?.toLowerCase(), searchText) ||
              includes(item?.nSRate?.toString()?.toLowerCase(), searchText) ||
              includes(item?.nPRate?.toString()?.toLowerCase(), searchText);
      });
    }
    return data;
  };

  const onItemOrPartyPress = (item: any) => {
    openModal(MODALS.customPrice, {
      item,
      callback: (updatedData: any) => {
        onUpdateCustomPrice(updatedData);
      },
    });
  };

  const onUpdateCustomPrice = (item: any) => {
    const payload = {
      Party: [
        {
          nPartyid: item?.nPartyid || partyId,
          nItemid: item?.nItemid || itemId,
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
      <>
        {from === 'item' ? (
          <PartyItem
            id={item?.nPartyid}
            name={item?.cPartynm}
            address={'N/A'}
            mobile={item?.cMobile}
            onItemPress={() => {
              onItemOrPartyPress(item);
            }}
          />
        ) : (
          <ItemCard
            id={item?.nItemid}
            name={item?.cItemnm}
            sale={item?.nSRate}
            purchase={item?.nPRate}
            onItemPress={() => {
              onItemOrPartyPress(item);
            }}
          />
        )}
      </>
    );
  };

  const renderItemSeparator = () => <View style={styles.itemSeparator} />;

  const renderEmptyView = () => {
    if (!isLoading) {
      return <EmptyView contentName={from === 'item' ? 'Parties' : 'Items'} />;
    }
    return <></>;
  };

  return (
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
  );
};

export default SelectItemParty;
