import React, { useEffect, useState } from 'react';
import { useOtpVerificationStyle } from './OtpVerificationStyle';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';
import WrapperView from '../../components/wrapperView/WrapperView';
import { ROUTES } from '../../constants/routeConstant';
import AppText from '../../components/text/AppText';
import {
  CodeField,
  Cursor,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { removeListener, startOtpListener } from 'react-native-otp-verify';
import { RESEND_TIME } from '../../constants/constants';
import { size } from 'lodash';
import { useTranslation } from 'react-i18next';
import { getFormData, showToaster } from '../../helpers/utils';
import { useVerifyOtpMutation } from '../../services/authService';
import { setDeviceId, setUserId } from '../../config/apiConfig';

interface Props {
  navigation?: any;
  route?: any;
}

const OtpVerification = ({ navigation, route }: Props) => {
  const styles = useOtpVerificationStyle();
  const keyboardVerticalOffset = StatusBar?.currentHeight || 0;
  const { t } = useTranslation();
  const { phone_number, otpId, deviceId } = route?.params;
  const [resendTime, setResendTime] = useState<number>(RESEND_TIME);
  const [value, setValue] = useState('');
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [verifyOtp] = useVerifyOtpMutation();

  useEffect(() => {
    startOtpListener(message => {
      // extract the otp using regex e.g. the below regex extracts 4 digit otp from message
      if (message) {
        const messageRead = /(\d{4})/g.exec(message) || [];
        if (size(messageRead) > 1) {
          const otp = messageRead[1];
          setValue(otp);
        }
      }
    });
    return () => removeListener();
  }, []);

  useEffect(() => {
    size(value) === 6 && onOtpVerifyPress();
  }, [value]);

  useEffect(() => {
    if (resendTime > 0) {
      setTimeout(() => {
        setResendTime(time => --time);
      }, 1000);
    }
  }, [resendTime, setResendTime]);

  const onOtpVerifyPress = () => {
    if (size(value) !== 6) {
      showToaster(t('Validations.OTPRequired'), 'E');
      return;
    }
    setResendTime(0);
    const reqPayload = {
      OTPid: otpId,
      cDeviceid: deviceId,
      FirebaseToken: 'ERER12122rsdjwjwdwfef',
      cOTP: value,
    };
    const formData = getFormData(reqPayload);
    verifyOtp(formData).then((res: any) => {
      if (res?.data?.Data && res?.data?.Data[0]?.nUserid) {
        showToaster('OTP verified successfully', 'S');
        setUserId(res?.data?.Data[0]?.nUserid);
        setDeviceId(deviceId);
        navigation.navigate(ROUTES.createDairy, {
          phone_number,
          from: 'OTPVerification',
        });
      } else {
        showToaster(res?.data?.message, 'E');
      }
    });
  };

  const onResendOTPPress = () => {
    setResendTime(RESEND_TIME);
  };

  const onChangePhonePress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        contentContainerStyle={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={keyboardVerticalOffset}
        enabled={false}>
        <WrapperView
          wKey={4}
          title={t('HeaderTitle.PhoneVerification')}
          subTitle={t('OTPVerification')}
          onButtonPress={onOtpVerifyPress}>
          <AppText size={16} style={styles.subTitile}>
            {t('AuthText')} {'\n'} (+91) {phone_number}
          </AppText>
          <CodeField
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={6}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <View key={index} style={styles.cellContainer}>
                <AppText
                  key={index}
                  style={[styles.cell]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </AppText>
                <View key={index + 1} style={isFocused && styles.focusCell} />
              </View>
            )}
          />
          {resendTime > 0 && (
            <AppText size={16} fontWeight="medium" style={styles.timer}>
              {resendTime} {t('SecLeft')}
            </AppText>
          )}
          {resendTime <= 0 && (
            <View style={styles.flexView}>
              <AppText size={16} style={styles.text}>
                {t('OTPText')}{' '}
              </AppText>
              <Pressable onPress={onResendOTPPress}>
                <AppText size={16} fontWeight="bold" style={styles.resendCode}>
                  {t('Buttons.ResendCode')}
                </AppText>
              </Pressable>
            </View>
          )}
          <Pressable
            onPress={onChangePhonePress}
            style={styles.changeMobileView}>
            <AppText size={14} fontWeight="medium" style={styles.changeMobile}>
              {t('Buttons.ChangeMobileNumber')}
            </AppText>
          </Pressable>
        </WrapperView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OtpVerification;
