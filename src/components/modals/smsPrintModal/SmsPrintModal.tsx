import React, { useCallback } from 'react';
import { View, Pressable } from 'react-native';
import { ModalfyParams, UsableModalComponentProp } from 'react-native-modalfy';
import { useStyle } from './SmsPrintModalStyle';
import AppButton from '../../button/AppButton';
import { COLORS } from '../../../theme';
import AppText from '../../text/AppText';
import SVGIcon from '../../../assets/svg';

interface Props {
  modal: UsableModalComponentProp<ModalfyParams, keyof ModalfyParams>;
}

const SmsPrintModal: React.FC<Props> = ({ modal: { params } }) => {
  const { styles } = useStyle({});
  const onClose = useCallback(() => {
    if (params?.onClosePress) {
      params?.onClosePress();
    }
  }, []);

  const smsPress = () => {
    console.log('sms')
    if (params?.onSmsPress) {
      params?.onSmsPress();
    }
  };

  const printPress = () => {
    console.log('print>>>');
    if (params?.onPrintPress) {
      params?.onPrintPress();
    }
  };

  return (
    <View style={styles.modalStyle}>
      <View style={styles.modalContainer}>
        <View style={styles.headerContainer}>
          <AppText size={16} fontWeight="medium">
            {'Choose Send SMS or Print ?'}
          </AppText>
          <Pressable style={styles.cancelIcon} onPress={onClose}>
            <SVGIcon.closeIcon fill={COLORS.black} width={14} height={14} />
          </Pressable>
        </View>
        <View style={styles.contentContainer}>
          <AppText>{params?.message}</AppText>
        </View>

        <View style={styles.buttonContainer}>
          <AppButton
            type="outlined"
            labelStyle={styles.buttonLabel}
            title="SMS"
            onPress={smsPress}
            style={styles.button}
          />
          <AppButton
            labelStyle={styles.buttonLabel}
            title="Print"
            style={styles.button}
            onPress={printPress}
          />
        </View>
      </View>
    </View>
  );
};

export default SmsPrintModal;
