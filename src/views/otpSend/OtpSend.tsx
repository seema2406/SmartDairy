import React from 'react';
import { useOtpSendStyle } from './OtpSendStyle';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { ROUTES } from '../../constants/routeConstant';
import WrapperView from '../../components/wrapperView/WrapperView';
import AppTextInput from '../../components/textInput/AppTextInput';
import { useTranslation } from 'react-i18next';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { phoneFormSchema } from '../../helpers/yupHelper';
import { getUniqueId } from 'react-native-device-info';
import { useRegisterUserMutation } from '../../services/authService';
import { getFormData, showToaster } from '../../helpers/utils';
import { size } from 'lodash';

interface Props {
  navigation?: any;
  route?: any;
}

const OtpSend = ({ navigation, route }: Props) => {
  const styles = useOtpSendStyle();

  const { role } = route?.params;

  const { t } = useTranslation();
  const keyboardVerticalOffset = StatusBar?.currentHeight || 0;

  const [registerUser] = useRegisterUserMutation();
  const { handleSubmit, control, getValues } = useForm<FieldValues, any>({
    resolver: phoneFormSchema,
    mode: 'onBlur',
    defaultValues: {
      phone_number: '',
    },
  });

  const onSendOtpPress = async () => {
    const { phone_number } = getValues();
    const deviceId = await getUniqueId();
    const formData = getFormData({
      cMobile: phone_number,
      cDeviceid: deviceId,
      Parent: role,
    });
    registerUser(formData).then((res: any) => {
      if (size(res?.data?.Data) > 0 && res?.data?.Data[0]?.OTPid) {
        navigation.navigate(ROUTES.otpVerification, {
          otpId: res?.data?.Data[0]?.OTPid,
          deviceId: deviceId,
          phone_number: phone_number,
        });
      } else {
        showToaster(res?.data?.message || 'Something went wrong', 'E');
      }
    });
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
          wKey={3}
          title={t('HeaderTitle.Register')}
          subTitle={t('GiveYourMobileNum')}
          onButtonPress={handleSubmit(onSendOtpPress)}>
          <Controller
            control={control}
            name="phone_number"
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => (
              <AppTextInput
                value={value}
                placeholder={t('Placeholders.MobileNumber')}
                style={styles.phoneNumber}
                onChangeText={onChange}
                onBlur={onBlur}
                error={error?.message}
                type="phone"
              />
            )}
          />
        </WrapperView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OtpSend;
