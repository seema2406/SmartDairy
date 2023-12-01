import React, { useCallback, useRef, useState } from 'react';
import { TextInput, View, TouchableOpacity, Pressable } from 'react-native';
import { useStyle } from './AutoComSearchBarStyle';
import SVGIcon from '../../assets/svg';
import { debounce } from 'lodash';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native-gesture-handler';
import AppText from '../text/AppText';

const AutoComSearchBar = ({
  onCancel,
  onSearch = () => {},
  containerStyle,
  searchedData,
  onSearchItemPress,
  inputRef,
}: any) => {
  const { styles, colors } = useStyle({ containerStyle });
  const [searchText, setSearchText] = useState('');
  const [isFocused, setFocus] = useState(false);

  const delayedQuery = useCallback(
    debounce((q: string) => onSearchListRefFn.current(q), 500),
    [],
  );
  const { t } = useTranslation();

  const onSearchTextApply = (query: string) => {
    onSearch(query);
  };

  const onSearchListRefFn = useRef(onSearchTextApply);
  onSearchListRefFn.current = onSearchTextApply;

  const onClear = () => {
    inputRef?.current?.setNativeProps?.({ text: '' });
    if (onSearch) {
      setSearchText('');
      onSearch('');
    }
  };
  const onSearchTextChange = (text: string) => {
    setSearchText(text);
    delayedQuery(text);
  };

  const renderItem = ({ item }: any) => {
    return (
      <Pressable
        style={styles.listItem}
        onPress={() => {
          onSearchItemPress(item);
        }}>
        <AppText>{item?.cPartynm}</AppText>
      </Pressable>
    );
  };

  const renderItemSeparator = () => <View style={styles.itemSeparator} />;

  const renderEmptyView = () => {
    return <></>;
  };

  const onFocus = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          ref={inputRef}
          style={styles.textInput}
          onChangeText={onSearchTextChange}
          placeholder={t('Placeholders.Search')}
          onFocus={onFocus}
          onBlur={onBlur}
          autoFocus={isFocused}
        />
        {searchText ? (
          <TouchableOpacity style={styles.closeIconContainer} onPress={onClear}>
            <SVGIcon.closeIcon
              fill={colors.textDarkDray}
              width={12}
              height={12}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.searchIcon}>
            <SVGIcon.searchIcon
              fill={colors.lightGray}
              width={18}
              height={18}
            />
          </View>
        )}
      </View>
      {isFocused && (
        <View style={styles.searchList}>
          <FlatList
            keyboardShouldPersistTaps="always"
            data={searchedData || []}
            renderItem={renderItem}
            style={styles.listContainer}
            ItemSeparatorComponent={renderItemSeparator}
            ListEmptyComponent={renderEmptyView}
            bounces={false}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </View>
  );
};

export default AutoComSearchBar;
