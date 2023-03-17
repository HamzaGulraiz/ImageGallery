import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, useIsFocused} from '@react-navigation/native';
import {store} from './src/redux/Store';
import {Provider} from 'react-redux';
import CustomDrawer from './src/Components/CustomDrawerComponent/CustomDrawer';
import Icon from 'react-native-vector-icons/Octicons';
import Login from './src/Screens/Login/Login';
import Register from './src/Screens/Register/Register';
import Home from './src/Screens/Home/Home';
import Gallery from './src/Screens/Gallery/Gallery';
import Colors from './src/Utils/Colors/Colors';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

function MyStack() {
  const isFocused = useIsFocused();
  /////Check for user token
  const [routeName, setRouteName] = useState('');
  useEffect(() => {
    if (isFocused) {
      getTokenItem();
    }
  }, [isFocused]);

  const getTokenItem = async () => {
    let tokenVal = '';
    await AsyncStorage.getItem('userToken').then(value => {
      tokenVal = value;
      if (!value) {
        setRouteName('Login');
      } else {
        setRouteName('DrawerNavigation');
      }
    });
  };

  return routeName != '' ? (
    <Stack.Navigator initialRouteName={routeName}>
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="DrawerNavigation"
        component={DrawerNavigation}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  ) : null;
}

const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: Colors.button,
        drawerActiveTintColor: 'black',
        itemStyle: {marginVertical: 5},
      }}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          drawerIcon: ({focused, size}) => (
            <Icon name="home" size={20} color={focused ? 'black' : '#ccc'} />
          ),
        }}
      />
      <Drawer.Screen
        name="Gallery"
        component={Gallery}
        options={{
          headerShown: false,
          drawerIcon: ({focused, size}) => (
            <Icon name="apps" size={20} color={focused ? 'black' : '#ccc'} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <MyStack />
      </Provider>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
