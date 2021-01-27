import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BrowserScreen from './src/screens/BrowserScreen';
import RemoteScreen from './src/screens/RemoteScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import NewTabView from './src/screens/NewTabView'; 
import {Provider as SearchUriProvider} from './src/context/SearchUriContext';

const stackNavigator  = createStackNavigator({
  Browser: BrowserScreen,
  NewTab: NewTabView,
  Remote: RemoteScreen,
  Settings: SettingsScreen
}, {
  initialRouteName: 'NewTab'
});

const App = createAppContainer(stackNavigator);

export default () => {
  return (
    <SearchUriProvider>
      <App />
    </SearchUriProvider>
  );
}

const styles = StyleSheet.create({
  
});
