import React, { useEffect, useState } from 'react';
import { useStyle } from './StaffListStyle';
import { SafeAreaView, View } from 'react-native';
import SearchBar from '../../components/searchBar/SearchBar';
import { FlatList } from 'react-native-gesture-handler';
import EmptyView from '../../components/emptyView/EmptyView';
import { useTranslation } from 'react-i18next';
import { getFormData, showToaster } from '../../helpers/utils';
import AppButton from '../../components/button/AppButton';
import Svg from '../../assets/svg';
import { COLORS } from '../../theme';
import { ROUTES } from '../../constants/routeConstant';
import { filter, includes } from 'lodash';
import { useAppSelector } from '../../hooks/useRedux';
import {
  useAddCoUserMutation,
  useLazyFetchCoUserQuery,
} from '../../services/authService';
import StaffItem from '../../components/staffItem/StaffItem';

const StaffList = ({ navigation }: any) => {
  const { styles } = useStyle();
  const { t } = useTranslation();
  const { userID } = useAppSelector(state => state.auth);
  const [searchText, setSearchText] = useState('');
  const [updateUser] = useAddCoUserMutation();
  const [fetchUsers, result] = useLazyFetchCoUserQuery();
  const { data, isLoading } = result;
  const usersList = data?.Data || [];

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: t('HeaderTitle.StaffList'),
    });
  }, [navigation, t]);

  useEffect(() => {
    fetchUsers(getFormData({ puserid: userID }));
  }, [userID]);

  const onAddStaffPress = () => {
    navigation.navigate(ROUTES.staffForm, {
      mode: 'create',
    });
  };

  const onStaffPress = (item: any) => {
    navigation.navigate(ROUTES.staffForm, {
      mode: 'edit',
      staffData: item,
    });
  };

  const onStatusPress = (item: any) => {
    const payload = {
      cUserNm: item?.cUserNm,
      cMobile: item?.cMobile,
      Puserid: userID,
      Perm: item?.Perm,
      Status: item?.Status === 'A' || item?.Status === 'P' ? 'I' : 'A',
      nUserid: item?.nUserid,
    };

    updateUser(getFormData(payload)).then((res: any) => {
      if (res?.data?.success) {
        showToaster('Staff user updated successfully', 'S');
      } else {
        showToaster(res?.data?.message || 'Something went wrong', 'E');
      }
    });
  };

  const renderItem = ({ item }: any) => {
    return (
      <StaffItem
        id={item?.nUserid}
        name={item?.cUserNm}
        mobile={item?.cMobile}
        status={item?.Status}
        onItemPress={() => {
          onStaffPress(item);
        }}
        onStatusPress={() => {
          onStatusPress(item);
        }}
      />
    );
  };

  const renderItemSeparator = () => <View style={styles.itemSeparator} />;

  const renderEmptyView = () => {
    if (!isLoading) {
      return <EmptyView contentName={'Staff'} />;
    }
    return <></>;
  };

  const onRefreshList = () => {
    fetchUsers(getFormData({ puserid: userID }));
  };

  const handleSearch = (text: string) => {
    const query = text.toLowerCase();
    setSearchText(query);
  };

  const getFilterData = () => {
    if (searchText) {
      return filter(usersList, item => {
        return (
          includes(item?.cUserNm?.toLowerCase(), searchText) ||
          includes(item?.cMobile?.toLowerCase(), searchText)
        );
      });
    }
    return usersList;
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
          title={t('Buttons.AddStaff')}
          onPress={onAddStaffPress}
          radius={5}
          leftIcon={
            <Svg.addPlusIcon width={18} height={18} fill={COLORS.white} />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default StaffList;
