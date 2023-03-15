import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const ImageContainer = ({imgSource}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image style={styles.picture} source={imgSource} />
      </View>
    </View>
  );
};

export default ImageContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '2%',
  },
  imgContainer: {
    padding: '2%',
    borderWidth: 1,
    borderRadius: 10,
  },
  picture: {
    height: '100%',
    width: '100%',
  },
});
