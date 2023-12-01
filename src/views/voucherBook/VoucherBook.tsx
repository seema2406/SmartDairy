import React, { useCallback, useEffect, useState } from 'react';
import { useStyle } from './VoucherBookStyle';
import { FlatList, Pressable, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import SVG from '../../assets/svg';
import CustomDateTimePicker from '../../components/datepicker/DateTimePicker';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import AppText from '../../components/text/AppText';
import moment from 'moment';
import { DATE_FORMAT, SHIFT, voucherFilter } from '../../constants/constants';
import EmptyView from '../../components/emptyView/EmptyView';
import VoucherBookItem from '../../components/voucherBookItem/VoucherBookItem';
import { MODALS, ROUTES } from '../../constants/routeConstant';
import modalfy from '../../helpers/modalfy';
import {
  useDownloadPDFFileNameMutation,
  useLazyFetchVoucherBookQuery,
} from '../../services/reportService';
import {
  getFormData,
  openPDFFile,
  randomNum,
  showToaster,
} from '../../helpers/utils';
import { filter, includes, size } from 'lodash';
import { useAppSelector } from '../../hooks/useRedux';

const VoucherBook = ({ navigation, route }: any) => {
  const styles = useStyle();
  const { t } = useTranslation();
  const { selectedDairy } = useAppSelector(state => state.dairy);
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const dayBookData = route?.params?.item;
  const [date, setDate] = useState<Date>(
    dayBookData?.VrDate ? new Date(dayBookData?.VrDate) : new Date(),
  );
  const [selectedFilter, setSelectedFilter] = useState('');
  const [shift, setShift] = useState('morning');
  const [fetchVoucherBook, result] = useLazyFetchVoucherBookQuery();
  const [downloadPDF] = useDownloadPDFFileNameMutation();
  const { data, isLoading } = result;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: t('HeaderTitle.VoucherBook'),
      headerRight: () => (
        <View style={styles.headerFilter}>
          <TouchableOpacity style={styles.rightIcon} onPress={onChangeFilter}>
            <SVG.filterIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.rightIcon} onPress={onPDFDownload}>
            <SVG.pdfIcon />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, styles, t]);

  useEffect(() => {
    fetchVoucherData();
  }, [date]);

  const onChangeFilter = () => {
    modalfy.open(MODALS.dropdown, {
      headerTitle: t('HeaderTitle.SelectItem'),
      data: voucherFilter,
      currentValue: selectedFilter,
      valueField: 'value',
      labelField: 'label',
      onClose: () => {
        modalfy.close(MODALS.dropdown);
      },
      onSelect: onSelectFilter,
    });
  };

  const onPDFDownload = () => {
    downloadPDF(
      getFormData({
        ...preparePayload(),
        WorkShift: shift,
      }),
    ).then((res: any) => {
      if (res?.data?.Data) {
        const fileUrl = 'https://www.africau.edu/images/default/sample.pdf';
        openPDFFile(fileUrl);
      } else {
        const message = res?.data?.message || t('Errors.CommonError');
        showToaster(message, 'E');
      }
    });
  };

  const fetchVoucherData = () => {
    fetchVoucherBook(getFormData(preparePayload()));
  };

  const preparePayload = () => {
    return {
      nDairyid: selectedDairy?.nDairyid,
      frmdt: moment(date).format(DATE_FORMAT.YYYY_MM_DD),
      todt: moment(date).format(DATE_FORMAT.YYYY_MM_DD),
    };
  };

  const onSelectFilter = useCallback((item: any) => {
    setSelectedFilter(item?.value);
  }, []);

  const selectDate = useCallback((_event: DateTimePickerEvent, _date: Date) => {
    setDate(_date);
    setShowPicker(false);
  }, []);

  const calenderView = (value: any) => {
    return (
      <View style={styles.dateContainer}>
        <SVG.calendarIcon />
        <View style={styles.textContainer}>
          <AppText>
            {moment(value.toString()).format(DATE_FORMAT.DD_MMM_YYYY)}
          </AppText>
        </View>
      </View>
    );
  };

  const onItemPress = async (item: any) => {
    let routeName = '';
    if (item?.VrType?.toLowerCase() === 'purchase') {
      routeName = ROUTES.purchase;
    } else if (item?.VrType?.toLowerCase() === 'sales') {
      routeName = ROUTES.sales;
    } else if (item?.VrType?.toLowerCase() === 'payment') {
      routeName = ROUTES.payment;
    } else if (item?.VrType?.toLowerCase() === 'receipt') {
      routeName = ROUTES.receipt;
    }
    navigation.navigate(routeName, {
      cBatchno: item?.cBatchno,
      onRefresh: fetchVoucherData,
    });
  };

  const renderItem = ({ item }: any) => {
    return (
      <VoucherBookItem
        data={item}
        key={randomNum()}
        onItemPress={() => onItemPress(item)}
      />
    );
  };

  const renderItemSeparator = () => <View style={styles.itemSeparator} />;

  const renderEmptyView = () => {
    if (!isLoading && size(getFilterData()) <= 0) {
      return <EmptyView contentName={'Voucher Book'} />;
    }
    return <></>;
  };

  const getFilterData = () => {
    if (shift || selectedFilter) {
      const filterData = filter(data?.Data, item => {
        return includes(item?.Shift?.toLowerCase(), shift);
      });
      if (selectedFilter) {
        return filter(filterData, item => {
          return includes(item?.VrType?.toLowerCase(), selectedFilter);
        });
      }
      return filterData;
    }
    return data?.Data;
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.filterContainer}>
          <CustomDateTimePicker
            isShowPicker={showPicker}
            renderRightIcon={() => {
              return <SVG.calendarIcon width={18} height={18} />;
            }}
            value={date}
            onSelected={(_event, _date) => selectDate(_event, _date)}
            display="inline"
            renderView={() => calenderView(date)}
          />
          <View style={styles.rightFilter}>
            {SHIFT.map(item => {
              return (
                <Pressable
                  style={[
                    styles.filterBtn,
                    styles.marginEnd14,
                    shift === item?.value && styles.activeFilter,
                  ]}
                  onPress={() => setShift(item?.value)}>
                  <AppText
                    size={12}
                    style={[shift === item?.value && styles.activeLabel]}>
                    {t(item?.label)}
                  </AppText>
                </Pressable>
              );
            })}
          </View>
        </View>
        <FlatList
          data={getFilterData()}
          renderItem={renderItem}
          ItemSeparatorComponent={renderItemSeparator}
          contentContainerStyle={styles.contentContainerStyle}
          ListEmptyComponent={renderEmptyView}
        />
      </View>
    </View>
  );
};

export default VoucherBook;
