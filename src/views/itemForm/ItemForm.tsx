import React, { useEffect } from 'react';
import { useStyle } from './ItemFormStyle';
import { TouchableOpacity, View, SafeAreaView } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { itemFormSchema } from '../../helpers/yupHelper';
import AppTextInput from '../../components/textInput/AppTextInput';
import AppButton from '../../components/button/AppButton';
import SVG from '../../assets/svg';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../hooks/useRedux';
import { getFormData, showToaster } from '../../helpers/utils';
import { ROUTES } from '../../constants/routeConstant';
import {
  useCreateItemMutation,
  useDeleteItemMutation,
} from '../../services/itemService';
import {
  useFetchStateCityQuery,
  useLazyFetchStateCityQuery,
} from '../../services/authService';
import Dropdown from '../../components/dropdown/Dropdown';

const ItemForm = ({ navigation, route }: any) => {
  const { styles } = useStyle();
  const { t } = useTranslation();
  const mode: 'create' | 'edit' = route?.params?.mode || 'create';
  const itemData: any = route?.params?.itemData || {};
  const { userID } = useAppSelector(state => state.auth);
  const { selectedDairy } = useAppSelector(state => state.dairy);
  const [createItem] = useCreateItemMutation();
  const [deleteItem] = useDeleteItemMutation();
  const [fetchStateCity, { data }] = useLazyFetchStateCityQuery();
  const unitData = data?.Data || [];

  useEffect(() => {
    fetchStateCity(getFormData({ nCtgid: 4 }));
  }, []);

  const { handleSubmit, control, getValues } = useForm<any, any>({
    resolver: itemFormSchema,
    mode: 'onBlur',
    defaultValues: {
      item_name: itemData?.cItemnm,
      unit: itemData?.nUnit,
      sale_rate: itemData?.nSRate?.toString(),
      purchase_rate: itemData?.nPRate?.toString(),
    },
  });

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title:
        mode === 'create'
          ? t('HeaderTitle.CreateItem')
          : t('HeaderTitle.EditItem') + ` ${itemData?.cItemnm}`,
      headerRight: () => {
        return mode == 'edit' && itemData?.cAdmin !== 'M' ? (
          <TouchableOpacity style={styles.deleteIcon} onPress={onDeleteItem}>
            <SVG.deleteIcon />
          </TouchableOpacity>
        ) : (
          <></>
        );
      },
    });
  }, [navigation, mode, t, styles, itemData]);

  const onDeleteItem = () => {
    const payload = {
      Item: [
        {
          nItemid: itemData?.nItemid || 0,
          nDairyid: selectedDairy?.nDairyid,
          nUserid: userID,
        },
      ],
    };
    deleteItem(getFormData(payload)).then((res: any) => {
      if (res?.data?.success) {
        showToaster('Item deleted successfully', 'S');
        navigation.goBack();
      } else {
        showToaster(res?.data?.message || 'Something went wrong', 'E');
      }
    });
  };

  const onSave = (data: any) => {
    const { item_name, unit, sale_rate, purchase_rate } = data;
    const payload = {
      nItemid: itemData?.nItemid || 0,
      cAdmin: 'U',
      nDairyid: selectedDairy?.nDairyid,
      cItemCode: 'cc',
      cItemnm: item_name,
      nUnit: unit,
      cDelstatus: 'N',
      nSRate: sale_rate,
      nPRate: purchase_rate,
    };

    createItem(getFormData(payload)).then((res: any) => {
      if (res?.data?.success) {
        showToaster(
          `Item ${itemData?.nItemid ? 'updated' : 'created'} successfully`,
          'S',
        );
        navigation.goBack();
      } else {
        showToaster(res?.data?.message || 'Something went wrong', 'E');
      }
    });
  };

  const onPressConstomizePrice = () => {
    navigation.navigate(ROUTES.customizePrice, {
      from: 'item',
      itemId: itemData?.nItemid || 0,
      itemName: itemData?.cItemnm || '',
    });
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Controller
            control={control}
            name="item_name"
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => (
              <AppTextInput
                label={t('Labels.ItemName')}
                value={value}
                placeholder={t('Placeholders.ItemName')}
                onChangeText={onChange}
                onBlur={onBlur}
                error={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="unit"
            rules={{ required: true }}
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => (
              <Dropdown
                label={t('Labels.Unit')}
                headerTitle={t('SelectUnit')}
                placeholder={t('SelectUnit')}
                data={unitData || []}
                value={value}
                labelField={'Code'}
                valueField={'nSerialNo'}
                onBlur={onBlur}
                error={error?.message}
                onConfirmSelectItem={item => {
                  onChange(item?.nSerialNo);
                }}
              />
            )}
          />
          <View style={styles.rateContainer}>
            <View style={styles.width40}>
              <Controller
                control={control}
                name="sale_rate"
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
                name="purchase_rate"
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

export default ItemForm;
