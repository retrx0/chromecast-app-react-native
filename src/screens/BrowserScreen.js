import React, {useContext, useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Feather} from '@expo/vector-icons';
import BottomNav from '../components/BottomNav';
import SearchBar from '../components/SearchBar';
import WebView from 'react-native-webview';
import { createStackNavigator } from 'react-navigation-stack';
import {Context as uriContext} from '../context/SearchUriContext';
import AddChannelDialog from '../components/AddChannelDialog';
import Dialog from "react-native-dialog";
// import {CastButton} from 'react-native-google-cast';

const BrowserScreen = ({navigation}) => {
    // const client = useRemoteMediaClient();
    // const discoveryManager = GoogleCast.getDiscoveryManager();
    // discoveryManager.startDiscovery();
    // const {state} = useContext(uriContext);
    const uri = {uri: navigation.state.params};
    console.log(uri)
    return (
        <View style = {styles.container}>
            <View style = {{flex: 1}}>
                {/* <SearchBar 
                    style = {{marginHorizontal: 10}} 
                    uri = {uri}
                /> */}
                <WebView 
                    style = {styles.webview} 
                    source = {uri}
                    onNavigationStateChange={(webViewState) => {console.log(webViewState.url)}}
                    incognito = {true}
                />
            </View>
            <BottomNav navigation = {navigation} style = {styles.bottom}></BottomNav>
        </View>
    );
};

_onNavigationStateChange = (webViewState) => {
    console.log(webViewState.url)
}

BrowserScreen.navigationOptions = () => {
    return {
        headerRight: () => 
            <TouchableOpacity>
                <Feather name = 'plus' size = {30} style = {styles.castButton}/>
            </TouchableOpacity>
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    webview: {
    },
    bottom: {
        alignSelf: 'flex-end',
        marginBottom: 20
    },
    castButton: {
        paddingHorizontal: 10
    }
});

export default BrowserScreen;