import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';

const GalleryFlatList = () => {
  const renderItem = ({item}) => {
    return <Image source={item.uri} style={styles.image} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={ITEMS}
        keyExtractor={item => item.id}
        numColumns={2}
        renderItem={renderItem}
      />
    </View>
  );
};

const ITEMS = [
  {
    id: 1,
    uri: require('../../../assets/flatlistdefault.jpg'),
  },
  {
    id: 2,
    uri: require('../../../assets/flatlistdefault.jpg'),
  },
  {
    id: 3,
    uri: require('../../../assets/flatlistdefault.jpg'),
  },
  {
    id: 4,
    uri: require('../../../assets/flatlistdefault.jpg'),
  },
  {
    id: 5,
    uri: require('../../../assets/flatlistdefault.jpg'),
  },
  {
    id: 6,
    uri: require('../../../assets/flatlistdefault.jpg'),
  },
  {
    id: 7,
    uri: require('../../../assets/flatlistdefault.jpg'),
  },
  {
    id: 8,
    uri: require('../../../assets/flatlistdefault.jpg'),
  },
  {
    id: 9,
    uri: require('../../../assets/flatlistdefault.jpg'),
  },
  {
    id: 10,
    uri: require('../../../assets/flatlistdefault.jpg'),
  },
  {
    id: 11,
    uri: require('../../../assets/flatlistdefault.jpg'),
  },
  {
    id: 12,
    uri: require('../../../assets/flatlistdefault.jpg'),
  },
  {
    id: 13,
    uri: require('../../../assets/flatlistdefault.jpg'),
  },
  {
    id: 14,
    uri: require('../../../assets/flatlistdefault.jpg'),
  },
  {
    id: 15,
    uri: require('../../../assets/flatlistdefault.jpg'),
  },
  {
    id: 16,
    uri: require('../../../assets/flatlistdefault.jpg'),
  },
  {
    id: 17,
    uri: require('../../../assets/flatlistdefault.jpg'),
  },
  {
    id: 18,
    uri: require('../../../assets/flatlistdefault.jpg'),
  },
  {
    id: 19,
    uri: require('../../../assets/flatlistdefault.jpg'),
  },
  {
    id: 20,
    uri: require('../../../assets/flatlistdefault.jpg'),
  },
];

export default GalleryFlatList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    // width: 150,
    // height: 150,
    // margin: 10,
    width: '45%', // set the image width to 45% of the parent container
    aspectRatio: 1, // maintain the aspect ratio of the image
    margin: 10,
  },
});
