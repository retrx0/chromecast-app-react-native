import React, {useContext, useState, useRef} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Modal, ActivityIndicator} from 'react-native';
import {Feather} from '@expo/vector-icons';
import BottomNav from '../components/BottomNav';
import SearchBar from '../components/SearchBar';
import WebView from 'react-native-webview';
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack';
import {Context as uriContext} from '../context/SearchUriContext';
import AddDialog from '../components/AddChannelDialog';
import Dialog from "react-native-dialog";
import { useTheme } from '@react-navigation/native';
// import {CastButton} from 'react-native-google-cast';

const BrowserScreen = ({navigation}) => {
    // const client = useRemoteMediaClient();
    // const discoveryManager = GoogleCast.getDiscoveryManager();
    // discoveryManager.startDiscovery();
    // const {state} = useContext(uriContext);
    const uri = {uri: navigation.state.params.uri};
    const ref = useRef(null);
    const {colors} = useTheme();
    return (
        <View style = {styles.container}>
                {/* <SearchBar 
                    style = {{marginHorizontal: 10}} 
                    uri = {uri}
                /> */}
                <WebView 
                    style = {{
                        backgroundColor: colors.background
                    }}
                    ref = {ref}
                    allowsBackForwardNavigationGestures = {true}
                    startInLoadingState = {true}
                    pullToRefreshEnabled = {true}
                    cacheEnabled = {false}
                    renderLoading={() => (
                        <View style={{flex: 1, alignSelf: 'stretch', backgroundColor: colors.background}}>
                          <ActivityIndicator style = {{alignSelf: 'center'}} size="large" />
                        </View>
                      )}
                    source = {uri}
                    onError={(syntheticEvent) => {
                        const { nativeEvent } = syntheticEvent;
                        navigation.navigate('Browser', {uri: `http://api.duckduckgo.com/?q=${uri.uri}`});
                      }}
                    onNavigationStateChange={(webViewState) => 
                        {
                            if (webViewState.canGoBack) {
                                navigation.setParams({
                                    prevPage: { title: '', onPress: () => ref.current.goBack(), },
                                  });
                            }else {
                                navigation.setParams({prevPage: null });
                              }
                            if (webViewState.canGoForward) {
                                navigation.setParams({
                                    forwardPage: { title: '', onPress: () => ref.current.goForward(), },
                                  });
                            }else {
                                navigation.setParams({forwardPage: null });
                              }
                        }
                    }
                    incognito = {true}
                />
            <BottomNav navigation = {navigation} style = {styles.bottom}></BottomNav>
        </View>
    );
};

const addChannelToList = (title) => {

}

BrowserScreen.navigationOptions = ({navigation}) => {
    return {
        headerRight: () => 
            <TouchableOpacity 
            onPress = {() => 
                {
                    Alert.prompt('Give the channel a name', 
                    `Adding ${navigation.state.params.uri} to channel list`,
                    [   {text: 'Cancel', onPress: () => console.log("CAN"), style: 'cancel'},
                        {text: 'Add', onPress: (text) => console.log(text), style: 'default'}
                    ],
                    'plain-text')
                }}>
                <Feather name = 'plus' size = {30} style = {styles.addButton}/>
            </TouchableOpacity>
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1 
    },
    bottom: {
        alignSelf: 'flex-end',
        marginBottom: 20
    },
    addButton: {
        paddingHorizontal: 10
    }
});

export default BrowserScreen;