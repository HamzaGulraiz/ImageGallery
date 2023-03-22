import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  Alert,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import Config from '../../Config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-root-toast';
import {useIsFocused} from '@react-navigation/native';
import CustomAlert from '../Alert/CustomAlert';

const GalleryFlatList = () => {
  const [tokenValue, setTokenValue] = useState('');
  const [data, setData] = useState();
  const [loadingState, setLoadingState] = useState(false);
  const [fetchDataTimer, setFetchDataTimer] = useState(true);
  const [selectedImage, SetSelectedImage] = useState('');
  const [selectedImageId, setSelectedImageId] = useState();
  const isFocused = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const [alert, setAlert] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    apiData();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const getData = async () => {
      await AsyncStorage.getItem('userToken').then(value => {
        setTokenValue(value);
        console.log('async storge value gallery flat list ', value);
      });
    };
    getData();
  }, []);

  useEffect(() => {
    if (isFocused) {
      console.log('second useeffect gallery flat list');
      apiData();
    }
  }, [tokenValue, isFocused]);

  const apiData = async () => {
    console.log('token data from async for api data', tokenValue);
    setFetchDataTimer(true);
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${Config.base_Url}getUserImages`,
      headers: {
        Authorization: `Bearer ${tokenValue}`,
      },
    };

    await axios
      .request(config)
      .then(response => {
        if (response.data.data == '') {
          console.log(response.data.data, 'false response');
          setLoadingState(false);
          setTimeout(() => {
            setFetchDataTimer(false);
          }, 2000);
        } else {
          //console.log(response.data.data, 'true response');
          setData(response.data.data);
          setLoadingState(true);
        }
      })
      .catch(error => {
        console.log('flatlist api catch error', error.response);
      });
  };

  const deleteApiCall = () => {
    console.log('deleteapicall');

    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `${Config.base_Url}deleteImage/${selectedImageId}`,
      headers: {
        Authorization: `Bearer ${tokenValue}`,
      },
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data.data));

        setAlert(false);
        setModalVisible(!modalVisible);
        apiData();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const renderItem = ({item}) => {
    console.log(item);
    return (
      <TouchableOpacity
        style={styles.image}
        onPress={() => {
          SetSelectedImage(item.imageURL);
          setSelectedImageId(item._id);
          setModalVisible(true);
        }}>
        <Image
          style={{height: '100%', width: '100%'}}
          source={
            item.imageURL
              ? {uri: item.imageURL}
              : require('./../../../assets/ImagePickerDefault/imagepickerdefault.jpg')
          }
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* <ScrollView
        style={styles.scrollView}
        nestedScrollEnabled={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }> */}
      {modalVisible ? (
        <>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Image
                  source={{uri: selectedImage}}
                  style={styles.modalImage}
                />
                <View
                  style={{
                    flex: 0.1,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    borderWidth: 1,
                    borderRadius: 10,
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={{width: '50%'}}
                    onPress={() => {
                      setAlert(true);
                    }}>
                    <Text style={styles.deleteText}>Delete</Text>
                  </TouchableOpacity>
                  <Text style={{fontSize: 32}}> | </Text>
                  <TouchableOpacity
                    style={{width: '50%'}}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}>
                    <Text style={styles.closeText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          {alert ? (
            <CustomAlert
              title={'Are you sure'}
              message={''}
              cancelText={'Cancel'}
              confirmText={'Delete'}
              confirmButtonColor={'red'}
              confirmButtonTextColor={'white'}
              alertState={alert}
              onCancelPressed={() => {
                setAlert(false);
                setModalVisible(!modalVisible);
              }}
              onConfirmPressed={() => deleteApiCall()}
            />
          ) : null}

          {/* {
              data.map(()=>{


              })
            } */}
          {/* <FlatList
              data={data}
              numColumns={2}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              nestedScrollEnabled={true}
            /> */}
        </>
      ) : (
        <>
          {loadingState ? (
            <FlatList
              data={data}
              numColumns={2}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              nestedScrollEnabled={true}
            />
          ) : (
            <>
              {fetchDataTimer ? (
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 30,
                      color: 'black',
                    }}>
                    Fetching Data
                  </Text>
                </View>
              ) : (
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 30,
                      color: 'black',
                    }}>
                    No Data
                  </Text>
                </View>
              )}
            </>
          )}
        </>
      )}
      {/* </ScrollView> */}
    </View>
  );
};

export default GalleryFlatList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: '5%',
    padding: '2%',
  },
  modalView: {
    flex: 0.8,
    margin: '1%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: '5%',
    //alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  image: {
    // width: 150,
    // height: 150,
    // margin: 10,
    width: '45%', // set the image width to 45% of the parent container
    aspectRatio: 1, // maintain the aspect ratio of the image
    margin: 10,
  },

  ////////////////////
  modalImage: {
    flex: 0.9,
    marginTop: '1%',
    marginBottom: '2%',
    width: '100%',
    height: '80%',
  },
  deleteText: {
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
  },
  closeText: {
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
  },
});
