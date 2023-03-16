import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import 'react-native-gesture-handler';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import CustomDrawer from './src/Components/CustomDrawerComponent/CustomDrawer';
import Icon from 'react-native-vector-icons/Octicons';
import Login from './src/Screens/Login/Login';
import Register from './src/Screens/Register/Register';
import Home from './src/Screens/Home/Home';
import Gallery from './src/Screens/Gallery/Gallery';
import Colors from './src/Utils/Colors/Colors';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DrawerNavigation"
        component={DrawerNavigation}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
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
      <MyStack />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
