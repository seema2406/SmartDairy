import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useStyle } from './VoucherBookItemStyle';
import AppText from '../text/AppText';
import moment from 'moment';

const VoucherBookItem = ({ data, key, onItemPress = () => {} }: any) => {
  const { styles, colors } = useStyle({});

  const getTextColor = (type: string) => {
    return type === 'PURCHASE' || type === 'PAYMENT'
      ? colors.textRed
      : colors.textGreen;
  };

  return (
    <TouchableOpacity style={styles.container} key={key} onPress={onItemPress}>
      <View style={styles.innerContainer}>
        <View style={styles.topContainer}>
          <View>
            <AppText size={12} fontWeight="medium" color={colors.blue75}>
              {moment(data?.Vrtime, 'hh:mm:ss').format('hh:mm')}
            </AppText>
            <AppText size={14} fontWeight="medium" color={colors.blue75}>
              {data?.VrType}
            </AppText>
          </View>
          <AppText
            size={24}
            fontWeight="medium"
            color={getTextColor(data?.VrType)}>
            {data?.TranAmt}
          </AppText>
        </View>
        <AppText size={16} fontWeight="medium" color={colors.blue75}>
          {data?.party}
        </AppText>
        <AppText
          size={14}
          fontWeight="medium"
          color={getTextColor(data?.VrType)}>
          {data?.TranDetail}
        </AppText>
      </View>
    </TouchableOpacity>
  );
};

export default VoucherBookItem;
