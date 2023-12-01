import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
  Platform,
} from 'react-native';
import { useStyle } from './TabContentViewStyle';
import AppText from '../text/AppText';
import SVG from '../../assets/svg';
import AppTextInput from '../textInput/AppTextInput';
import AppButton from '../button/AppButton';
import { Controller, useForm } from 'react-hook-form';
import { tabContentFormSchema } from '../../helpers/yupHelper';
import AutoComSearchBar from '../AutoComSearchBar/AutoComSearchBar';
import { round } from 'lodash';
import Dropdown from '../dropdown/Dropdown';
import {
  useGetItemPriceMutation,
  useTranVocherMutation,
} from '../../services/partyService';
import {
  closeModal,
  getFormData,
  openModal,
  showToaster,
} from '../../helpers/utils';
import { useAppSelector } from '../../hooks/useRedux';
import { MODALS } from '../../constants/routeConstant';
import CustomDateTimePicker from '../datepicker/DateTimePicker';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { SCREEN_WIDTH } from '../../theme';
import moment from 'moment';
import { DATE_FORMAT } from '../../constants/constants';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import RNPrint from 'react-native-print';

const TabContentView = ({
  onAdd,
  onEdit,
  onSearch,
  data,
  onSubmit,
  searchedData,
  onSearchItemPress,
  inputRef,
  tab = 'milk',
  items = [],
  from = '',
  rateValue = 0,
  cType,
  goBack,
  cBatchno,
  showSearchBar = true,
}: any) => {
  const { styles, colors } = useStyle({});
  const [rate, setRate] = useState<any>('');
  const [amount, setAmount] = useState<any>('');
  const [selectedItem, setSelectedItem] = useState<any>('');
  const [getItemPrice] = useGetItemPriceMutation();
  const [saveTranVocher] = useTranVocherMutation();
  const { userID } = useAppSelector(state => state.auth);
  const [date, setDate] = useState<Date>(new Date());
  const [showDatepicker, setShowDatepicker] = useState<boolean>(false);
  const { t } = useTranslation();
  const navigation = useNavigation();

  const formValue = {
    fat: data?.nFat || '',
    qty: data?.nQty || null,
    remark: data?.remarks || '',
    item: '',
  };

  const { handleSubmit, control, getValues, reset } = useForm<any, any>({
    resolver: tabContentFormSchema(tab, from, cType),
    mode: 'onBlur',
    defaultValues: {
      fat: data?.nFat || '',
      qty: data?.nQty || null,
      remark: data?.remarks || '',
      item: '',
    },
    values: formValue,
  });

  useEffect(() => {
    setDate(moment(data?.VrDate).toDate());
  }, [data?.VrDate]);

  useEffect(() => {
    if (rateValue) {
      let amountVal = 0;
      let rateVal = 0;
      if (tab === 'milk') {
        const qty = getValues('qty');
        const fat = getValues('fat');
        rateVal =
          from === 'S' && cType !== 'D' ? rateValue : round(fat * rateValue, 2);
        amountVal = fat * rateValue * JSON.parse(qty);
      } else {
      }
      setRate(rateVal);
      setAmount(amountVal);
    }
  }, [rateValue]);

  const onItemSelect = (item: any) => {
    setSelectedItem(item);
    const payload = { nPartyid: data?.nPartyid, nItemid: item?.nItemid };
    getItemPrice(getFormData(payload)).then((res: any) => {
      if (res?.data?.Data) {
        const { nPRate, nSRate } = res?.data?.Data[0];
        const qty = getValues('qty');
        const itemRate = from === 'S' ? nSRate : nPRate || 0;
        const rateVal = round(itemRate, 2);
        const amountVal = rateVal * JSON.parse(qty);
        setRate(rateVal);
        setAmount(round(amountVal, 2));
      }
    });
  };

  const onFatChange = (fat: any) => {
    const qty = getValues('qty');
    const rateVal = round(fat * rateValue, 2);
    const amountVal = fat * rateValue * JSON.parse(qty);
    setRate(rateVal);
    setAmount(amountVal);
  };

  const onQtyChange = (val: any) => {
    const fat = getValues('fat');
    let amountVal = 0;
    if (tab === 'milk') {
      amountVal =
        from === 'S' && cType !== 'D'
          ? rateValue * Number(val)
          : rateValue * fat * Number(val);
    } else {
      amountVal = rate * Number(val);
    }
    setAmount(round(amountVal, 2));
  };

  const onDataSubmit = (dataVal: any) => {
    const { fat, qty, remark, item } = dataVal;
    if (!amount) {
      showToaster(t('Validations.AmountNotZero'), 'E');
      return;
    }
    const vrData = {
      ...(cBatchno && data),
      nRecordid: data?.nRecordid || 0,
      dVrdate: date,
      nPartyid: data?.nPartyid,
      nItemid: tab === 'milk' ? data?.Milkitemid : item,
      nFat: tab === 'milk' && fat ? fat : 0,
      nRate: rate,
      nQty: qty,
      nDr: from === 'S' ? amount : 0,
      nCr: from === 'P' ? amount : 0,
      cRemarks: remark,
      nUserid: userID, //selectedData?.nUserid
      cVrtype: from,
      nBankid: 0,
    };
    const payload = {
      Vr: [vrData],
    };
    saveTranVocher(getFormData(payload)).then((res: any) => {
      if (res?.data?.success) {
        const message = `${moment(vrData?.dVrdate).format(
          DATE_FORMAT.TIMESTAMP,
        )}, ${t('Labels.Fat')}: ${vrData?.nFat}, ${t('Labels.Qty')}: ${
          vrData?.nQty
        } ${t('Labels.Ltr')}, ${t('Labels.Rs')}. ${rate}, ${t(
          'Labels.Total',
        )} ${amount}, ${t('Labels.Balance')} ${data?.Balance} CR`;
        openModal(MODALS.smsPrint, {
          headerTitle: '',
          message: message,
          onSmsPress: () => {
            const smsDivider = Platform.OS === 'ios' ? '&' : '?';
            Linking.openURL(`sms:${data?.cMobile}${smsDivider}body=${message}`);
            closeModal(MODALS.smsPrint);
            navigation.goBack();
          },
          onPrintPress: async () => {
            closeModal(MODALS.smsPrint);
            navigation.goBack();
            await RNPrint.print({
              html: `<body>${message}</body>`,
            });
          },
          onClosePress: () => {
            closeModal(MODALS.smsPrint);
            navigation.goBack();
          },
        });
      } else {
        showToaster(t('Errors.CommonError'), 'E');
      }
    });
  };

  const selectDate = useCallback((_event: DateTimePickerEvent, _date: Date) => {
    setDate(_date);
    setShowDatepicker(false);
  }, []);

  return (
    <View style={styles.container}>
      {showSearchBar && (
        <View style={styles.searchBarContainer}>
          <AutoComSearchBar
            containerStyle={styles.searchBar}
            onSearch={onSearch}
            searchedData={searchedData}
            onSearchItemPress={onSearchItemPress}
            inputRef={inputRef}
          />
          <TouchableOpacity style={styles.addButton} onPress={onAdd}>
            <AppText
              size={16}
              color={colors.white}
              style={styles.addButtonLabel}>
              {t('Buttons.Add')}
            </AppText>
            <SVG.addPlusIcon width={14} height={14} />
          </TouchableOpacity>
        </View>
      )}
      {data && (
        <ScrollView style={styles.container} nestedScrollEnabled>
          <View style={styles.kpiContainer}>
            <View style={styles.kpiInnerLeftContainer}>
              <AppText size={16} fontWeight="medium">
                {data?.cPartynm}
              </AppText>
              <AppText size={12}>+91 {data?.cMobile}</AppText>
              {/* <AppText size={12}># {data?.cPartynm}</AppText> */}
            </View>
            <View style={styles.kpiInnerRightContainer}>
              <AppText size={24} fontWeight="bold" color={colors.textGreen}>
                {data?.Balance} CR
              </AppText>
              <AppText size={14} fontWeight="medium" color={colors.textGreen}>
                {t('Labels.FatRate')}: {rateValue}
              </AppText>
            </View>
          </View>
          <View style={styles.actionContainer}>
            <TouchableOpacity
              style={styles.actionIconButton}
              onPress={() => {}}>
              <SVG.ledgerIcon width={24} height={24} />
              <AppText
                size={10}
                fontWeight="regular"
                style={styles.actionIconLabel}>
                {t('Buttons.CurrentLedger')}
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionIconButton} onPress={onEdit}>
              <SVG.userEditIcon width={24} height={24} />
              <AppText
                size={10}
                fontWeight="regular"
                style={styles.actionIconLabel}>
                {t('Buttons.EditParty')}
              </AppText>
            </TouchableOpacity>
          </View>
          <View style={styles.hrLine} />
          <View style={styles.datePickerContainer}>
            <CustomDateTimePicker
              isShowPicker={showDatepicker}
              renderRightIcon={() => {
                return <SVG.calendarIcon />;
              }}
              value={date}
              onSelected={(_event, _date) => selectDate(_event, _date)}
              display="inline"
            />
          </View>
          <View style={styles.hrLine} />
          <View style={styles.formContainer}>
            <View style={styles.formInnerRow}>
              {tab === 'milk' ? (
                <Controller
                  control={control}
                  name="fat"
                  render={({
                    field: { onChange, value, onBlur },
                    fieldState: { error },
                  }) => (
                    <AppTextInput
                      label={t('Labels.Fat')}
                      value={value?.toString()}
                      placeholder={t('Placeholders.Fat')}
                      onChangeText={(val: any) => {
                        onChange(val);
                        onFatChange(val);
                      }}
                      onBlur={onBlur}
                      style={styles.inputStyle}
                      error={error?.message}
                      type="number"
                      editable={
                        !(from === 'S' && tab === 'milk' && cType !== 'D')
                      }
                    />
                  )}
                />
              ) : (
                <Controller
                  control={control}
                  name="item"
                  render={({
                    field: { onChange, value, onBlur },
                    fieldState: { error },
                  }) => (
                    <Dropdown
                      label={t('Labels.Items')}
                      headerTitle={t('Labels.Items')}
                      placeholder={t('Placeholders.SelectItem')}
                      data={items || []}
                      value={value}
                      labelField={'cItemnm'}
                      valueField={'nItemid'}
                      onBlur={onBlur}
                      error={error?.message}
                      onConfirmSelectItem={item => {
                        onChange(item?.nItemid);
                        onItemSelect(item);
                      }}
                      style={styles.inputStyle}
                    />
                  )}
                />
              )}
              <Controller
                control={control}
                name="qty"
                render={({
                  field: { onChange, value, onBlur },
                  fieldState: { error },
                }) => (
                  <AppTextInput
                    label={t('Labels.Qty')}
                    value={value?.toString()}
                    placeholder={t('Placeholders.Qty')}
                    onChangeText={(val: any) => {
                      const validated = val.match(/^(\d*\.{0,1}\d{0,1}$)/);
                      if (validated) {
                        onChange(val);
                        onQtyChange(val);
                      }
                    }}
                    onBlur={onBlur}
                    style={styles.inputStyle}
                    error={error?.message}
                    type="number"
                  />
                )}
              />
            </View>
            <View style={styles.formInnerRow}>
              <AppTextInput
                label={t('Labels.Rate')}
                value={rate?.toString()}
                placeholder={''}
                style={{ ...styles.inputStyle, ...styles.disabledInput }}
                editable={false}
              />
              <AppTextInput
                label={t('Labels.Amount')}
                value={amount?.toString()}
                placeholder={''}
                style={{ ...styles.inputStyle, ...styles.disabledInput }}
                editable={false}
              />
            </View>
            <Controller
              control={control}
              name="remark"
              render={({
                field: { onChange, value, onBlur },
                fieldState: { error },
              }) => (
                <AppTextInput
                  label={t('Labels.Remark')}
                  value={value}
                  placeholder={t('Placeholders.Remark')}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  style={styles.remarkInputStyle}
                  error={error?.message}
                />
              )}
            />
          </View>
          <View style={styles.hrLine} />
          <AppButton
            title={t('Buttons.Submit')}
            onPress={handleSubmit(onDataSubmit)}
            style={styles.button}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default TabContentView;
