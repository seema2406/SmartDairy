import React from 'react';
import {
  TextInput,
  View,
  StyleProp,
  TextStyle,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import { COLORS } from '../../theme';
import AppText from '../text/AppText';
import { useAppTextInputStyle } from './AppTextInputStyle';
import { useTranslation } from 'react-i18next';

interface props {
  error?: string | undefined;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  required?: boolean;
  subLabel?: string;
  subLabelStyle?: StyleProp<TextStyle>;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  value?: string;
  onChangeText?: (e: string) => void;
  placeholder?: string;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  placeholderTextColor?: string;
  type?: 'password' | 'number' | 'email' | 'phone' | 'text';
  autoCapitalize?: 'characters' | 'words' | 'sentences' | 'none';
  onPressIn?: () => void | undefined;
  inputRef?: any;
  editable?: boolean;
  multiline?: boolean;
  prefix?: string;
  prefixStyle?: StyleProp<TextStyle>;
  rightView?: () => JSX.Element | null | undefined;
  hideError?: boolean;
  selection?: { start: number; end?: number | undefined } | undefined;
}

const AppTextInput = ({
  error,
  style,
  label,
  labelStyle,
  required,
  subLabel,
  subLabelStyle,
  textStyle,
  value,
  onChangeText,
  placeholder = 'placeholder',
  onBlur,
  placeholderTextColor,
  type,
  autoCapitalize = 'none',
  onFocus,
  inputRef,
  editable = true,
  multiline = false,
  prefix,
  prefixStyle,
  rightView,
  hideError,
  selection,
  ...rest
}: props) => {
  const styles = useAppTextInputStyle();
  const { t } = useTranslation();

  const getKeyboardType = () => {
    switch (type) {
      case 'email':
        return 'email-address';
      case 'number':
        return 'numeric';
      case 'phone':
        return 'phone-pad';
      default:
        return 'default';
    }
  };

  const renderTextInput = () => {
    return (
      <View
        style={[
          styles.container,
          style,
          error && !(hideError && value) ? styles.errorWrapper : {},
          prefix ? styles.prefixContainer : {},
        ]}>
        {prefix && (
          <AppText
            size={14}
            style={[styles.prefixTextStyles, textStyle, prefixStyle]}>
            {t(prefix)}
          </AppText>
        )}
        <TextInput
          onBlur={e => {
            if (onBlur) {
              onBlur(e);
            }
          }}
          ref={inputRef}
          keyboardType={getKeyboardType()}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor || COLORS.textGray}
          value={value}
          onChangeText={onChangeText}
          style={[styles.textInputStyles, textStyle]}
          autoCapitalize={autoCapitalize}
          onFocus={e => {
            if (onFocus) {
              onFocus(e);
            }
          }}
          {...rest}
          editable={editable}
          multiline={multiline}
          selection={selection}
        />
        {rightView && rightView()}
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      {label ? (
        <View style={styles.labelContainer}>
          <AppText
            size={14}
            fontWeight="medium"
            style={[styles.label, labelStyle]}>
            {t(label)}
            {subLabel ? (
              <AppText size={10} style={[styles.label, subLabelStyle]}>
                {t(subLabel)}
              </AppText>
            ) : null}
            {required ? (
              <AppText style={[styles.label, styles.required]}>*</AppText>
            ) : null}
          </AppText>
        </View>
      ) : null}
      {renderTextInput()}
      {error && !(hideError && value) && (
        <AppText style={styles.error}>{t(error)}</AppText>
      )}
    </View>
  );
};

export default AppTextInput;
