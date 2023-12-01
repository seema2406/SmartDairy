import React, { useCallback, useEffect, useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { useStyle } from './TabContentViewPRStyle';
import AppText from '../text/AppText';
import SVG from '../../assets/svg';
import AppTextInput from '../textInput/AppTextInput';
import AppButton from '../button/AppButton';
import { Controller, useForm } from 'react-hook-form';
import { tabContentFormSchemaPR } from '../../helpers/yupHelper';
import AutoComSearchBar from '../AutoComSearchBar/AutoComSearchBar';
import { useTranVocherMutation } from '../../services/partyService';
import { getFormData, showToaster } from '../../helpers/utils';
import { useAppSelector } from '../../hooks/useRedux';
import CustomDateTimePicker from '../datepicker/DateTimePicker';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useTranslation } from 'react-i18next';
import Dropdown from '../dropdown/Dropdown';
import moment from 'moment';
import { DATE_FORMAT } from '../../constants/constants';

const TabContentViewPR = ({
  onAdd,
  onEdit,
  onSearch,
  data,
  searchedData,
  onSearchItemPress,
  inputRef,
  from = '',
  rateValue = 0,
  bankList = [],
  goBack,
  cBatchno,
}: any) => {
  const { styles, colors } = useStyle({});
  const [saveTranVocher] = useTranVocherMutation();
  const { userID } = useAppSelector(state => state.auth);
  const [date, setDate] = useState<Date>(new Date());
  const [showDatepicker, setShowDatepicker] = useState<boolean>(false);
  const { t } = useTranslation();
  const [type, setType] = useState<'C' | 'B'>('C');
  const [bankId, setBankId] = useState<any>(null);

  const formValue = {
    amount: data?.TranAmt || '',
    remark: data?.remarks || '',
  };

  const { handleSubmit, control, getValues, reset } = useForm<any, any>({
    resolver: tabContentFormSchemaPR,
    mode: 'onBlur',
    defaultValues: {
      amount: data?.TranAmt || '',
      remark: data?.remarks || '',
    },
    values: formValue,
  });

  useEffect(() => {
    setDate(moment(data?.VrDate).toDate());
  }, [data?.VrDate]);

  const onDataSubmit = (dataVal: any) => {
    const { amount, remark } = dataVal;
    const vrData = {
      ...(cBatchno && data),
      nRecordid: data?.nRecordid || 0,
      dVrdate: date,
      nPartyid: data?.nPartyid,
      nItemid: null,
      nFat: data?.nFat || null,
      nRate: data?.PRate || null,
      nQty: data?.nQty || null,
      nDr: from === 'P' ? amount : 0,
      nCr: from === 'R' ? amount : 0,
      cRemarks: remark || '',
      nUserid: userID,
      cVrtype: from,
      nBankid: type === 'B' ? bankId : 0,
    };
    const payload = {
      Vr: [vrData],
    };
    saveTranVocher(getFormData(payload)).then((res: any) => {
      if (res?.data?.success) {
        showToaster(res?.data?.message, 'S');
        goBack();
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
      <View style={styles.searchBarContainer}>
        <AutoComSearchBar
          containerStyle={styles.searchBar}
          onSearch={onSearch}
          searchedData={searchedData}
          onSearchItemPress={onSearchItemPress}
          inputRef={inputRef}
        />
        <TouchableOpacity style={styles.addButton} onPress={onAdd}>
          <AppText size={16} color={colors.white} style={styles.addButtonLabel}>
            {t('Buttons.Add')}
          </AppText>
          <SVG.addPlusIcon width={14} height={14} />
        </TouchableOpacity>
      </View>
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
            <View style={styles.typeContainer}>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  type === 'C' && styles.activeTypeButton,
                ]}
                onPress={() => {
                  setType('C');
                  setBankId(null);
                }}>
                <AppText
                  size={16}
                  color={type === 'C' ? colors.white : colors.black}>
                  {t('Buttons.Cash')}
                </AppText>
              </TouchableOpacity>
              <Dropdown
                dropdownStyle={styles.dropdownStyle}
                labelStyle={styles.labelStyle}
                headerTitle={t('Buttons.Bank')}
                placeholder={t('Buttons.Bank')}
                data={bankList}
                value={bankId}
                labelField={'cPartynm'}
                valueField={'nPartyid'}
                confirmSelectItem={true}
                onConfirmSelectItem={(e: any) => {
                  setType('B');
                  setBankId(e?.nPartyid);
                }}
                error={''}
              />
            </View>
            <Controller
              control={control}
              name="amount"
              render={({
                field: { onChange, value, onBlur },
                fieldState: { error },
              }) => (
                <AppTextInput
                  label={t('Labels.Amount')}
                  value={value?.toString()}
                  placeholder={t('Placeholders.Amount')}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  style={styles.inputStyle}
                  error={error?.message}
                  type="number"
                />
              )}
            />
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
            title={t('Buttons.Save')}
            onPress={handleSubmit(onDataSubmit)}
            style={styles.button}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default TabContentViewPR;
