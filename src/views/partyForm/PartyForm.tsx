import React, { useEffect } from 'react';
import { useStyle } from './PartyFormStyle';
import { TouchableOpacity, View, SafeAreaView } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { partyFormSchema } from '../../helpers/yupHelper';
import AppTextInput from '../../components/textInput/AppTextInput';
import AppButton from '../../components/button/AppButton';
import SVG from '../../assets/svg';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../hooks/useRedux';
import {
  useCreatePartyMutation,
  useDeletePartyMutation,
  useGetPartyTypeMutation,
} from '../../services/partyService';
import { getFormData, showToaster } from '../../helpers/utils';
import { ROUTES } from '../../constants/routeConstant';
import Dropdown from '../../components/dropdown/Dropdown';

const PartyForm = ({ navigation, route }: any) => {
  const { styles } = useStyle();
  const { t } = useTranslation();
  const mode: 'create' | 'edit' = route?.params?.mode || 'create';
  const partyData: any = route?.params?.partyData || {};
  const onRefresh: any = route?.params?.onRefresh || null;
  const { userID, user } = useAppSelector(state => state.auth);
  const { selectedDairy } = useAppSelector(state => state.dairy);
  const [createParty] = useCreatePartyMutation();
  const [deleteParty] = useDeletePartyMutation();
  const [getPartyType, { data: partyType }] = useGetPartyTypeMutation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title:
        mode == 'create'
          ? t('HeaderTitle.CreateParty')
          : t('HeaderTitle.EditParty') + ` ${partyData?.name}`,
      headerRight: () => {
        return mode == 'edit' ? (
          <TouchableOpacity style={styles.deleteIcon} onPress={onDeleteParty}>
            <SVG.deleteIcon />
          </TouchableOpacity>
        ) : (
          <></>
        );
      },
    });
  }, [navigation, mode, t, styles]);

  useEffect(() => {
    getPartyType(getFormData({}));
  }, []);

  const onDeleteParty = () => {
    const payload = {
      Party: [
        {
          nPartyid: partyData?.id || 0,
          nDairyid: selectedDairy?.nDairyid,
          nUserid: userID,
        },
      ],
    };
    deleteParty(getFormData(payload)).then((res: any) => {
      if (res?.data?.success) {
        showToaster('Party deleted successfully', 'S');
        navigation.goBack();
      } else {
        showToaster('Something went wrong', 'E');
      }
    });
  };

  const { handleSubmit, control } = useForm<any, any>({
    resolver: partyFormSchema,
    mode: 'onBlur',
    defaultValues: {
      type: partyData?.type,
      party_name: partyData?.name,
      phone_number: mode == 'edit' ? partyData?.mobileNo || user?.cMobile : '',
    },
  });

  const onSave = (data: any) => {
    const payload = {
      Party: [
        {
          nPartyid: partyData?.id || 0,
          nDairyid: selectedDairy?.nDairyid,
          cPartynm: data?.party_name,
          cMobile: data?.phone_number,
          nUserid: userID,
          cType: data?.type,
        },
      ],
    };
    console.log('payload>>>>>', payload);
    createParty(getFormData(payload)).then((res: any) => {
      if (res?.data?.success) {
        showToaster(
          `Party ${partyData?.id ? 'updated' : 'created'} successfully`,
          'S',
        );
        if (partyData?.id && onRefresh) {
          onRefresh();
        }
        navigation.goBack();
      } else {
        showToaster('Something went wrong', 'E');
      }
    });
  };

  const onPressConstomizePrice = () => {
    navigation.navigate(ROUTES.customizePrice, {
      from: 'party',
      partyId: partyData?.id || 0,
      itemName: partyData?.name,
    });
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Controller
            control={control}
            name="type"
            rules={{ required: true }}
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => (
              <Dropdown
                label={t('Labels.SelectType')}
                headerTitle={t('Labels.SelectType')}
                placeholder={t('Labels.SelectType')}
                data={partyType?.Data || []}
                value={value}
                labelField={'Partytypenm'}
                valueField={'Partytype'}
                onBlur={onBlur}
                error={error?.message}
                onConfirmSelectItem={item => {
                  onChange(item?.Partytype);
                }}
              />
            )}
          />
          <Controller
            control={control}
            name="party_name"
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => (
              <AppTextInput
                label={t('Labels.PartyName')}
                value={value}
                placeholder={t('Placeholders.PartyName')}
                onChangeText={onChange}
                onBlur={onBlur}
                error={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="phone_number"
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
                error={error?.message}
                type="number"
              />
            )}
          />
          {mode === 'edit' && (
            <AppButton
              type="outlined"
              title={t('Buttons.SetCustomizePrice')}
              onPress={onPressConstomizePrice}
              style={styles.priceButton}
            />
          )}
        </View>
        <AppButton
          title={t('Buttons.Save')}
          onPress={handleSubmit(onSave)}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
};

export default PartyForm;
