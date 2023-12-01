import React, { useState } from 'react';
import { useStyle } from './StaffFormStyle';
import { TouchableOpacity, View, SafeAreaView } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { staffFormSchema } from '../../helpers/yupHelper';
import AppTextInput from '../../components/textInput/AppTextInput';
import AppButton from '../../components/button/AppButton';
import SVG from '../../assets/svg';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../hooks/useRedux';
import { getFormData, showToaster } from '../../helpers/utils';
import AppText from '../../components/text/AppText';
import { ROUTES } from '../../constants/routeConstant';
import { size } from 'lodash';
import { useAddCoUserMutation } from '../../services/authService';

const StaffForm = ({ navigation, route }: any) => {
  const { styles, colors } = useStyle();
  const { t } = useTranslation();
  const mode: 'create' | 'edit' = route?.params?.mode || 'create';
  const staffData: any = route?.params?.staffData || {};
  const { userID } = useAppSelector(state => state.auth);
  const [addUser] = useAddCoUserMutation();
  const [permissionData, setPermissionData] = useState<any>([]);

  const getDairiesName = (data: any) => {
    return size(data) > 0
      ? data
          ?.map((item: any) => {
            return item?.cDairynm;
          })
          ?.toString()
      : '';
  };

  const { handleSubmit, control, setValue } = useForm<any, any>({
    resolver: staffFormSchema,
    mode: 'onBlur',
    defaultValues: {
      staff_name: staffData?.cUserNm || '',
      phone_number: staffData?.cMobile || '',
      permission: getDairiesName(staffData?.Perm),
    },
  });

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title:
        mode === 'create'
          ? t('HeaderTitle.CreateStaff')
          : t('HeaderTitle.EditStaff'),
    });
  }, [navigation, mode, t, styles]);

  const onSave = (data: any) => {
    const { staff_name, phone_number } = data;
    const payload = {
      cUserNm: staff_name,
      cMobile: phone_number,
      Puserid: userID,
      Perm: permissionData,
      Status: staffData?.Status || 'P',
      nUserid: staffData?.nUserid || 0,
    };

    addUser(getFormData(payload)).then((res: any) => {
      if (res?.data?.success) {
        showToaster(
          `Staff user ${staffData?.nUserid ? 'updated' : 'added'} successfully`,
          'S',
        );
        navigation.goBack();
      } else {
        showToaster(res?.data?.message || 'Something went wrong', 'E');
      }
    });
  };

  const onAddPermissions = () => {
    navigation.navigate(ROUTES.dairyPermission, {
      onApply: (data: any) => {
        setPermissionData(data);
        setValue('permission', getDairiesName(data));
      },
    });
  };

  const renderAddButton = () => {
    return (
      <TouchableOpacity style={styles.addButton} onPress={onAddPermissions}>
        <SVG.addPlusIcon width={14} height={14} />
        <AppText size={16} color={colors.white} style={styles.addButtonLabel}>
          {t('Buttons.Add')}
        </AppText>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Controller
            control={control}
            name="staff_name"
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => (
              <AppTextInput
                label={t('Labels.NameOfStaff')}
                value={value}
                placeholder={t('Placeholders.StaffName')}
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
          <Controller
            control={control}
            name="permission"
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => (
              <AppTextInput
                label={t('Labels.DairyPermissions')}
                value={value}
                placeholder={t('Labels.DairyPermissions')}
                onChangeText={onChange}
                onBlur={onBlur}
                error={error?.message}
                style={styles.permissionText}
                textStyle={styles.textStyle}
                rightView={renderAddButton}
                editable={false}
                hideError
                selection={{ start: 0 }}
              />
            )}
          />
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

export default StaffForm;
