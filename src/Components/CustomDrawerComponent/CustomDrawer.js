import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import React from 'react';
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

  const logoutButton = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
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
            Hamza Gulraiz
          </Text>
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Logout', 'Are you sure you want to logout', [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => {
                  logoutButton();
                },
              },
            ]);
          }}
          style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="sign-out" size={20} color={'black'} />
            <Text
              style={{
                fontSize: 15,
                //fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({});
