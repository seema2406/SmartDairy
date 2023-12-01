import React, { useEffect, useRef, useState } from 'react';
import { useStyle } from './PartyListStyle';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import SearchBar from '../../components/searchBar/SearchBar';
import { FlatList } from 'react-native-gesture-handler';
import EmptyView from '../../components/emptyView/EmptyView';
import PartyItem from '../../components/partyItem/PartyItem';
import { useTranslation } from 'react-i18next';
import { useLazyFetchPartiesQuery } from '../../services/partyService';
import { getFormData } from '../../helpers/utils';
import AppButton from '../../components/button/AppButton';
import Svg from '../../assets/svg';
import { COLORS } from '../../theme';
import { ROUTES } from '../../constants/routeConstant';
import BottomLoader from '../../components/loader/BottomLoader';
import { cloneDeep, filter, includes, isEmpty, size } from 'lodash';
import SVG from '../../assets/svg';
import { useAppSelector } from '../../hooks/useRedux';

const PartyList = ({ navigation }: any) => {
  const { styles } = useStyle();
  const { t } = useTranslation();
  const { selectedDairy } = useAppSelector(state => state.dairy);
  const [fetchParties, result] = useLazyFetchPartiesQuery();
  const onEndReachedCalledDuringMomentumRef = useRef(false);
  const [page, setPage] = useState(1);
  const [parties, setParties] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { data, isFetching, isLoading, isSuccess } = result;
  const [searchText, setSearchText] = useState('');

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: t('HeaderTitle.AllParties'),
      headerRight: () => (
        <TouchableOpacity
          style={styles.rightIcon}
          onPress={() => {
            navigation.navigate(ROUTES.importContacts);
          }}>
          <SVG.importIcon />
        </TouchableOpacity>
      ),
    });
  }, [navigation, styles, t]);

  useEffect(() => {
    if (data?.Data && !isLoading && isSuccess) {
      if (page > 1) {
        if (size(data?.Data) > 0) {
          const newParties = [...parties, ...data?.Data];
          setParties(newParties);
        } else {
          setIsLoaded(true);
        }
      } else {
        const newParties = data?.Data;
        setParties(newParties);
      }
    }
  }, [result?.data?.Data]);

  useEffect(() => {
    fetchParties(
      getFormData({
        nDairyid: selectedDairy?.nDairyid,
        PageNum: page,
        PageSize: 10,
        PartyType: 'A',
      }),
    );
  }, [page, selectedDairy]);

  const onPartyPress = (item: any) => {
    navigation.navigate(ROUTES.partyForm, {
      mode: 'edit',
      partyData: {
        id: item?.nPartyid,
        name: item?.cPartynm,
        mobileNo: item?.cMobile,
        type: item?.PartyType,
      },
    });
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
    if (!isLoading) {
      return <EmptyView contentName={'Parties'} />;
    }
    return <></>;
  };

  const onRefreshPartyList = () => {
    fetchParties(
      getFormData({
        nDairyid: selectedDairy?.nDairyid,
        PageNum: 1,
        PageSize: 10,
      }),
    );
  };

  const onAddPartyPress = () => {
    navigation.navigate(ROUTES.partyForm, {
      mode: 'create',
    });
  };

  const renderBottomLoader = () => {
    if (!isEmpty(parties) && isFetching) {
      return <BottomLoader />;
    }
    return <></>;
  };

  const handleLoadMore = () => {
    if (isLoaded || isEmpty(parties) || isFetching) {
      return;
    }
    setPage(p => p + 1);
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
        <SearchBar
          containerStyle={styles.searchBarContainer}
          onSearch={handleSearch}
        />
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
            if (!onEndReachedCalledDuringMomentumRef.current) {
              handleLoadMore();
              onEndReachedCalledDuringMomentumRef.current = true;
            }
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          title={t('Buttons.AddParty')}
          onPress={onAddPartyPress}
          radius={100}
          leftIcon={
            <Svg.userPlusIcon width={24} height={24} fill={COLORS.white} />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default PartyList;
