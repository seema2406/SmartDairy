import React, { useEffect, useRef, useState } from 'react';
import { useStyle } from './ReceiptStyle';
import { TextInput, View } from 'react-native';
import {
  useGetPartyDetailMutation,
  useGetPartySearchMutation,
  useLazyFetchPartiesQuery,
} from '../../services/partyService';
import { useAppSelector } from '../../hooks/useRedux';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../../constants/routeConstant';
import { getFormData, showToaster } from '../../helpers/utils';
import { size } from 'lodash';
import TabContentViewPR from '../../components/tabContentViewPR/TabContentViewPR';
import { useFetchTranVoucherMutation } from '../../services/reportService';

const Receipt = ({ navigation, route }: any) => {
  const styles = useStyle();
  const [searchParty] = useGetPartySearchMutation();
  const [getPartyDetail] = useGetPartyDetailMutation();
  const [fetchParties] = useLazyFetchPartiesQuery();
  const [fetchTranVoucher] = useFetchTranVoucherMutation();
  const { selectedDairy } = useAppSelector(state => state.dairy);
  const [searchedData, setSearchedData] = useState<any>([]);
  const [selectedData, setSelectedData] = useState<any>(null);
  const inputRef = useRef<TextInput>(null);
  const { t } = useTranslation();
  const [bankList, setBankList] = useState([]);
  const cBatchno: any = route?.params?.cBatchno;

  useEffect(() => {
    if (cBatchno) {
      fetchTranVoucher(getFormData({ cBatchno })).then((res: any) => {
        if (!res?.data?.Data) {
          const message = res?.data?.message || t('Errors.CommonError');
          showToaster(message, 'E');
        } else {
          setSelectedData(res?.data?.Data[0]);
          fetchBanks();
        }
      });
    }
  }, [cBatchno, t]);

  const goBack = () => {
    if (cBatchno) {
      navigation.goBack();
      route?.params?.onRefresh();
    } else {
      setSelectedData(null);
    }
  };

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
        PartyType: 'A',
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
        fetchBanks();
      }
    });
  };

  const fetchBanks = () => {
    const reqPayload = {
      PartyType: 'B',
      nDairyid: selectedDairy?.nDairyid,
      PageNum: 1,
      PageSize: 10,
    };
    fetchParties(getFormData(reqPayload)).then((res: any) => {
      if (!res?.data?.Data) {
        setBankList([]);
      } else {
        setBankList(res?.data?.Data);
      }
    });
  };

  return (
    <View style={styles.container}>
      <TabContentViewPR
        onAdd={onAddPress}
        onEdit={onEditPress}
        onSearch={onSearch}
        searchedData={searchedData}
        data={selectedData || null}
        onSearchItemPress={onSearchItemPress}
        inputRef={inputRef}
        rateValue={selectedData?.PRate || 0}
        from={'R'}
        bankList={bankList}
        goBack={goBack}
        cBatchno={cBatchno}
      />
    </View>
  );
};

export default Receipt;
