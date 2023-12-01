import React, { useCallback, useEffect, useState } from 'react';
import { useImportContactsStyle } from './ImportContactsStyle';
import {
  FlatList,
  KeyboardAvoidingView,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Contacts from 'react-native-contacts';
import PartyItem from '../../components/partyItem/PartyItem';
import EmptyView from '../../components/emptyView/EmptyView';
import { cloneDeep, filter, findIndex, includes, size } from 'lodash';
import { useCreatePartyMutation } from '../../services/partyService';
import LoadingIndicator from '../../components/loader/LoadingIndicator';
import { getFormData, showToaster } from '../../helpers/utils';
import AppButton from '../../components/button/AppButton';
import { useTranslation } from 'react-i18next';
import SearchBar from '../../components/searchBar/SearchBar';
import { useAppSelector } from '../../hooks/useRedux';
import SVG from '../../assets/svg';
import AppText from '../../components/text/AppText';

const ImportContacts = ({ navigation, route }: any) => {
  const { styles, colors } = useImportContactsStyle();
  const keyboardVerticalOffset = StatusBar?.currentHeight || 0;
  const { t } = useTranslation();

  const { userID } = useAppSelector(state => state.auth);
  const { selectedDairy } = useAppSelector(state => state.dairy);
  const [contactsData, setContactsData] = useState<any[]>([]);
  const [partyList, setPartyList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [createParty] = useCreatePartyMutation();
  const [selectedParties, setSelectedParties] = useState<any[]>([]);
  const [type, setType] = useState<'N' | 'P' | 'S'>('N');

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: t('HeaderTitle.PartyImport'),
      headerRight: () => (
        <TouchableOpacity style={styles.rightIcon} onPress={onSelectAll}>
          <SVG.selectAllIcon />
        </TouchableOpacity>
      ),
    });
  }, [navigation, partyList, styles, t]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      setLoading(true);
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
        buttonPositive: 'Allow',
      }).then(() => {
        loadContacts();
      });
    } else {
      loadContacts();
    }
  }, []);

  const loadContacts = () => {
    Contacts.getAllWithoutPhotos()
      .then((contacts: any) => {
        let contactsList: any[] = filter(
          contacts,
          item => size(item?.phoneNumbers) > 0,
        ).map((item: any) => {
          return {
            displayName: item?.displayName,
            phoneNumbers: item?.phoneNumbers[0]?.number
              ?.replace(/\D/g, '')
              .slice(-10),
            recordID: item?.recordID,
            address: item?.postalAddresses[0]?.postalAddresses || '',
          };
        });

        contactsList = filter(
          contactsList,
          item => size(item?.phoneNumbers) === 10,
        );
        setContactsData(contactsList);
        setPartyList(contactsList);
        setLoading(false);
      })
      .catch((_e: any) => {
        setLoading(false);
      });

    Contacts.checkPermission();
  };

  const onSelectAll = () => {
    setSelectedParties(
      size(selectedParties) === size(partyList) ? [] : partyList,
    );
  };
  const onImportPartiesPress = () => {
    if (size(selectedParties) <= 0) {
      showToaster('Select atleast one party', 'E');
      return;
    }
    const preparePayload = {
      Party: selectedParties.map((item: any) => {
        return {
          nPartyid: 0,
          nDairyid: selectedDairy?.nDairyid,
          cPartynm: item?.displayName,
          cMobile: item?.phoneNumbers,
          nUserid: userID,
          cType: type,
        };
      }),
    };

    createParty(getFormData(preparePayload)).then((res: any) => {
      if (res?.data?.success) {
        showToaster('Parties imported successfully', 'S');
        navigation.goBack();
      } else {
        showToaster(res?.data?.message || 'Something went wrong', 'E');
      }
    });
  };

  const onPressSelection = (data: any) => {
    const index = findIndex(selectedParties, (element: any) => {
      return element?.recordID === data?.recordID;
    });
    let newList = cloneDeep(selectedParties);
    if (index > -1) {
      newList = filter(newList, item => data?.recordID !== item?.recordID);
      setSelectedParties(newList);
    } else {
      setSelectedParties([...newList, data]);
    }
  };

  const handleSearch = (text: string) => {
    const query = text.toLowerCase();
    if (query) {
      setSelectedParties([]);
      const listData = cloneDeep(contactsData);
      const filteredData = filter(listData, item => {
        const { displayName, address, phoneNumbers } = item;
        if (
          includes(displayName.toLowerCase(), query) ||
          includes(address.toLowerCase(), query) ||
          includes(phoneNumbers.toLowerCase(), query)
        ) {
          return true;
        }
        return false;
      });
      setPartyList(filteredData);
    } else {
      const listData = cloneDeep(contactsData);
      setPartyList(listData);
    }
  };

  const checkIsSelected = useCallback(
    (id: string) => {
      const isSelected = selectedParties.some(element => {
        return element?.recordID === id;
      });
      return isSelected;
    },
    [selectedParties],
  );

  const renderItem = ({ item }: any) => {
    return (
      <PartyItem
        name={item?.displayName}
        address={item?.address}
        mobile={item?.phoneNumbers}
        data={item}
        onPressSelection={(data: any) => onPressSelection(data)}
        isSelected={checkIsSelected(item?.recordID)}
      />
    );
  };

  const renderItemSeparator = () => <View style={styles.itemSeparator} />;

  const renderEmptyView = () => {
    if (!loading && size(partyList) <= 0) {
      return <EmptyView contentName={'Import Party'} />;
    }
    return <></>;
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <LoadingIndicator />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAvoidingView
        style={styles.container}
        contentContainerStyle={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={keyboardVerticalOffset}
        enabled={false}>
        <View style={styles.container}>
          <View style={styles.typeContainer}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                type === 'P' && styles.activeTypeButton,
              ]}
              onPress={() => {
                setType('P');
              }}>
              <AppText
                size={16}
                color={type === 'P' ? colors.white : colors.black}>
                {t('Buttons.Purchase')}
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.typeButton,
                type === 'S' && styles.activeTypeButton,
              ]}
              onPress={() => {
                setType('S');
              }}>
              <AppText
                size={16}
                color={type === 'S' ? colors.white : colors.black}>
                {t('Buttons.Sales')}
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.typeButton,
                type === 'N' && styles.activeTypeButton,
              ]}
              onPress={() => {
                setType('N');
              }}>
              <AppText
                size={16}
                color={type === 'N' ? colors.white : colors.black}>
                {t('Buttons.Normal')}
              </AppText>
            </TouchableOpacity>
          </View>
          <SearchBar
            containerStyle={styles.searchBarContainer}
            onSearch={handleSearch}
          />
          <FlatList
            data={partyList}
            renderItem={renderItem}
            style={styles.listContainer}
            ItemSeparatorComponent={renderItemSeparator}
            contentContainerStyle={styles.contentContainerStyle}
            ListEmptyComponent={renderEmptyView}
          />
          <View style={styles.buttonContainer}>
            <AppButton
              title={t('Buttons.Import') + ` (${size(selectedParties)})`}
              onPress={onImportPartiesPress}
              radius={100}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ImportContacts;
