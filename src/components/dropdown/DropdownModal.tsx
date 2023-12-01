import React from 'react';
import { View, FlatList, Pressable } from 'react-native';
import { useDropdownStyle } from './DropdownStyle';
import AppText from '../text/AppText';
import AppButton from '../button/AppButton';
import { COLORS } from '../../theme';
import SVGIcon from '../../assets/svg';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import { useTranslation } from 'react-i18next';

const DropdownModal = ({ modal: { params } }: any) => {
  const {
    data,
    currentValue,
    containerStyle,
    itemContainerStyle,
    itemTextStyle,
    labelField = 'label',
    valueField = 'value',
    headerTitle,
    onClose = () => {},
    onSelect = () => {},
    renderItemSeparator,
    renderItem,
    flatListProps,
  } = params;
  const styles = useDropdownStyle();
  const { t } = useTranslation();

  const onClickItem = (item: any) => {
    onClose();
    onSelect(item);
  };

  const _renderItem = ({ item, index }: any) => {
    const isSelected = currentValue && get(currentValue, valueField);
    const selected = isEqual(get(item, valueField), isSelected);
    return (
      <Pressable
        key={'items' + index.toString()}
        style={[
          styles.rowView,
          itemContainerStyle,
          selected && {
            backgroundColor: COLORS.cyanBG,
          },
        ]}
        onPress={() => {
          onClickItem(item);
        }}>
        {renderItem ? (
          renderItem(item)
        ) : (
          <View style={styles.item}>
            <AppText style={[styles.textItem, itemTextStyle]}>
              {t(get(item, labelField))}
            </AppText>
          </View>
        )}
      </Pressable>
    );
  };

  const renderBottomLoader = () => {
    return (
      <View style={[styles.cancelButton]}>
        <View style={styles.hrLine} />
        <AppButton
          type="text"
          title={t('Cancel')}
          onPress={onClose}
          labelStyle={styles.cancelButtonText}
        />
      </View>
    );
  };

  const _renderItemSeparator = () => {
    if (renderItemSeparator) {
      renderItemSeparator;
    }
    return <View style={styles.itemSeparator} />;
  };

  return (
    <Pressable style={styles.modalStyle} onPress={onClose}>
      <Pressable style={{ ...styles.modalContainer, ...containerStyle }}>
        <AppText style={styles.headerText} fontWeight="bold">
          {headerTitle}
        </AppText>
        <Pressable style={styles.cancelIcon} onPress={onClose}>
          <SVGIcon.closeIcon fill={COLORS.white} width={11} height={11} />
        </Pressable>
        <FlatList
          {...flatListProps}
          data={data}
          extraData={[...data]}
          renderItem={_renderItem}
          bounces={false}
          keyExtractor={(item, index) => index?.toString()}
          ListFooterComponent={renderBottomLoader}
          ItemSeparatorComponent={_renderItemSeparator}
        />
      </Pressable>
    </Pressable>
  );
};

export default DropdownModal;
