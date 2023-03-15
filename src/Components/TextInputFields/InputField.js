import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Octicons';

const InputField = ({titleInput, holderInput, value, onChangeText}) => {
  const [showPassword, SetShowPassword] = useState(true);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>{titleInput}</Text>
        {titleInput === 'Password' ? (
          <>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TextInput
                style={styles.inputPassword}
                onChangeText={onChangeText}
                value={value}
                placeholder={holderInput}
                secureTextEntry={showPassword}
              />
              {showPassword ? (
                <TouchableOpacity onPress={() => SetShowPassword(false)}>
                  <Icon name="eye-closed" size={20} color={'black'} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => SetShowPassword(true)}>
                  <Icon name="eye" size={20} color={'black'} />
                </TouchableOpacity>
              )}
            </View>
          </>
        ) : (
          <>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={value}
                placeholder={holderInput}
              />
            </View>
          </>
        )}
      </View>
    </>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    marginVertical: '1.5%',
    borderRadius: 10,
    padding: '3%',
  },
  title: {
    fontSize: 10,
    fontWeight: '400',
  },
  inputPassword: {
    height: '90%',
    width: '90%',
  },
  input: {
    height: '90%',
    width: '90%',
  },
});
