import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-root-toast';

import ImagesPath from '../../Utils/ImagesPath/ImagesPath';

import InputField from '../../Components/TextInputFields/InputField';

import BannerImage from '../../Components/BannerImage/BannerImage';
import TouchableButton from '../../Components/Button/TouchableButton';

import ErrorMsg from '../../Utils/Strings/ErrorString/ErrorMsg';

import {useDispatch} from 'react-redux';
import {userTokenRedux} from '../../redux/Action';

const Login = ({navigation}) => {
  /////// redux dispatch
  const dispatch = useDispatch();
  ////// activity indicator
  const [isLoaded, setIsLoaded] = useState(true);
  ///// User information
  const [email, SetEmail] = useState('');
  const [password, SetPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  //User Information After Validation
  const [userInfoValid, setUserInfoValid] = useState({
    emailValid: false,
    passwordValid: false,
  });

  const [informationError, setInformationError] = useState('');
  const loginValidation = () => {
    //console.log(userInfoValid);
    if (
      userInfoValid.emailValid === false ||
      userInfoValid.passwordValid === false
    ) {
      setInformationError(ErrorMsg.allFieldRequired);
      setTimeout(() => {
        setInformationError('');
      }, 2000);
    } else {
      //navigation.navigate('DrawerNavigation');
      //setIsLoaded(true);
      LoginUser();
    }
  };

  const LoginUser = () => {
    setIsLoaded(false);

    let data = JSON.stringify({
      email: email,
      password: password,
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${Config.base_Url}login`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        console.log(response.data.data.token);

        ////Storing token in async/////
        const tokenValue = response.data.data.token;
        console.log('token sent by async login', tokenValue);
        AsyncStorage.setItem('userToken', tokenValue);

        ////Redux storage
        dispatch(
          userTokenRedux({
            token: tokenValue,
          }),
        );

        setIsLoaded(true);
        navigation.navigate('DrawerNavigation');
      })
      .catch(error => {
        console.log('Login axois Catch', error.response.data.message);
        setErrorMessage(error.response.data.message);
        setIsLoaded(true);
        Toast.show(errorMessage, {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
      });
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
    let reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,}$/;
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
        <BannerImage imgSource={ImagesPath.LoginImagePath} title={'Login'} />
      </View>
      <ScrollView style={styles.ScrollView}>
        {informationError ? (
          <Text style={{color: 'red', fontSize: 12, textAlign: 'center'}}>
            {informationError}
          </Text>
        ) : null}
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
            title={'Login'}
            miniTitle={'Sign up'}
            onClick={() => {
              //navigation.navigate('DrawerNavigation');
              loginValidation();
            }}
            newOldUser={'Not a member '}
            newOldUserClick={() => navigation.navigate('Register')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;

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
