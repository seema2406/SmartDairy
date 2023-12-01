import { StyleSheet } from 'react-native';
import { useMemo } from 'react';

export const useStyle = () => {
  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flex: 1,
      },
    });
  }, []);

  return styles;
};
