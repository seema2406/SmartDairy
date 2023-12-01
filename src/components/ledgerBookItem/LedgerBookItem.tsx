import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useStyle } from './LedgerBookItemStyle';
import AppText from '../text/AppText';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { lowerCase } from 'lodash';

const LedgerBookItem = ({ data, onItemPress = () => {} }: any) => {
  const { styles, colors } = useStyle({});
  const { t } = useTranslation();

  return (
    <TouchableOpacity style={styles.container} key={1} onPress={onItemPress}>
      <View style={styles.innerContainer}>
        <View style={styles.topContainer}>
          <AppText
            size={18}
            fontWeight="medium"
            style={{ color: colors.blue75 }}>
            {moment(data?.dVrDate).format('DD-MMM-YYYY')}
          </AppText>
          <AppText
            size={24}
            fontWeight="medium"
            style={{ color: data?.Debit > 0 ? colors.textRed : colors.green }}>
            {data?.Debit + data?.Credit}
          </AppText>
        </View>
        <AppText
          size={18}
          fontWeight="medium"
          color={
            lowerCase(data?.VrType) == 'payment' ? colors.textRed : colors.green
          }>
          {data?.VrType || 'N/A'}
        </AppText>
        <AppText
          size={14}
          fontWeight="medium"
          color={colors.black}
          style={styles.labelStyle}>
          {data?.nBankid === 0 ? 'Cash' : 'Bank'}
        </AppText>
        {data?.Item && (
          <AppText size={14} fontWeight="medium" color={colors.black}>
            {data?.Item}
          </AppText>
        )}
        <View style={styles.bottomRow}>
          {data?.Narr && (
            <AppText
              size={14}
              fontWeight="medium"
              color={colors.black}
              textTransform="capitalize">
              {data?.Narr}
            </AppText>
          )}
          <View>
            <AppText size={14} fontWeight="medium" color={colors.black}>
              Balance after
            </AppText>
            <AppText
              size={24}
              fontWeight="medium"
              style={{
                color: data?.IND == 'CR' ? colors.green : colors.textRed,
              }}>
              {data?.Balance}
            </AppText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default LedgerBookItem;
