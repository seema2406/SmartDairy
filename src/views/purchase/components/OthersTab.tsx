import React, { useEffect, useRef, useState } from 'react';
import { useStyle } from '../PurchaseStyle';
import { View } from 'react-native';
import {
  useGetItemsMutation,
  useGetPartyDetailMutation,
  useGetPartySearchMutation,
} from '../../../services/partyService';
import { useAppSelector } from '../../../hooks/useRedux';
import { getFormData, showToaster } from '../../../helpers/utils';
import TabContentView from '../../../components/tabContentView/TabContentView';
import { size } from 'lodash';
import { TextInput } from 'react-native-gesture-handler';
import { ROUTES } from '../../../constants/routeConstant';
import { useTranslation } from 'react-i18next';

const OthersTab = ({ navigation, data, cBatchno, goBack }: any) => {
  const { styles } = useStyle();
  const [searchParty] = useGetPartySearchMutation();
  const [getPartyDetail] = useGetPartyDetailMutation();
  const { selectedDairy } = useAppSelector(state => state.dairy);
  const [searchedData, setSearchedData] = useState<any>([]);
  const [selectedData, setSelectedData] = useState<any>(null);
  const inputRef = useRef<TextInput>(null);
  const [getItems] = useGetItemsMutation();
  const [items, setItems] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    setSelectedData(data);
  }, [data]);

  const onAddPress = () => {
    navigation.navigate(ROUTES.partyForm, {
      mode: 'create',
    });
  };

  const onEditPress = () => {
    navigation.navigate(ROUTES.partyForm, {
      mode: 'edit',
      partyData: {
        id: selectedData?.nPartyid,
        name: selectedData?.cPartynm,
        mobileNo: selectedData?.cMobile,
        type: selectedData?.PartyType,
      },
      onRefresh: () => {
        const payload = {
          nPartyid: selectedData?.nPartyid,
          nDairyid: selectedDairy?.nDairyid,
        };
        fethcPartyDetails(payload);
      },
    });
  };

  const onSearch = (text: string) => {
    if (text) {
      const payload = {
        nDairyid: selectedDairy?.nDairyid,
        PartyStr: text,
        PartyType: 'T',
      };
      searchParty(getFormData(payload)).then((res: any) => {
        if (size(res?.data?.Data) > 0) {
          setSearchedData(res?.data?.Data);
        } else {
          setSearchedData([]);
        }
      });
    } else {
      setSearchedData([]);
    }
  };

  const fetchItems = (payload: any) => {
    getItems(getFormData(payload)).then((res: any) => {
      if (res?.data?.Data) {
        setItems(res?.data?.Data);
      }
    });
  };

  const onSearchItemPress = (item: any) => {
    inputRef?.current?.blur?.();
    inputRef?.current?.setNativeProps?.({ text: item?.cPartynm });
    const payload = {
      nPartyid: item?.nPartyid,
      nDairyid: selectedDairy?.nDairyid,
    };
    // const payload = { nPartyid: 1, nDairyid: 1 };
    fethcPartyDetails(payload);
  };

  const fethcPartyDetails = (payload: any) => {
    getPartyDetail(getFormData(payload)).then((res: any) => {
      if (!res?.data?.Data) {
        const message = res?.data?.message || t('Errors.CommonError');
        showToaster(message, 'E');
      } else {
        setSelectedData(res?.data?.Data[0]);
        const payload1 = {
          nDairyid: selectedDairy?.nDairyid,
          cType: res?.data?.Data[0]?.cType,
        };
        // const payload = {
        //   nDairyid: 8,
        //   cType: 'A',
        // };
        fetchItems(payload1);
      }
    });
  };

  const onSubmitPress = () => {};

  return (
    <View style={styles.container}>
      <TabContentView
        onAdd={onAddPress}
        onEdit={onEditPress}
        onSearch={onSearch}
        searchedData={searchedData}
        data={selectedData || null}
        onSubmit={onSubmitPress}
        onSearchItemPress={onSearchItemPress}
        inputRef={inputRef}
        tab="others"
        items={items}
        rateValue={selectedData?.PRate || 0}
        from={'P'}
        goBack={goBack}
        cBatchno={cBatchno}
        showSearchBar={false}
      />
    </View>
  );
};

export default OthersTab;
