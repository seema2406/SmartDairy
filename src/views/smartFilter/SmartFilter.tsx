import React, { useEffect, useRef, useState } from 'react';
import { useStyle } from './SmartFilterStyle';
import {
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SearchBar from '../../components/searchBar/SearchBar';
import { FlatList } from 'react-native-gesture-handler';
import EmptyView from '../../components/emptyView/EmptyView';
import PartyItem from '../../components/partyItem/PartyItem';
import { useTranslation } from 'react-i18next';
import {
  useFetchSmartFilterMutation,
  useLazyFetchPartiesQuery,
} from '../../services/partyService';
import { getFormData } from '../../helpers/utils';
import { ROUTES } from '../../constants/routeConstant';
import BottomLoader from '../../components/loader/BottomLoader';
import { filter, includes, isEmpty, size } from 'lodash';
import SVG from '../../assets/svg';
import { useAppSelector } from '../../hooks/useRedux';
import AppText from '../../components/text/AppText';

const SmartFilter = ({ navigation, route }: any) => {
  const { styles, colors } = useStyle();
  const { t } = useTranslation();
  const { selectedDairy } = useAppSelector(state => state.dairy);
  const [fetchSmartFilter] = useFetchSmartFilterMutation();
  const [parties, setParties] = useState<any>([]);
  const [searchText, setSearchText] = useState('');
  const [mode, setMode] = useState<'smartfilter' | 'fetchall'>('smartfilter');
  const [fetchParties, result] = useLazyFetchPartiesQuery();
  const onEndReachedCalledDuringMomentumRef = useRef(false);
  const [page, setPage] = useState(1);
  const { data, isFetching } = result;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title:
        route?.name == 'SmartFilterSale'
          ? t('HeaderTitle.Sale')
          : t('HeaderTitle.Purchase'),
    });
  }, [navigation, styles, t, route]);

  useEffect(() => {
    setMode('smartfilter');
  }, [route?.name]);

  useEffect(() => {
    if (mode === 'fetchall') {
      fetchParties(
        getFormData({
          nDairyid: selectedDairy?.nDairyid,
          PageNum: page,
          PageSize: 10,
          PartyType: 'A',
        }),
      ).then((res: any) => {
        if (page > 1) {
          if (size(res?.data?.Data) > 0) {
            const newParties = [...parties, ...res?.data?.Data];
            setParties(newParties);
          }
        } else {
          const newParties = res?.data?.Data;
          setParties(newParties);
        }
      });
    } else {
      var today = new Date();
      var time = today.getHours() + ':' + today.getMinutes();
      fetchSmartFilter(
        getFormData({
          Partytype: route?.name == 'SmartFilterSale' ? 'S' : 'P',
          nDairyid: selectedDairy?.nDairyid,
          Curtm: time,
        }),
      ).then((res: any) => {
        setParties(res?.data?.Data);
      });
    }
  }, [selectedDairy, mode, page]);

  const onPartyPress = (item: any) => {
    if (route?.name == 'SmartFilterSale') {
      navigation.navigate(ROUTES.sales, {
        nPartyid: item?.nPartyid,
        nDairyid: selectedDairy?.nDairyid,
      });
    }
    if (route?.name == 'SmartFilterPurchase') {
      navigation.navigate(ROUTES.purchase, {
        nPartyid: item?.nPartyid,
        nDairyid: selectedDairy?.nDairyid,
      });
    }
  };

  const renderBottomLoader = () => {
    if (!isEmpty(parties) && isFetching) {
      return <BottomLoader />;
    }
    return <></>;
  };

  const handleLoadMore = () => {
    if (isEmpty(parties) || isFetching) {
      return;
    }
    setPage(p => p + 1);
  };

  const renderItem = ({ item }: any) => {
    return (
      <PartyItem
        id={item?.nPartyid}
        name={item?.cPartynm}
        address={'N/A'}
        mobile={item?.cMobile}
        onItemPress={() => {
          onPartyPress(item);
        }}
      />
    );
  };

  const renderItemSeparator = () => <View style={styles.itemSeparator} />;

  const renderEmptyView = () => {
    return <EmptyView contentName={'Parties'} />;
  };

  const onRefreshPartyList = () => {};

  const onAddPress = () => {
    navigation.navigate(ROUTES.partyForm, {
      mode: 'create',
      partyData: {
        type: route?.name == 'SmartFilterSale' ? 'S' : 'P',
      },
    });
  };

  const handleSearch = (text: string) => {
    const query = text.toLowerCase();
    setSearchText(query);
  };

  const getPartiesFilterData = () => {
    if (searchText) {
      return filter(parties, item => {
        return (
          includes(item?.cPartynm.toLowerCase(), searchText) ||
          includes(item?.cMobile.toLowerCase(), searchText)
        );
      });
    }
    return parties;
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.searchBarContainer}>
          <SearchBar
            containerStyle={styles.searchBar}
            onSearch={handleSearch}
          />
          <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
            <AppText
              size={16}
              color={colors.white}
              style={styles.addButtonLabel}>
              {t('Buttons.Add')}
            </AppText>
            <SVG.addPlusIcon width={14} height={14} />
          </TouchableOpacity>
        </View>
        <View style={styles.shiftContainer}>
          <Pressable
            style={[
              styles.filterBtn,
              mode === 'smartfilter' && styles.activeFilter,
            ]}
            onPress={() => {
              setMode('smartfilter');
              setPage(1);
            }}>
            <AppText
              size={12}
              style={[mode === 'smartfilter' && styles.activeLabel]}>
              {t('Buttons.SmartFilter')}
            </AppText>
          </Pressable>
          <Pressable
            style={[
              styles.filterBtn,
              mode === 'fetchall' && styles.activeFilter,
            ]}
            onPress={() => setMode('fetchall')}>
            <AppText
              size={12}
              style={[mode === 'fetchall' && styles.activeLabel]}>
              {''}
              {t('Buttons.FetchAll')}
            </AppText>
          </Pressable>
        </View>
        <FlatList
          data={getPartiesFilterData() || []}
          renderItem={renderItem}
          style={styles.listContainer}
          ItemSeparatorComponent={renderItemSeparator}
          contentContainerStyle={styles.contentContainerStyle}
          ListEmptyComponent={renderEmptyView}
          onRefresh={onRefreshPartyList}
          refreshing={false}
          onEndReachedThreshold={0.01}
          ListFooterComponent={renderBottomLoader}
          onMomentumScrollBegin={() => {
            onEndReachedCalledDuringMomentumRef.current = false;
          }}
          onEndReached={() => {
            if (
              !onEndReachedCalledDuringMomentumRef.current &&
              mode === 'fetchall'
            ) {
              handleLoadMore();
              onEndReachedCalledDuringMomentumRef.current = true;
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default SmartFilter;
