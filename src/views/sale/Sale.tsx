import React, { useEffect, useState } from 'react';
import { useStyle } from './SaleStyle';
import { SafeAreaView, View, useWindowDimensions } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import MilkTab from './components/MilkTab';
import OthersTab from './components/OthersTab';
import { useTranslation } from 'react-i18next';
import { useFetchTranVoucherMutation } from '../../services/reportService';
import { getFormData, showToaster } from '../../helpers/utils';
import { useGetPartyDetailMutation } from '../../services/partyService';

const Sale = (props: any) => {
  const { styles, colors } = useStyle();
  const layout = useWindowDimensions();
  const [fetchTranVoucher] = useFetchTranVoucherMutation();
  const [index, setIndex] = React.useState(0);
  const { t } = useTranslation();
  const [routes] = useState([
    { key: 'milk', title: t('HeaderTitle.Milk') },
    { key: 'others', title: t('HeaderTitle.Others') },
  ]);
  const cBatchno: any = props?.route?.params?.cBatchno;
  const nPartyid = props?.route?.params?.nPartyid;
  const nDairyid = props?.route?.params?.nDairyid;
  const [selectedData, setSelectedData] = useState<any>(null);
  const [getPartyDetail] = useGetPartyDetailMutation();

  useEffect(() => {
    if (cBatchno) {
      fetchTranVoucher(getFormData({ cBatchno })).then((res: any) => {
        if (!res?.data?.Data) {
          const message = res?.data?.message || t('Errors.CommonError');
          showToaster(message, 'E');
        } else {
          setSelectedData(res?.data?.Data[0]);
          setIndex(res?.data?.Data?.[0]?.itemtype === 'USERITEM' ? 1 : 0);
        }
      });
    }
    if (nPartyid && nDairyid) {
      const payload = {
        nPartyid: nPartyid,
        nDairyid: nDairyid,
      };
      fethcPartyDetails(payload);
    }
  }, [cBatchno, nPartyid, nDairyid]);

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

  const goBack = () => {
    if (cBatchno) {
      props?.navigation.goBack();
      props?.route?.params?.params?.onRefresh();
    }
  };

  const renderScene = ({ route, jumpTo }: any) => {
    switch (route.key) {
      case 'milk':
        return (
          <MilkTab
            {...props}
            data={selectedData}
            goBack={goBack}
            cBatchno={cBatchno}
          />
        );
      case 'others':
        return (
          <OthersTab
            {...props}
            data={selectedData}
            goBack={goBack}
            cBatchno={cBatchno}
          />
        );
    }
  };

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: colors.primary }}
      style={{ backgroundColor: colors.white }}
      activeColor={colors.primary}
      inactiveColor={colors.textGray}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  );
};

export default Sale;
