import React, { useCallback, useState } from 'react';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useDatePickerStyle } from './DateTimePickerStyle';
import {
  Pressable,
  StyleProp,
  TextProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { COLORS } from '../../theme';
import AppText from '../text/AppText';
import moment from 'moment';
import { DATE_FORMAT } from '../../constants/constants';
import WrapperView from './Wrapper';

type IOSMode = 'date' | 'time' | 'datetime' | 'countdown';
type AndroidMode = 'date' | 'time';
interface Props {
  isVisible?: boolean;
  mode?: IOSMode | AndroidMode;
  value: Date;
  maxDate?: Date;
  minDate?: Date;
  is24Hour?: boolean;
  display?: 'spinner' | 'default' | 'clock' | 'calendar' | 'inline' | 'compact';
  onSelected?: (event: DateTimePickerEvent, date: Date) => void;
  isShowPicker?: boolean;
  error?: string | undefined;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  placeholderStyle?: StyleProp<TextStyle>;
  selectedTextStyle?: StyleProp<TextStyle>;
  selectedTextProps?: TextProps;
  placeholder?: string;
  required?: boolean;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  renderView?: () => JSX.Element | null | undefined;
  renderRightIcon?: () => JSX.Element | null | undefined;
  onFocus?: () => void;
  onBlur?: () => void;
  timeOrdateformat?: string;
}
export const CustomDateTimePicker = ({
  mode = 'date',
  value,
  maxDate,
  minDate,
  is24Hour = true,
  display = 'default',
  onSelected = () => {},
  isShowPicker = false,
  style = {},
  placeholderStyle = { color: COLORS.textGray },
  selectedTextStyle = { color: COLORS.black },
  required,
  label,
  labelStyle,
  placeholder,
  renderView,
  renderRightIcon,
  error,
  timeOrdateformat = DATE_FORMAT.TIMESTAMP,
}: Props) => {
  const [showDatepicker, setShowDatepicker] = useState<boolean>(false);
  const { styles, colors } = useDatePickerStyle();

  const showPicker = useCallback(() => {
    setShowDatepicker(true);
  }, []);

  const onSelectValue = (_event: DateTimePickerEvent, _date: Date) => {
    setShowDatepicker(false);
    onSelected(_event, _date);
  };

  return (
    <>
      {label ? (
        <AppText fontWeight="bold" style={[styles.label, labelStyle]}>
          {label}
          {required ? (
            <AppText style={[styles.label, styles.required]}>*</AppText>
          ) : null}
        </AppText>
      ) : null}
      <View style={style}>
        {renderView ? (
          <Pressable style={styles.container} onPress={showPicker}>
            {renderView()}
          </Pressable>
        ) : (
          <Pressable style={styles.container} onPress={showPicker}>
            <View style={styles.textContainer}>
              <AppText
                style={[
                  styles.leftText,
                  value ? selectedTextStyle : placeholderStyle,
                ]}>
                {value
                  ? moment(value.toString()).format(timeOrdateformat)
                  : placeholder}
              </AppText>
            </View>

            {renderRightIcon ? renderRightIcon() : null}
          </Pressable>
        )}
        {error && <AppText style={styles.error}>{error}</AppText>}
      </View>
      {showDatepicker || isShowPicker ? (
        <WrapperView>
          <DateTimePicker
            value={value}
            style={styles.datePicker}
            mode={mode}
            maximumDate={maxDate}
            minimumDate={minDate}
            display={display}
            is24Hour={is24Hour}
            onChange={(event: DateTimePickerEvent, date: Date) =>
              onSelectValue(event, date)
            }
            accentColor={colors.calendarColor}
            onError={(error1: any) => {
              console.log(error1);
            }}
            timeZoneName="Asia/Kolkata"
          />
        </WrapperView>
      ) : null}
    </>
  );
};
export default CustomDateTimePicker;
