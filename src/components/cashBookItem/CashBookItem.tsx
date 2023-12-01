import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useStyle } from './CashBookItemStyle';
import AppText from '../text/AppText';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { lowerCase } from 'lodash';

const CashBookItem = ({ data, onItemPress = () => {} }: any) => {
  const { styles, colors } = useStyle({});
  const { t } = useTranslation();

  return (
    <TouchableOpacity style={styles.container} onPress={onItemPress}>
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
            style={{
              color:
                lowerCase(data?.VrType) === 'payment'
                  ? colors.textRed
                  : colors.green,
            }}>
            {data?.TranAmt}
          </AppText>
        </View>
        <AppText size={18} fontWeight="medium" color={colors.blue75}>
          {data?.VrType || 'N/A'}
        </AppText>
        <AppText
          size={14}
          fontWeight="medium"
          color={
            lowerCase(data?.VrType) === 'payment'
              ? colors.textRed
              : colors.green
          }>
          {data?.party}
        </AppText>
        <AppText size={14} fontWeight="medium" color={colors.black}>
          {data?.remarks}
        </AppText>
      </View>
    </TouchableOpacity>
  );
};

export default CashBookItem;
