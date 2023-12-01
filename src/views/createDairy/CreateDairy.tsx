import React, { useCallback, useEffect, useState } from 'react';
import { useCreateDairyStyle } from './CreateDairyStyle';
import WrapperView from '../../components/wrapperView/WrapperView';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { createDairyFormSchema } from '../../helpers/yupHelper';
import AppTextInput from '../../components/textInput/AppTextInput';
import Dropdown from '../../components/dropdown/Dropdown';
import {
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  useLazyCheckDeviceQuery,
  useLazyFetchStateCityQuery,
} from '../../services/authService';
import { getFormData, showToaster } from '../../helpers/utils';
import { useAddDairyMutation } from '../../services/dairyService';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { getUniqueId } from 'react-native-device-info';
import { setSelectedDairy } from '../../store/slices/dairySlice';

interface Props {
  navigation?: any;
  route?: any;
}

const CreateDairy = ({ navigation, route }: Props) => {
  const styles = useCreateDairyStyle();
  const keyboardVerticalOffset = StatusBar?.currentHeight || 0;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { dairyData, phone_number, from } = route?.params;
  const { user, userID } = useAppSelector(state => state.auth);
  const { selectedDairy } = useAppSelector(state => state.dairy);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [fetchStateCity] = useLazyFetchStateCityQuery();
  const [createDairy] = useAddDairyMutation();
  const [checkDevice] = useLazyCheckDeviceQuery();

  const { handleSubmit, control, getValues } = useForm<any, any>({
    resolver: createDairyFormSchema,
    mode: 'onBlur',
    defaultValues: {
      dairy_name: dairyData?.cDairynm,
      mobile_number: dairyData?.cMobile || user?.cMobile || phone_number || '',
      state: '',
      city: '',
    },
  });

  useEffect(() => {
    fetchStateCity(getFormData({ nCtgid: 2, nParentid: null })).then(
      (res: any) => {
        if (res?.data?.Data) {
          setStateData(res?.data?.Data);
        }
      },
    );
  }, []);

  const onConfirmSelectState = useCallback((item: any) => {
    fetchStateCity(getFormData({ nCtgid: 1, nParentid: item?.nSerialNo })).then(
      (res: any) => {
        if (res?.data?.Data) {
          setCityData(res?.data?.Data);
        }
      },
    );
  }, []);

  const onBackPress = () => {
    navigation.goBack();
  };
  const onCreateDairyPress = async () => {
    const { dairy_name, mobile_number, state, city } = getValues();
    const params = {
      cDairynm: dairy_name,
      cMobile: mobile_number,
      nState: state,
      nCity: city || null,
      nUserid: userID,
      nDairyid: dairyData?.nDairyid || 0,
    };
    const response: any = await createDairy(getFormData(params));
    const deviceId = await getUniqueId();
    if (response?.data?.Data && response?.data?.Data[0]?.dairyid) {
      showToaster(
        `Dairy ${dairyData?.nDairyid ? 'updated' : 'created'} successfully`,
        'S',
      );
      const formData = getFormData({
        cDeviceid: deviceId,
      });
      setTimeout(async () => {
        checkDevice(formData);
      }, 100);
      if (from && from === 'leftMenu') {
        navigation.goBack();
      }

      if (selectedDairy === null) {
        dispatch(setSelectedDairy(user?.Dairy[0] || null));
      } else {
        dispatch(
          setSelectedDairy({
            ...selectedDairy,
            ...{
              cDairynm: dairy_name,
              cMobile: mobile_number,
            },
          }),
        );
      }
    } else {
      showToaster(response?.data?.message || 'Something went wrong', 'E');
    }
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
          title={t('HeaderTitle.CreateDairy')}
          buttonLabel={t('Buttons.Save')}
          onBackPress={route?.params?.from && onBackPress}
          onButtonPress={handleSubmit(onCreateDairyPress)}>
          <Controller
            control={control}
            name="dairy_name"
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => (
              <AppTextInput
                label={t('Labels.NameOfDairy')}
                value={value}
                placeholder={t('Placeholders.DairyName')}
                onChangeText={onChange}
                onBlur={onBlur}
                error={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="mobile_number"
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => (
              <AppTextInput
                label={t('Labels.MobileNumber')}
                value={value}
                placeholder={t('Placeholders.MobileNumber')}
                onChangeText={onChange}
                onBlur={onBlur}
                type="phone"
                error={error?.message}
                prefix="+91"
              />
            )}
          />
          <Controller
            control={control}
            name="state"
            rules={{ required: true }}
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => (
              <Dropdown
                label={t('Labels.State')}
                headerTitle={t('HeaderTitle.SelectState')}
                placeholder={t('Placeholders.ChooseState')}
                data={stateData || []}
                value={value}
                labelField={'Code'}
                valueField={'nSerialNo'}
                onBlur={onBlur}
                error={error?.message}
                onConfirmSelectItem={item => {
                  onChange(item?.nSerialNo);
                  onConfirmSelectState(item);
                }}
              />
            )}
          />
          <Controller
            control={control}
            name="city"
            rules={{ required: true }}
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => (
              <Dropdown
                label={t('Labels.City')}
                headerTitle={t('HeaderTitle.SelectCity')}
                placeholder={t('Placeholders.ChooseCity')}
                data={cityData || []}
                value={value}
                labelField={'Code'}
                valueField={'nSerialNo'}
                onBlur={onBlur}
                error={error?.message}
                onConfirmSelectItem={item => onChange(item?.value)}
              />
            )}
          />
        </WrapperView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateDairy;
