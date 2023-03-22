import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Octicons';

const DrawerButton = ({onpress, name}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onpress}>
        <Icon name={name} size={22} color={'black'} />
      </TouchableOpacity>
    </View>
  );
};

export default DrawerButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '2%',
    justifyContent: 'center',
  },
});
