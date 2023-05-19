import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
//import ImagePicker from 'react-native-image-crop-picker';
import DrawerButton from '../../Components/Button/DrawerButton';
import AddPictureButton from '../../Components/Button/AddPictureButton';
import BannerImage from '../../Components/BannerImage/BannerImage';
import ImageContainer from '../../Components/ImageContainer/ImageContainer';
import ImagesPath from '../../Utils/ImagesPath/ImagesPath';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-root-toast';
import Config from '../../Config';

import {useSelector, useDispatch} from 'react-redux';

const Home = ({navigation}) => {
  const defaultImage = ImagesPath.ImageGalleryDefaultPicture;

  ////// activity indicator
  const [isLoaded, setIsLoaded] = useState(true);

  const USER_TOKEN = useSelector(store => store);

  const [uploadImage, setUploadImage] = useState('');
  const [imageData, setImageData] = useState();
  const [tokenValue, setTokenValue] = useState();

  const choseImage = async () => {
    // const res = ImagePicker.openPicker({
    //   multiple: true,
    // }).then(images => {
    //   console.log(images);
    // });

    const options = {
      noData: true,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel === true) {
        console.log('user cancelled');
        setUploadImage('');
      } else {
        let source = {uri: response.assets[0].uri};
        setUploadImage(source);
        setImageData(response.assets[0]);
        console.log('image loaded successfully');
      }
    });
  };

  useEffect(() => {
    AsyncStorage.getItem('userToken').then(value => {
      // console.log('async storge', value);
      setTokenValue(prev => {
        return value;
      });
    });

    console.log('user token ', tokenValue);
  });

  const AddImageToDataBase = () => {
    setIsLoaded(false);
    if (uploadImage != '') {
      //getAsyncData();
      ////////////Get token data
      //  console.log('redux storge', USER_TOKEN);
      const FormData = require('form-data');
      let data = new FormData();
      data.append('image', {
        uri: imageData.uri,
        type: imageData.type,
        name: imageData.fileName,
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${Config.base_Url}uploadImage`,
        headers: {
          Authorization: `Bearer ${tokenValue}`,
          'content-type': 'multipart/form-data',
        },
        data: data,
      };

      axios
        .request(config)
        .then(response => {
          // console.log(JSON.stringify(response.data));
          Toast.show('Image is uploaded successfully', {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
          });
          console.log('image uploaded successfully into database through api ');
          setUploadImage('');
          setIsLoaded(true);
          navigation.navigate('Gallery');
        })
        .catch(error => {
          console.log('catch axios image api ', error.response.message);
          Toast.show('Try again', {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
          });
          setIsLoaded(true);
        });
    } else {
      setIsLoaded(true);
      Toast.show('Chose Image to upload', {
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
    <View style={styles.container}>
      <View style={styles.drawerContainer}>
        <DrawerButton
          name={'three-bars'}
          onpress={() => {
             navigation.openDrawer();
            console.log('drawer');
          }}
        />
      </View>
      <View style={{flex: 1, padding: '2%', paddingTop: '1%'}}>
        <View style={styles.titleBanner}>
          <BannerImage
            imgSource={ImagesPath.LoginImagePath}
            title={'Upload image'}
          />
        </View>
        <View style={styles.imageContainer}>
          {uploadImage === '' ? (
            <ImageContainer imgSource={defaultImage} />
          ) : (
            <ImageContainer imgSource={uploadImage} />
          )}
        </View>
        <View style={styles.choseImgButton}>
          <AddPictureButton
            isLoaded={true}
            onButtonCLick={() => {
              choseImage();
            }}
            title={'Chose Image'}
          />
          <Text style={{fontSize: 32, color: 'black'}}> | </Text>
          <AddPictureButton
            isLoaded={true}
            onButtonCLick={() => {
              setUploadImage('');
            }}
            title={'Remove'}
          />
        </View>
        <View style={styles.AddImgButton}>
          <AddPictureButton
            isLoaded={isLoaded}
            onButtonCLick={() => {
              AddImageToDataBase();
            }}
            title={'Add to Gallery'}
          />
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerContainer: {
    flex: 0.06,
  },
  titleBanner: {
    flex: 0.2,
  },
  imageContainer: {
    flex: 0.5,
  },
  choseImgButton: {
    flexDirection: 'row',
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4%',
  },
  AddImgButton: {
    flex: 0.15,
    padding: '4%',
  },
});
