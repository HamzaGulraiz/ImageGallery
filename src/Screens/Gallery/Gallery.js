import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import ImagesPath from '../../Utils/ImagesPath/ImagesPath';

import DrawerButton from '../../Components/Button/DrawerButton';
import BannerImage from '../../Components/BannerImage/BannerImage';
import GalleryFlatList from '../../Components/FlatLIst/GalleryFlatList';

const Gallery = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.drawerContainer}>
        <DrawerButton
          name={'three-bars'}
          onpress={() => navigation.openDrawer()}
        />
      </View>
      <View style={{flex: 0.95, padding: '2%'}}>
        <View style={styles.titleBanner}>
          <BannerImage
            imgSource={ImagesPath.LoginImagePath}
            title={'Gallery'}
          />
        </View>
        <View style={styles.gallerFlatList}>
          <GalleryFlatList />
        </View>
      </View>
    </View>
  );
};

export default Gallery;

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
  gallerFlatList: {
    flex: 0.75,
  },
});
