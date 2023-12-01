import React, { useEffect, useRef, useState } from 'react';
import { useStyle } from '../PurchaseStyle';
import { TextInput, View } from 'react-native';
import {
  useGetPartyDetailMutation,
  useGetPartySearchMutation,
} from '../../../services/partyService';
import { useAppSelector } from '../../../hooks/useRedux';
import { getFormData, showToaster } from '../../../helpers/utils';
import TabContentView from '../../../components/tabContentView/TabContentView';
import { size } from 'lodash';
import { ROUTES } from '../../../constants/routeConstant';
import { useTranslation } from 'react-i18next';

const MilkTab = ({ navigation, data, cBatchno, goBack }: any) => {
  const { styles } = useStyle();
  const [searchParty] = useGetPartySearchMutation();
  const [getPartyDetail] = useGetPartyDetailMutation();
  const { selectedDairy } = useAppSelector(state => state.dairy);
  const [searchedData, setSearchedData] = useState<any>([]);
  const [selectedData, setSelectedData] = useState<any>(null);
  const inputRef = useRef<TextInput>(null);
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

  const onSearchItemPress = (item: any) => {
    inputRef?.current?.blur?.();
    inputRef?.current?.setNativeProps?.({ text: item?.cPartynm });
    const payload = {
      nPartyid: item?.nPartyid,
      nDairyid: selectedDairy?.nDairyid,
    };
    fethcPartyDetails(payload);
  };

  const fethcPartyDetails = (payload: any) => {
    getPartyDetail(getFormData(payload)).then((res: any) => {
      if (!res?.data?.Data) {
        const message = res?.data?.message || t('Errors.CommonError');
        showToaster(message, 'E');
      } else {
        setSelectedData(res?.data?.Data[0]);
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
        rateValue={selectedData?.PRate || 0}
        from={'P'}
        goBack={goBack}
        cBatchno={cBatchno}
        showSearchBar={false}
      />
    </View>
  );
};

export default MilkTab;
