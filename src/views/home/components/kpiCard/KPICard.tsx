import React from 'react';
import { useStyle } from './KPICardStyle';
import { View } from 'react-native';
import AppText from '../../../../components/text/AppText';
import { useTranslation } from 'react-i18next';
import { find } from 'lodash';
import { COLORS } from '../../../../theme';

type DataType = {
  Amt: number;
  Avgfat: number;
  Qty: number;
  vrtype: string;
};
const KPICard = (props: any) => {
  const { styles, colors } = useStyle();
  const { t } = useTranslation();
  const data: Array<DataType> = props?.data;

  const getData = (type: string) => {
    const filteredData = find(data, (item: DataType) => item?.vrtype === type);
    return filteredData;
  };

  const purchase = getData('Purchase');
  const sale = getData('Sales');
  const collection = getData('Receipts');
  const payment = getData('Payment');
  const totalQty =
    (purchase?.Qty ? purchase?.Qty : 0) - (sale?.Qty ? sale?.Qty : 0);
  const totalAmt =
    (collection?.Qty ? collection?.Qty : 0) - (payment?.Qty ? payment?.Qty : 0);

  return (
    <View style={styles.kpiContainer}>
      <View style={styles.kpiRowItem}>
        <View style={styles.kpiItem}>
          <AppText size={16} fontWeight="italic" color={COLORS.blueShade}>
            {t('Purchase')}
          </AppText>
          <AppText size={16} fontWeight="bold">
            {purchase?.Qty} Ltr.
          </AppText>
          <AppText size={14} fontWeight="italic" color={COLORS.textOrange}>
            {purchase?.Amt}
          </AppText>
        </View>
        <View style={styles.kpiItem}>
          <AppText size={16} fontWeight="italic" color={COLORS.blueShade}>
            {t('Sale')}
          </AppText>
          <AppText size={16} fontWeight="bold">
            {sale?.Qty} Ltr.
          </AppText>
          <AppText size={14} fontWeight="italic" color={COLORS.textGreen}>
            {sale?.Amt}
          </AppText>
        </View>
        <View style={styles.kpiItem}>
          <AppText size={14} fontWeight="italic" color={COLORS.blueShade}>
            {t('Balance')} ({purchase?.Avgfat})
          </AppText>
          <AppText
            size={16}
            fontWeight="bold"
            color={totalQty < 0 ? colors.textRed : colors.textGreen}>
            {totalQty} Ltr.
          </AppText>
        </View>
      </View>
      <View style={styles.kpiRowItem}>
        <View style={styles.kpiItem}>
          <AppText size={16} fontWeight="italic" color={COLORS.blueShade}>
            {t('Collection')}
          </AppText>
          <AppText size={16} fontWeight="bold">
            {collection?.Amt}
          </AppText>
        </View>
        <View style={styles.kpiItem}>
          <AppText size={16} fontWeight="italic" color={COLORS.blueShade}>
            {t('Payment')}
          </AppText>
          <AppText size={16} fontWeight="bold">
            {payment?.Amt}
          </AppText>
        </View>
        <View style={styles.kpiItem}>
          <AppText size={16} fontWeight="italic" color={COLORS.blueShade}>
            {t('CashInHand')}
          </AppText>
          <AppText
            size={16}
            fontWeight="bold"
            color={totalQty < 0 ? colors.textRed : colors.textGreen}>
            {totalAmt}
          </AppText>
        </View>
      </View>
    </View>
  );
};

export default KPICard;
