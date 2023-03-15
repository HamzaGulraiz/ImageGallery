import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../../Utils/Colors/Colors';

const AddPictureButton = ({title, onButtonCLick}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onButtonCLick} style={styles.selectButton}>
        <Text style={styles.btnText}>{title}</Text>
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
