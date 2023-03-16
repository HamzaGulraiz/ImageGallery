import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';

import ImagesPath from '../../Utils/ImagesPath/ImagesPath';

import InputField from '../../Components/TextInputFields/InputField';

import BannerImage from '../../Components/BannerImage/BannerImage';
import TouchableButton from '../../Components/Button/TouchableButton';

import ErrorMsg from '../../Utils/Strings/ErrorString/ErrorMsg';

const Register = ({navigation}) => {
  ////// activity indicator
  const [isLoaded, setIsLoaded] = useState(true);
  ///// User information
  const [firstName, SetFirstName] = useState('');
  const [lastName, SetLastName] = useState('');
  const [email, SetEmail] = useState('');
  const [password, SetPassword] = useState('');

  //User Information After Validation
  const [userInfoValid, setUserInfoValid] = useState({
    firstNameValid: false,
    lastNameValid: false,
    emailValid: false,
    passwordValid: false,
  });

  const [informationError, setInformationError] = useState('');
  const registerValidation = () => {
    setIsLoaded(false);
    console.log(userInfoValid);
    console.log(firstName, lastName, email, password);
    if (
      userInfoValid.firstNameValid === false ||
      userInfoValid.lastNameValid === false ||
      userInfoValid.emailValid === false ||
      userInfoValid.passwordValid === false
    ) {
      setInformationError(ErrorMsg.allFieldRequired);
      setTimeout(() => {
        setInformationError('');
        setIsLoaded(true);
      }, 2000);
    } else {
      navigation.navigate('Login');
      setIsLoaded(true);
    }
  };

  /**Set Errors on state  */
  const [firstNameError, SetFirstNameError] = useState('');
  const isValidFirstName = value => {
    if (value.length == 0) {
      SetFirstNameError(ErrorMsg.required);
      setUserInfoValid({
        ...userInfoValid,
        firstNameValid: false,
      });
    } else if (!value.trimEnd() || value.length <= 3 || value.length > 10) {
      SetFirstNameError(ErrorMsg.minimum3char);
      setUserInfoValid({
        ...userInfoValid,
        firstNameValid: false,
      });
    } else {
      SetFirstNameError('');
      setUserInfoValid({
        ...userInfoValid,
        firstNameValid: true,
      });
      //    console.log(userInfoValid);
    }
    //  console.log(userInfoValid);
  };

  const [lastNameError, setLastNameError] = useState('');
  const isValidLastName = value => {
    if (value.length == 0) {
      setLastNameError(ErrorMsg.required);
      setUserInfoValid({
        ...userInfoValid,
        lastNameValid: false,
      });
    } else if (!value.trimEnd() || value.length <= 3 || value.length > 10) {
      setLastNameError(ErrorMsg.minimum3char);
      setUserInfoValid({
        ...userInfoValid,
        lastNameValid: false,
      });
      //   console.log(userInfoValid);
    } else {
      setLastNameError('');
      setUserInfoValid({
        ...userInfoValid,
        lastNameValid: true,
      });
      //   console.log(userInfoValid);
    }
    //console.log(userInfoValid);
  };

  const [emailError, setEmailError] = useState('');
  const emailValidation = value => {
    let regx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (value.length == 0) {
      setEmailError(ErrorMsg.required);
      setUserInfoValid({
        ...userInfoValid,
        emailValid: false,
      });
    } else if (regx.test(value) === false) {
      setEmailError(ErrorMsg.invalidEmailFormat);
      setUserInfoValid({
        ...userInfoValid,
        emailValid: false,
      });
      //  console.log(userInfoValid);
    } else if (regx.test(value) === true) {
      setEmailError('');
      setUserInfoValid({
        ...userInfoValid,
        emailValid: true,
      });
      //  console.log(userInfoValid);
    }
  };

  const [passwordError, setPasswordError] = useState('');
  const passwordValidation = value => {
    let reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
    if (value.length == 0) {
      setPasswordError(ErrorMsg.required);
      setUserInfoValid({
        ...userInfoValid,
        passwordValid: false,
      });
    } else if (!value.trimEnd() || value.length <= 6 || value.length > 15) {
      setPasswordError(ErrorMsg.minimum6char);
      setUserInfoValid({
        ...userInfoValid,
        passwordValid: false,
      });
      //  console.log(userInfoValid);
    } else if (reg.test(value) === false) {
      setPasswordError(ErrorMsg.invalidPasswordFormat);
      setUserInfoValid({
        ...userInfoValid,
        passwordValid: false,
      });
    } else if (reg.test(value) === true) {
      setPasswordError('');
      setUserInfoValid({
        ...userInfoValid,
        passwordValid: true,
      });
    }
  };

  const handleOnChangeText = (getValue, fieldName) => {
    switch (fieldName) {
      case 'firstName':
        isValidFirstName(getValue);
        //  console.log(getValue, fieldName);
        break;
      case 'lastName':
        isValidLastName(getValue);
        //  console.log(getValue, fieldName);
        break;
      case 'email':
        //  console.log(getValue, fieldName);
        emailValidation(getValue);
        break;
      case 'password':
        //  console.log(getValue, fieldName);
        passwordValidation(getValue);
        break;
      default:
      // code block
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.bannerContainer}>
        <BannerImage imgSource={ImagesPath.LoginImagePath} title={'Register'} />
      </View>
      <ScrollView style={styles.ScrollView}>
        {informationError ? (
          <Text style={{color: 'red', fontSize: 12, textAlign: 'center'}}>
            {informationError}
          </Text>
        ) : null}
        <View style={styles.inputContainer}>
          <InputField
            titleInput={'First Name'}
            holderInput={'First Name'}
            value={firstName}
            onChangeText={value => {
              handleOnChangeText(value, 'firstName'), SetFirstName(value);
            }}
            keyboardType={'default'}
          />
          {firstNameError ? (
            <Text style={{color: 'red', fontSize: 12, textAlign: 'center'}}>
              {firstNameError}
            </Text>
          ) : null}
        </View>
        <View style={styles.inputContainer}>
          <InputField
            titleInput={'Last Name'}
            holderInput={'Last Name'}
            value={lastName}
            onChangeText={value => {
              handleOnChangeText(value, 'lastName'), SetLastName(value);
            }}
          />
          {lastNameError ? (
            <Text style={{color: 'red', fontSize: 12, textAlign: 'center'}}>
              {lastNameError}
            </Text>
          ) : null}
        </View>
        <View style={styles.inputContainer}>
          <InputField
            titleInput={'Email'}
            holderInput={'Enter your email here'}
            value={email}
            onChangeText={value => {
              handleOnChangeText(value, 'email'), SetEmail(value);
            }}
          />
          {emailError ? (
            <Text style={{color: 'red', fontSize: 12, textAlign: 'center'}}>
              {emailError}
            </Text>
          ) : null}
        </View>
        <View style={styles.inputContainer}>
          <InputField
            titleInput={'Password'}
            holderInput={'Password'}
            value={password}
            onChangeText={value => {
              handleOnChangeText(value, 'password'), SetPassword(value);
            }}
          />
          {passwordError ? (
            <Text style={{color: 'red', fontSize: 12, textAlign: 'center'}}>
              {passwordError}
            </Text>
          ) : null}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableButton
            isLoaded={isLoaded}
            title={'Register'}
            miniTitle={'Sign in'}
            onClick={() => {
              registerValidation();
            }}
            newOldUser={'Already have an accout '}
            newOldUserClick={() => navigation.navigate('Login')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerContainer: {
    flex: 0.4,
  },
  ScrollView: {
    flex: 0.6,
    padding: '4%',
  },
  buttonContainer: {
    flex: 0.2,
    padding: '2%',
  },
  inputContainer: {
    flex: 0.2,
  },
});
