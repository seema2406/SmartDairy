import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useStyle } from './DayBookItemStyle';
import AppText from '../text/AppText';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { size } from 'lodash';

const DayBookItem = ({ key, data, onItemPress = () => {} }: any) => {
  const { styles, colors } = useStyle({});
  const { t } = useTranslation();
  const { VrDate, WorkShift } = data;
  const { Trade, Cash, Bank } = WorkShift?.[0];

  const getTextColor = (type: string) => {
    return type === 'PURCHASE'
      ? { color: colors.textRed }
      : { color: colors.textGreen };
  };

  return (
    <TouchableOpacity style={styles.container} key={key} onPress={onItemPress}>
      <View style={styles.innerContainer}>
        <View style={styles.topContainer}>
          <AppText
            size={18}
            fontWeight="medium"
            style={{ color: colors.blue75 }}>
            {moment(VrDate).format('DD-MMM-YYYY')}
          </AppText>
        </View>
        {size(Trade) > 0 ? (
          <View style={styles.paddingTop15}>
            <AppText size={18} fontWeight="medium" color={colors.blue75}>
              {t('Trade')}
            </AppText>
            <View style={styles.rowHeader}>
              <AppText
                fontWeight="bold"
                style={[styles.rowTitle, styles.flex2]}>
                ITEM
              </AppText>
              <AppText fontWeight="bold" style={styles.rowTitle}>
                QTY
              </AppText>
              <AppText fontWeight="bold" style={styles.rowTitle}>
                RATE
              </AppText>
              <AppText fontWeight="bold" style={styles.rowTitle}>
                AMOUNT
              </AppText>
            </View>
            {Trade.map((item: any, index: number) => {
              return (
                <View style={styles.itemRow} key={index}>
                  <AppText
                    fontWeight="bold"
                    style={[
                      styles.rowText,
                      styles.flex2,
                      getTextColor(item?.VrType),
                    ]}>
                    {`${item?.VrType === 'PURCHASE' ? 'P' : 'S'}: ${
                      item?.Item
                    } ${item?.AvgFat > 0 ? '(' + item?.AvgFat + ')' : ''}`}
                  </AppText>
                  <AppText
                    fontWeight="bold"
                    style={[styles.rowText, getTextColor(item?.VrType)]}>
                    {item?.Qty}
                  </AppText>
                  <AppText
                    fontWeight="bold"
                    style={[styles.rowText, getTextColor(item?.VrType)]}>
                    {item?.AvgRate}
                  </AppText>
                  <AppText
                    fontWeight="bold"
                    style={[styles.rowText, getTextColor(item?.VrType)]}>
                    {item?.Amount}
                  </AppText>
                </View>
              );
            })}
          </View>
        ) : null}
        {Cash ? (
          <View style={styles.paddingTop15}>
            <AppText size={18} fontWeight="medium" color={colors.blue75}>
              {t('Cash')}
            </AppText>
            <View style={styles.rowHeader}>
              <AppText
                fontWeight="bold"
                style={[styles.rowTitle, styles.flex_1_2]}>
                OP BAL
              </AppText>
              <AppText
                fontWeight="bold"
                style={[styles.rowTitle, styles.flex_1_4]}>
                PAYMENTS
              </AppText>
              <AppText
                fontWeight="bold"
                style={[styles.rowTitle, styles.flex_1_4]}>
                RECEIPTS
              </AppText>
              <AppText fontWeight="bold" style={styles.rowTitle}>
                CL BAL
              </AppText>
            </View>
            {Cash.map((item: any, index: number) => {
              return (
                <View style={styles.itemRow} key={index}>
                  <AppText
                    fontWeight="bold"
                    style={[styles.rowText, styles.flex_1_2]}>
                    {item?.OpeningCash}
                  </AppText>
                  <AppText
                    fontWeight="bold"
                    style={[styles.rowText, styles.flex_1_4]}>
                    {item?.Payment}
                  </AppText>
                  <AppText
                    fontWeight="bold"
                    style={[styles.rowText, styles.flex_1_4]}>
                    {item?.Receipt}
                  </AppText>
                  <AppText fontWeight="bold" style={styles.rowText}>
                    {item?.ClosingCash}
                  </AppText>
                </View>
              );
            })}
          </View>
        ) : null}
        {Bank ? (
          <View style={styles.paddingTop15}>
            <AppText size={18} fontWeight="medium" color={colors.blue75}>
              {t('Bank')}
            </AppText>
            <View style={styles.rowHeader}>
              <AppText
                fontWeight="bold"
                style={[styles.rowTitle, styles.flex_1_2]}>
                OP BAL
              </AppText>
              <AppText
                fontWeight="bold"
                style={[styles.rowTitle, styles.flex_1_4]}>
                PAYMENTS
              </AppText>
              <AppText
                fontWeight="bold"
                style={[styles.rowTitle, styles.flex_1_4]}>
                RECEIPTS
              </AppText>
              <AppText fontWeight="bold" style={styles.rowTitle}>
                CL BAL
              </AppText>
            </View>
            {Bank.map((item: any, index: number) => {
              return (
                <View style={styles.itemRow} key={index}>
                  <AppText
                    fontWeight="bold"
                    style={[styles.rowText, styles.flex_1_2]}>
                    {item?.OpeningCash}
                  </AppText>
                  <AppText
                    fontWeight="bold"
                    style={[styles.rowText, styles.flex_1_4]}>
                    {item?.Payment}
                  </AppText>
                  <AppText
                    fontWeight="bold"
                    style={[styles.rowText, styles.flex_1_4]}>
                    {item?.Receipt}
                  </AppText>
                  <AppText fontWeight="bold" style={styles.rowText}>
                    {item?.ClosingCash}
                  </AppText>
                </View>
              );
            })}
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default DayBookItem;
