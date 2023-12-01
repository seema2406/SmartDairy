import React, {
  JSXElementConstructor,
  ReactElement,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  View,
  ViewStyle,
  FlatListProps,
  StyleProp,
  TextProps,
  TextStyle,
  Pressable,
  Keyboard,
} from 'react-native';
import { useDropdownStyle } from './DropdownStyle';
import AppText from '../text/AppText';
import SVGIcon from '../../assets/svg';
import { MODALS } from '../../constants/routeConstant';
import { COLORS } from '../../theme';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import modalfy from '../../helpers/modalfy';
import { useTranslation } from 'react-i18next';

interface DropdownProps<T> {
  error?: string | undefined;
  style?: StyleProp<ViewStyle>;
  dropdownStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  placeholderStyle?: StyleProp<TextStyle>;
  selectedTextStyle?: StyleProp<TextStyle>;
  selectedTextProps?: TextProps;
  itemContainerStyle?: StyleProp<ViewStyle>;
  itemTextStyle?: StyleProp<TextStyle>;
  data: T[];
  value?: T | string | number | null | undefined;
  headerTitle?: string;
  placeholder?: string;
  labelField: keyof T;
  valueField: keyof T;
  disable?: boolean;
  required?: boolean;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  flatListProps?: Omit<FlatListProps<any>, 'renderItem' | 'data'>;
  confirmSelectItem?: boolean;
  renderRightIcon?: (visible?: boolean) => JSX.Element | null | undefined;
  renderItem?: (item: T, selected?: boolean) => JSX.Element | null | undefined;
  onFocus?: () => void;
  onBlur?: () => void;
  onConfirmSelectItem?: (item: T) => void;
}

const Dropdown: <T>(
  props: DropdownProps<T>,
) => ReactElement<any, string | JSXElementConstructor<any>> | null =
  React.forwardRef((props, currentRef) => {
    const {
      style = {},
      placeholderStyle = { color: COLORS.primary },
      selectedTextStyle = { color: COLORS.black },
      dropdownStyle,
      containerStyle,
      itemContainerStyle,
      itemTextStyle,
      selectedTextProps = {},
      data = [],
      required,
      label,
      labelStyle,
      labelField,
      valueField,
      value,
      headerTitle = 'Select item',
      placeholder,
      disable = false,
      renderRightIcon,
      renderItem,
      onFocus,
      onBlur,
      error,
      flatListProps,
      confirmSelectItem = true,
      onConfirmSelectItem = () => {},
    } = props;

    const styles = useDropdownStyle();
    const { t } = useTranslation();

    const ref = useRef<View>(null);
    const [visible, setVisible] = useState<boolean>(false);
    const [currentValue, setCurrentValue] = useState<any>(null);

    useImperativeHandle(currentRef, () => {
      return { open: eventOpen, close: eventClose };
    });

    const eventOpen = () => {
      if (!disable) {
        setVisible(true);
        if (onFocus) {
          onFocus();
        }
      }
    };

    const eventClose = useCallback(() => {
      if (!disable) {
        setVisible(false);
        if (onBlur) {
          onBlur();
        }
      }
    }, [disable, onBlur]);

    const getValue = useCallback(() => {
      const defaultValue =
        typeof value === 'object' ? get(value, valueField) : value;

      const getItem = data.filter((e: any) =>
        isEqual(defaultValue, get(e, valueField)),
      );

      if (getItem?.length > 0) {
        setCurrentValue(getItem[0]);
      } else {
        setCurrentValue(null);
      }
    }, [data, value, valueField]);

    useEffect(() => {
      getValue();
    }, [value, data, getValue]);

    const onClose = () => {
      modalfy.close(MODALS.dropdown);
    };
    const onSelect = useCallback(
      (item: any) => {
        if (confirmSelectItem && onConfirmSelectItem) {
          onConfirmSelectItem(item);
        }
        setCurrentValue(item);
        eventClose();
      },
      [confirmSelectItem, eventClose, onConfirmSelectItem],
    );

    const showOrClose = useCallback(() => {
      Keyboard.dismiss();
      if (!disable) {
        setVisible(!visible);

        if (!visible) {
          if (onFocus) {
            onFocus();
          }
          modalfy.open(MODALS.dropdown, {
            headerTitle,
            data,
            currentValue,
            valueField,
            containerStyle,
            itemContainerStyle,
            itemTextStyle,
            labelField,
            flatListProps,
            onClose,
            renderItem,
            onSelect,
          });
        } else {
          if (onBlur) {
            onBlur();
          }
          modalfy.close(MODALS.dropdown);
        }
      }
    }, [
      disable,
      visible,
      onFocus,
      headerTitle,
      data,
      currentValue,
      valueField,
      containerStyle,
      itemContainerStyle,
      itemTextStyle,
      labelField,
      flatListProps,
      renderItem,
      onSelect,
      onBlur,
    ]);

    const _renderDropdown = () => {
      const isSelected = currentValue && get(currentValue, valueField);
      return (
        <Pressable
          style={[styles.dropdown, dropdownStyle]}
          onPress={showOrClose}>
          <AppText
            fontWeight="regular"
            style={[
              styles.textItem,
              styles.textItemLeft,
              isSelected !== null ? selectedTextStyle : styles.placeholderStyle,
            ]}
            {...selectedTextProps}>
            {isSelected !== null
              ? get(currentValue, labelField)
              : placeholder || headerTitle}
          </AppText>
          {renderRightIcon ? (
            renderRightIcon(visible)
          ) : (
            <SVGIcon.arrowDown fill={COLORS.primary} height={11} width={11} />
          )}
        </Pressable>
      );
    };

    return (
      <View style={styles.mainContainer}>
        {label ? (
          <AppText
            size={14}
            fontWeight="medium"
            style={[styles.label, labelStyle]}>
            {label}
            {required ? (
              <AppText style={[styles.label, styles.required]}>*</AppText>
            ) : null}
          </AppText>
        ) : null}
        <View style={[styles.mainWrap, style]} ref={ref}>
          {_renderDropdown()}
          {error && <AppText style={styles.error}>{error}</AppText>}
        </View>
      </View>
    );
  });

export default Dropdown;
