import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import React from 'react';
import Colors from '../../Utils/Colors/Colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const BannerImage = ({title, imgSource}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.imgSize} source={imgSource} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default BannerImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgSize: {
    width: '100%',
    height: '50%',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    position: 'absolute',
    color: Colors.bannerTextColor,
  },
});
