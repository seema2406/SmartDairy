import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useStyle } from './CustomPriceStyle';
import { ModalfyParams, UsableModalComponentProp } from 'react-native-modalfy';
import { Controller, useForm } from 'react-hook-form';
import { MODALS } from '../../../constants/routeConstant';
import { closeModal } from '../../../helpers/utils';
import AppText from '../../text/AppText';
import AppTextInput from '../../textInput/AppTextInput';
import { customPriceSchema } from '../../../helpers/yupHelper';
import { useTranslation } from 'react-i18next';
import { COLORS } from '../../../theme';
import AppButton from '../../button/AppButton';

interface Props {
  modal: UsableModalComponentProp<ModalfyParams, keyof ModalfyParams>;
}

const CustomPrice: React.FC<Props> = ({ modal: { params } }) => {
  const { styles } = useStyle();
  const { item, callback = () => {}, from } = params;
  const { t } = useTranslation();

  const { handleSubmit, control } = useForm<any, any>({
    resolver: customPriceSchema,
    mode: 'onBlur',
    defaultValues: {
      sale: item?.nSRate?.toString() || '',
      purchase: item?.nPRate?.toString() || '',
    },
  });

  const onClose = useCallback(() => {
    closeModal(MODALS.customPrice);
  }, []);

  const onSavePress = (data: any) => {
    if (callback) {
      onClose();
      callback({ ...item, nSRate: data?.sale, nPRate: data?.purchase });
    }
  };
  return (
    <View style={styles.container}>
      <AppText size={16} color={COLORS.primary}>
        {from === 'party'
          ? t('SetCustomPrice')
          : `${t('CustomPrice')} ${item?.cPartyNm}`}
      </AppText>
      <View style={styles.body}>
        <View style={styles.width40}>
          <Controller
            control={control}
            name="sale"
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => (
              <AppTextInput
                label={t('Labels.SaleRate')}
                value={value}
                placeholder={t('Labels.SaleRate')}
                onChangeText={onChange}
                onBlur={onBlur}
                error={error?.message}
                prefix="₹"
                style={styles.inputStyle}
                prefixStyle={[styles.prefixStyle, styles.textRed]}
                labelStyle={styles.labelStyle}
                type="number"
              />
            )}
          />
        </View>
        <View style={styles.width40}>
          <Controller
            control={control}
            name="purchase"
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => (
              <AppTextInput
                label={t('Labels.PurchaseRate')}
                value={value}
                placeholder={t('Labels.PurchaseRate')}
                onChangeText={onChange}
                onBlur={onBlur}
                error={error?.message}
                prefix="₹"
                style={styles.inputStyle}
                prefixStyle={styles.prefixStyle}
                labelStyle={styles.labelStyle}
                type="number"
              />
            )}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          title={t('Buttons.Save')}
          onPress={handleSubmit(onSavePress)}
          radius={5}
        />
      </View>
    </View>
  );
};

export default CustomPrice;
