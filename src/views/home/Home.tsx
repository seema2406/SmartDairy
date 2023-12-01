import React, { useEffect, useState } from 'react';
import { useStyle } from './HomeStyle';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import SVG from '../../assets/svg';
import KPICard from './components/kpiCard/KPICard';
import MenuItem from '../../components/menuItem/MenuItem';
import SearchBar from '../../components/searchBar/SearchBar';
import AppButton from '../../components/button/AppButton';
import { COLORS } from '../../theme';
import { useLazyGetDashboardQuery } from '../../services/partyService';
import { getFormData } from '../../helpers/utils';
import { useAppSelector } from '../../hooks/useRedux';
import { ROUTES } from '../../constants/routeConstant';
import EmptyView from '../../components/emptyView/EmptyView';
import { cloneDeep, filter, includes, size } from 'lodash';
import PartyItem from '../../components/partyItem/PartyItem';
import { ScrollView } from 'react-native-gesture-handler';

const Home = ({ navigation }: any) => {
  const styles = useStyle();
  const [getDashboard, result] = useLazyGetDashboardQuery();
  const { data, isLoading } = result;
  const { t } = useTranslation();
  const { userID } = useAppSelector(state => state.auth);
  const { selectedDairy } = useAppSelector(state => state.dairy);
  const [parties, setParties] = useState<any>([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerRight: () => (
        <TouchableOpacity style={{}}>
          <SVG.settingIcon />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    setParties((size(data?.Data) > 0 && data?.Data[0]?.PurchaseLedger) || []);
  }, [data]);

  useEffect(() => {
    getDashboard(
      getFormData({ nDairyid: selectedDairy?.nDairyid, nUserid: userID }),
    );
  }, [selectedDairy?.nDairyid, userID]);

  const onAddPartyPress = () => {
    navigation.navigate(ROUTES.partyForm, {
      mode: 'create',
    });
  };

  const handleSearch = (text: string) => {
    const query = text.toLowerCase();
    if (query) {
      const listData = cloneDeep(data?.Data[0]?.PurchaseLedger);
      const filteredData = filter(listData, item => {
        const { cPartynm, cMobile } = item;
        if (
          includes(cPartynm.toLowerCase(), query) ||
          includes(cMobile.toLowerCase(), query)
        ) {
          return true;
        }
        return false;
      });
      setParties(filteredData);
    } else {
      const listData = cloneDeep(data?.Data[0]?.PurchaseLedger);
      setParties(listData);
    }
  };

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
    if (!isLoading && parties?.length > 0) {
      return <EmptyView contentName={'Parties'} />;
    }
    return <></>;
  };

  const onPressReport = () => {
    navigation.navigate(ROUTES.report);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollviewStyle}>
        <View style={styles.bodyContainer}>
          <KPICard
            data={(size(data?.Data) > 0 && data?.Data[0]?.CurrentSummary) || []}
          />
          <MenuItem
            name={t('AdminReports')}
            showBorder={true}
            onPressMenu={onPressReport}
          />
          <SearchBar
            containerStyle={styles.searchBarContainer}
            onSearch={handleSearch}
          />
          <FlatList
            scrollEnabled={false}
            data={parties || []}
            renderItem={renderItem}
            style={styles.listContainer}
            ItemSeparatorComponent={renderItemSeparator}
            ListEmptyComponent={renderEmptyView}
            refreshing={false}
            onEndReachedThreshold={0.01}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <AppButton
          title={t('Buttons.AddParty')}
          onPress={onAddPartyPress}
          radius={100}
          leftIcon={
            <SVG.userPlusIcon width={24} height={24} fill={COLORS.white} />
          }
        />
      </View>
    </View>
  );
};

export default Home;
