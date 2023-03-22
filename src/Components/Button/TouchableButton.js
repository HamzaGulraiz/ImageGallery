import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import Colors from '../../Utils/Colors/Colors';

const TouchableButton = ({
  title,
  onClick,
  miniTitle,
  newOldUser,
  newOldUserClick,
  isLoaded,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onClick}>
        {isLoaded ? (
          <Text style={styles.buttonText}>{title}</Text>
        ) : (
          <ActivityIndicator size="small" color="black" />
        )}
      </TouchableOpacity>
      <View style={styles.row}>
        <Text style={{color: 'black'}}>{newOldUser}</Text>
        <TouchableOpacity onPress={newOldUserClick}>
          <Text style={styles.link}>{miniTitle}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TouchableButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: Colors.button,
    padding: '4%',
  },
  buttonText: {
    color: Colors.titleButtonText,
    fontWeight: 'bold',
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
    marginTop: '3%',
    justifyContent: 'flex-end',
    paddingHorizontal: '3%',
  },
  link: {
    fontWeight: 'bold',
    color: 'blue',
  },
});
