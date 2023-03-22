import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import AwesomeAlert from 'react-native-awesome-alerts';

export default CustomAlert = ({
  title,
  message,
  cancelText,
  confirmText,
  confirmButtonColor,
  alertState,
  onCancelPressed,
  onConfirmPressed,
  confirmButtonTextColor,
}) => {
  return (
    <View style={styles.container}>
      <AwesomeAlert
        show={alertState}
        showProgress={false}
        title={title}
        message={message}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText={cancelText}
        confirmText={confirmText}
        confirmButtonTextStyle={{color: confirmButtonTextColor}}
        confirmButtonColor={confirmButtonColor}
        onCancelPressed={onCancelPressed}
        onConfirmPressed={onConfirmPressed}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
