import React from 'react';
import { useStyle } from './ReportStyle';
import { View } from 'react-native';
import MenuItem from '../../components/menuItem/MenuItem';
import { useTranslation } from 'react-i18next';
import AppText from '../../components/text/AppText';
import { ROUTES } from '../../constants/routeConstant';

const Report = ({ navigation }: any) => {
  const styles = useStyle();
  const { t } = useTranslation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: t('HeaderTitle.Report'),
    });
  }, [navigation, styles, t]);

  const onPressDayBook = () => {
    navigation.navigate(ROUTES.dayBook);
  };

  const onPressVoucherBook = () => {
    navigation.navigate(ROUTES.voucherBook);
  };

  const onPressCashBook = () => {
    navigation.navigate(ROUTES.cashBook);
  };

  const onPressLedgerBook = () => {
    navigation.navigate(ROUTES.ledgerBook);
  };

  return (
    <View style={styles.container}>
      <MenuItem icon={'langIcon'} name={t('Menu.Profit&Loss')} showBG />
      <MenuItem
        icon={'userOutlineIcon'}
        name={t('Menu.DayBook')}
        showBG
        onPressMenu={onPressDayBook}
      />
      <MenuItem
        icon={'notificationIcon'}
        name={t('Menu.CashBook')}
        showBG
        onPressMenu={onPressCashBook}
      />
      <MenuItem
        icon={'subscriptionIcon'}
        name={t('Menu.PartyLedger')}
        showBG
        onPressMenu={onPressLedgerBook}
      />

      <MenuItem
        icon={'chatIcon'}
        name={t('Menu.VoucherBook')}
        showBG
        onPressMenu={onPressVoucherBook}
      />
      <MenuItem icon={'chatIcon'} name={t('Menu.BankBook')} showBG />
      <View style={styles.titleView}>
        <AppText size={16} fontWeight="medium" style={styles.title}>
          {t('AdminReports')}:
        </AppText>
      </View>
      <MenuItem icon={'chatIcon'} name={t('Menu.DairyCashBook')} showBG />
    </View>
  );
};

export default Report;
