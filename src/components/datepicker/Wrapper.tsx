import { Modal, Platform, View } from 'react-native';
import { useDatePickerStyle } from './DateTimePickerStyle';
import React from 'react';

const WrapperView = ({ children }: any) => {
  const { styles } = useDatePickerStyle();

  return (
    <>
      {Platform.OS === 'ios' ? (
        <Modal visible={true} transparent={true}>
          <View style={styles.mainContainer}>
            <View style={styles.datePickerContainer}>{children}</View>
          </View>
        </Modal>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default WrapperView;
