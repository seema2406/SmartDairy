import React, { useCallback, useEffect, useState } from 'react';
import { useStyle } from './DayBookStyle';
import { FlatList, Pressable, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import SVG from '../../assets/svg';
import CustomDateTimePicker from '../../components/datepicker/DateTimePicker';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import AppText from '../../components/text/AppText';
import moment from 'moment';
import { DATE_FORMAT, SHIFT } from '../../constants/constants';
import EmptyView from '../../components/emptyView/EmptyView';
import DayBookItem from '../../components/dayBookItem/DayBookItem';
import {
  useDownloadPDFFileNameMutation,
  useLazyFetchDayBookQuery,
} from '../../services/reportService';
import { getFormData, openPDFFile, randomNum } from '../../helpers/utils';
import { useAppSelector } from '../../hooks/useRedux';
import { filter, includes, size } from 'lodash';
import { ROUTES } from '../../constants/routeConstant';

const DayBook = ({ navigation }: any) => {
  const styles = useStyle();
  const { t } = useTranslation();
  const { selectedDairy } = useAppSelector(state => state.dairy);
  const [fromPicker, setFromPicker] = useState<boolean>(false);
  const [toPicker, setToPicker] = useState<boolean>(false);
  const [fromDate, setFromDate] = useState<Date>(new Date());
  const [toDate, setToDate] = useState<Date>(new Date());
  const [shift, setShift] = useState<string>('morning');
  const [fetchDayBook, result] = useLazyFetchDayBookQuery();
  const [downloadPDF] = useDownloadPDFFileNameMutation();
  const { data, isLoading } = result;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: t('HeaderTitle.DayBook'),
      headerRight: () => (
        <TouchableOpacity
          style={styles.rightIcon}
          onPress={() => onPDFDownload()}>
          <SVG.pdfIcon />
        </TouchableOpacity>
      ),
    });
  }, [navigation, styles, t]);

  useEffect(() => {
    fetchDayBook(getFormData(preparePayload()));
  }, [fromDate, selectedDairy?.nDairyid, toDate]);

  const onPDFDownload = () => {
    const redPayload = {
      ...getFormData({
        ...preparePayload(),
        WorkShift: shift,
      }),
      ReportType: 'DayBook',
    };
    downloadPDF({
      ...getFormData({
        ...preparePayload(),
        WorkShift: shift,
      }),
      ReportType: 'DayBook',
    }).then(async (res: any) => {
      const fileUrl = 'https://www.africau.edu/images/default/sample.pdf';
      openPDFFile(fileUrl);
    });
  };

  const preparePayload = () => {
    return {
      nDairyid: selectedDairy?.nDairyid,
      frmdt: moment(fromDate).format(DATE_FORMAT.YYYY_MM_DD),
      todt: moment(toDate).format(DATE_FORMAT.YYYY_MM_DD),
    };
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

  const onItemPress = (item: any) => {
    navigation.navigate(ROUTES.voucherBook, { item });
  };

  const renderItem = ({ item }: any) => {
    return (
      <DayBookItem
        data={item}
        key={randomNum()}
        onItemPress={() => onItemPress(item)}
      />
    );
  };

  const renderItemSeparator = () => <View style={styles.itemSeparator} />;

  const renderEmptyView = () => {
    if (!isLoading && size(getFilterData()) <= 0) {
      return <EmptyView contentName={'Day Book'} />;
    }
    return <></>;
  };

  const getFilterData = () => {
    if (shift) {
      return filter(data?.Data, item => {
        return includes(item?.WorkShift?.[0]?.Shift?.toLowerCase(), shift);
      });
    }
    return data?.Data;
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

export default DayBook;
