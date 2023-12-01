import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useStyle } from './LedgerBookStyle';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import SVG from '../../assets/svg';
import CustomDateTimePicker from '../../components/datepicker/DateTimePicker';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import AppText from '../../components/text/AppText';
import moment from 'moment';
import { DATE_FORMAT, LEDGER_BOOK_FILTER } from '../../constants/constants';
import EmptyView from '../../components/emptyView/EmptyView';
import modalfy from '../../helpers/modalfy';
import { MODALS, ROUTES } from '../../constants/routeConstant';
import LedgerBookItem from '../../components/ledgerBookItem/LedgerBookItem';
import AutoComSearchBar from '../../components/AutoComSearchBar/AutoComSearchBar';
import { useGetPartySearchMutation } from '../../services/partyService';
import { useAppSelector } from '../../hooks/useRedux';
import { getFormData } from '../../helpers/utils';
import { filter, size } from 'lodash';
import { TextInput } from 'react-native-gesture-handler';
import { useFetchPartyLedgerMutation } from '../../services/reportService';

const LedgerBook = ({ navigation }: any) => {
  const { styles, colors } = useStyle();
  const { t } = useTranslation();
  const [fromPicker, setFromPicker] = useState<boolean>(false);
  const [toPicker, setToPicker] = useState<boolean>(false);
  const [fromDate, setFromDate] = useState<Date>(new Date());
  const [toDate, setToDate] = useState<Date>(new Date());
  const [selectedFilter, setSelectedFilter] = useState('');
  const [searchParty] = useGetPartySearchMutation();
  const { selectedDairy } = useAppSelector(state => state.dairy);
  const [searchedData, setSearchedData] = useState<any>([]);
  const inputRef = useRef<TextInput>(null);
  const [fetchPartyLedger] = useFetchPartyLedgerMutation();
  const [partyLedgerData, setPartyLedgerData] = useState<any>([]);
  const [selectedParty, setSelectedParty] = useState<any>(null);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Ledger Book',
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
    if (selectedParty?.nPartyid) {
      fetchLegderBookData();
    }
  }, [fromDate, toDate, selectedParty]);

  const fetchLegderBookData = () => {
    const payload = {
      nPartyid: selectedParty?.nPartyid,
      frmdt: moment(fromDate).format('YYYY-MM-DD'),
      todt: moment(toDate).format('YYYY-MM-DD'),
    };
    fetchPartyLedger(getFormData(payload)).then((res: any) => {
      setPartyLedgerData(res?.data?.Data);
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
      cBatchno: item?.cBatchNo,
      onRefresh: fetchLegderBookData,
    });
  };

  const renderItem = ({ item, index }: any) => {
    // const isLast = partyLedgerData?.length - 1 === index;
    if (index == 0) {
      return (
        <View style={styles.topContainer}>
          <AppText
            size={18}
            fontWeight="medium"
            style={{ color: colors.blue75 }}>
            {selectedParty?.cPartynm}
          </AppText>
          <AppText
            size={24}
            fontWeight="medium"
            style={{ color: colors.textRed }}>
            {item?.Balance}
          </AppText>
        </View>
      );
    }
    return <LedgerBookItem data={item} onItemPress={() => onItemPress(item)} />;
  };

  const onChangeFilter = () => {
    modalfy.open(MODALS.dropdown, {
      headerTitle: t('HeaderTitle.SelectItem'),
      data: LEDGER_BOOK_FILTER,
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
    return <EmptyView contentName={'Ledger Book'} />;
  };

  const onSearch = (text: string) => {
    if (text) {
      const payload = {
        nDairyid: selectedDairy?.nDairyid,
        PartyStr: text,
        PartyType: 'A',
      };
      searchParty(getFormData(payload)).then((res: any) => {
        if (size(res?.data?.Data) > 0) {
          setSearchedData(res?.data?.Data);
        } else {
          setSearchedData([]);
        }
      });
    } else {
      setSearchedData([]);
      setPartyLedgerData([]);
      setSelectedParty(null);
    }
  };

  const onSearchItemPress = (item: any) => {
    inputRef?.current?.blur?.();
    inputRef?.current?.setNativeProps?.({ text: item?.cPartynm });
    setSelectedParty(item);
  };

  const getFilterData = () => {
    if (selectedFilter && partyLedgerData.length > 3) {
      return filter(partyLedgerData, (item, index: any) => {
        // const isLast = index === partyLedgerData.length - 1;
        return index == 0 || item?.VrType?.toLowerCase() == selectedFilter;
      });
    }
    return partyLedgerData;
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <AutoComSearchBar
          containerStyle={styles.searchBar}
          onSearch={onSearch}
          searchedData={searchedData}
          onSearchItemPress={onSearchItemPress}
          inputRef={inputRef}
        />
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

export default LedgerBook;
