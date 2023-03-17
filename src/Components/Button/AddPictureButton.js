import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import Colors from '../../Utils/Colors/Colors';

const AddPictureButton = ({title, onButtonCLick, isLoaded}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onButtonCLick} style={styles.selectButton}>
        {isLoaded ? (
          <Text style={styles.btnText}>{title}</Text>
        ) : (
          <ActivityIndicator size="small" color="black" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default AddPictureButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  selectButton: {
    borderRadius: 10,
    backgroundColor: Colors.button,
    padding: '4%',
  },
  btnText: {
    textAlign: 'center',
    color: Colors.titleButtonText,
    fontWeight: 'bold',
    fontSize: 18,
  },
});
