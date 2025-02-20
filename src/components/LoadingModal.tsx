import React, {FC} from 'react';
import {
  ActivityIndicator,
  Modal,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {onSurface} from '../../constants.ts';

const LoadingModal: FC<LoadingModalProps> = ({loading}) => {
  return (
    <Modal
      animationType={Platform.OS === 'ios' ? 'none' : 'fade'}
      visible={loading}
      transparent>
      <View style={styles.modalBackDrop}>
        <View>
          <ActivityIndicator
            size="large"
            color={Platform.OS === 'android' ? onSurface : undefined}
          />
        </View>
      </View>
    </Modal>
  );
};

interface LoadingModalProps {
  loading: boolean;
}

const styles = StyleSheet.create({
  modalBackDrop: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
});

export default LoadingModal;
