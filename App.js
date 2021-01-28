import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BrowserScreen from './src/screens/BrowserScreen';
import RemoteScreen from './src/screens/RemoteScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import NewTabView from './src/screens/NewTabView'; 
import {Provider as SearchUriProvider} from './src/context/SearchUriContext';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import {NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';

const stackNavigator  = createStackNavigator({
  Browser: BrowserScreen,
  Home: NewTabView,
  Remote: RemoteScreen,
  Settings: SettingsScreen
}, {
  initialRouteName: 'Home'
});

const App = createAppContainer(stackNavigator);

export default () => {
  const scheme = useColorScheme();
  return (
      <SearchUriProvider>
        <AppearanceProvider>
          <NavigationContainer theme = {scheme === 'dark' ? DarkTheme : DefaultTheme}>
            <App theme = {scheme === 'dark' ? 'dark' : 'light'}/>
          </NavigationContainer>
        </AppearanceProvider>
        </SearchUriProvider>
  );
}

const styles = StyleSheet.create({
  
});
