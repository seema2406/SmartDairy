import React, { useCallback, useEffect, useState } from 'react';
import { useStyle } from './CashBookStyle';
import { FlatList, Pressable, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import SVG from '../../assets/svg';
import CustomDateTimePicker from '../../components/datepicker/DateTimePicker';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import AppText from '../../components/text/AppText';
import moment from 'moment';
import {
  CASH_BOOK_FILTER,
  DATE_FORMAT,
  SHIFT,
} from '../../constants/constants';
import EmptyView from '../../components/emptyView/EmptyView';
import CashBookItem from '../../components/cashBookItem/CashBookItem';
import modalfy from '../../helpers/modalfy';
import { MODALS, ROUTES } from '../../constants/routeConstant';
import { useFetchCashBookMutation } from '../../services/reportService';
import { getFormData } from '../../helpers/utils';
import { useAppSelector } from '../../hooks/useRedux';
import { filter } from 'lodash';

const CashBook = ({ navigation }: any) => {
  const styles = useStyle();
  const { t } = useTranslation();
  const [fromPicker, setFromPicker] = useState<boolean>(false);
  const [toPicker, setToPicker] = useState<boolean>(false);
  const [fromDate, setFromDate] = useState<Date>(new Date());
  const [toDate, setToDate] = useState<Date>(new Date());
  const [selectedFilter, setSelectedFilter] = useState('');
  const [fetchCashBook, result] = useFetchCashBookMutation();
  const { selectedDairy } = useAppSelector(state => state.dairy);
  const [cashBookData, setCashBookData] = useState([]);
  const [shift, setShift] = useState('morning');

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: t('HeaderTitle.CashBook'),
      headerRight: () => (
        <View style={styles.headerFilter}>
          <TouchableOpacity style={styles.rightIcon} onPress={onChangeFilter}>
            <SVG.filterIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.rightIcon}>
            <SVG.pdfIcon />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, styles, t]);

  useEffect(() => {
    fetchCashBookData();
  }, [fromDate, selectedDairy?.nDairyid, toDate, shift]);

  const fetchCashBookData = () => {
    fetchCashBook(
      getFormData({
        nDairyid: selectedDairy?.nDairyid,
        frmdt: moment(fromDate).format('YYYY-MM-DD'),
        todt: moment(toDate).format('YYYY-MM-DD'),
        WorkShift: shift,
      }),
    ).then((res: any) => {
      setCashBookData(res?.data?.Data);
    });
  };

  const selectDate = useCallback(
    (_event: DateTimePickerEvent, _date: Date, type: number) => {
      if (type === 0) {
        setFromDate(_date);
        setFromPicker(false);
      } else {
        setToDate(_date);
        setToPicker(false);
      }
    },
    [],
  );

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
      onRefresh: fetchCashBookData,
    });
  };

  const renderItem = ({ item }: any) => {
    return <CashBookItem data={item} onItemPress={() => onItemPress(item)} />;
  };

  const onChangeFilter = () => {
    modalfy.open(MODALS.dropdown, {
      headerTitle: t('HeaderTitle.SelectItem'),
      data: CASH_BOOK_FILTER,
      currentValue: selectedFilter,
      valueField: 'value',
      labelField: 'label',
      onClose: () => {
        modalfy.close(MODALS.dropdown);
      },
      onSelect: onSelectFilter,
    });
  };

  const onSelectFilter = useCallback((item: any) => {
    setSelectedFilter(item?.value);
  }, []);

  const renderItemSeparator = () => <View style={styles.itemSeparator} />;

  const renderEmptyView = () => {
    return <EmptyView contentName={'Cash Book'} />;
  };

  const getFilterData = () => {
    if (selectedFilter) {
      return filter(cashBookData, (item: any) => {
        return item?.VrType?.toLowerCase() === selectedFilter;
      });
    }
    return cashBookData;
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.dateContainer}>
          <CustomDateTimePicker
            isShowPicker={fromPicker}
            renderRightIcon={() => {
              return <SVG.calendarIcon width={18} height={18} />;
            }}
            value={fromDate}
            onSelected={(_event, _date) => selectDate(_event, _date, 0)}
            display="inline"
            renderView={() => calenderView(fromDate)}
          />
          <CustomDateTimePicker
            isShowPicker={toPicker}
            renderRightIcon={() => {
              return <SVG.calendarIcon width={18} height={18} />;
            }}
            value={toDate}
            onSelected={(_event, _date) => selectDate(_event, _date, 0)}
            display="inline"
            renderView={() => calenderView(toDate)}
          />
        </View>
        <View style={styles.shiftContainer}>
          {SHIFT.map(item => {
            return (
              <Pressable
                style={[
                  styles.filterBtn,
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
        <FlatList
          data={getFilterData() || []}
          renderItem={renderItem}
          ItemSeparatorComponent={renderItemSeparator}
          contentContainerStyle={styles.contentContainerStyle}
          ListEmptyComponent={renderEmptyView}
        />
      </View>
    </View>
  );
};

export default CashBook;
