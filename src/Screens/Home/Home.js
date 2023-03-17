import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import DrawerButton from '../../Components/Button/DrawerButton';
import AddPictureButton from '../../Components/Button/AddPictureButton';
import BannerImage from '../../Components/BannerImage/BannerImage';
import ImageContainer from '../../Components/ImageContainer/ImageContainer';
import ImagesPath from '../../Utils/ImagesPath/ImagesPath';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useSelector, useDispatch} from 'react-redux';

const Home = ({navigation}) => {
  const defaultImage = ImagesPath.ImagePickerDefaultPicture;

  const USER_TOKEN = useSelector(store => store);

  const [uploadImage, setUploadImage] = useState('');
  const choseImage = () => {
    const options = {
      noData: true,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel === true) {
        console.log('user cancelled');
      } else {
        let source = {uri: response.assets[0].uri};
        setUploadImage(source);
        console.log(source);
        console.log('image uploaded successfully');
      }
    });
  };

  const getTokenItem = () => {
    AsyncStorage.getItem('userToken').then(value => {
      console.log('async storge', value);
      console.log('redux storge', USER_TOKEN);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.drawerContainer}>
        <DrawerButton onpress={() => navigation.openDrawer()} />
      </View>
      <View style={{flex: 1, padding: '2%'}}>
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
            onButtonCLick={() => {
              choseImage();
            }}
            title={'Chose Image'}
          />
          <Text style={{fontSize: 32}}> | </Text>
          <AddPictureButton
            onButtonCLick={() => {
              setUploadImage('');
            }}
            title={'Remove'}
          />
        </View>
        <View style={styles.AddImgButton}>
          <AddPictureButton
            onButtonCLick={() => {
              getTokenItem();
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
    flex: 0.05,
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
