import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Octicons';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-root-toast';
import {useNavigation} from '@react-navigation/native';

const CustomDrawer = ({...props}) => {
  const navigation = useNavigation();

  const [UserFirstName, setUserFirstName] = useState('');
  const [UserLastName, setUserLastName] = useState('');

  const [alert, setAlert] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('userInfo').then(value => {
      let userObj = JSON.parse(value);
      console.log('userobj', userObj);
      setUserFirstName(userObj.firstName);
      setUserLastName(userObj.lastName);
      //console.log('user information', userObj.email);
    });
  });

  const logoutButton = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      console.log('token removed');
      await AsyncStorage.removeItem('userInfo');
      console.log('userInfo removed');
      navigation.navigate('Login');
    } catch (exception) {
      Toast.show('There was some error, Try again..', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
    }
  };

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: 'black'}}>
        <ImageBackground
          source={require('../../../assets/drawerbackground.png')}
          style={{padding: '10%'}}>
          <Text
            style={{
              color: 'black',
              fontSize: 26,
              fontWeight: 'bold',
              marginBottom: 5,
            }}>
            {UserFirstName} {UserLastName}
          </Text>
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity
          onPress={() => {
            // Alert.alert('Logout', 'Are you sure you want to logout', [
            //   {
            //     text: 'Cancel',
            //     onPress: () => console.log('Cancel Pressed'),
            //     style: 'cancel',
            //   },
            //   {
            //     text: 'OK',
            //     onPress: () => {
            //       logoutButton();
            //     },
            //   },
            // ]);
            setAlert(true);
          }}
          style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="sign-out" size={20} color={'black'} />
            <Text
              style={{
                fontSize: 15,
                //fontFamily: 'Roboto-Medium',
                marginLeft: 5,
                color: 'black',
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
        {alert ? (
          <CustomAlert
            title={'Are you sure you want to logout'}
            message={''}
            cancelText={'Cancel'}
            confirmText={'Logout'}
            confirmButtonColor={'#fef5d4'}
            confirmButtonTextColor={'black'}
            alertState={alert}
            onCancelPressed={() => {
              setAlert(false);
            }}
            onConfirmPressed={() => logoutButton()}
          />
        ) : null}
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({});
