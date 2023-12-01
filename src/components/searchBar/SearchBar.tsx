import React, { useCallback, useRef, useState } from 'react';
import { TextInput, View, TouchableOpacity } from 'react-native';
import { useSearchBarStyle } from './SearchBarStyle';
import SVGIcon from '../../assets/svg';
import { debounce } from 'lodash';
import { useTranslation } from 'react-i18next';

const SearchBar = ({ onCancel, onSearch = () => {}, containerStyle }: any) => {
  const { styles, colors } = useSearchBarStyle({ containerStyle });
  const inputRef = useRef<TextInput>(null);
  const [searchText, setSearchText] = useState('');
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

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          ref={inputRef}
          style={styles.textInput}
          onChangeText={onSearchTextChange}
          placeholder={t('Placeholders.Search')}
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
    </View>
  );
};

export default SearchBar;
