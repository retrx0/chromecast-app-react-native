import React, { useContext, useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import BottomNav from "../components/BottomNav";
import SearchBar from "../components/SearchBar";
import WebView from "react-native-webview";
import { createStackNavigator, HeaderBackButton } from "react-navigation-stack";
import { Context as uriContext } from "../context/SearchUriContext";
import { useTheme } from "@react-navigation/native";
import { getChannels, storeChannels } from "../hooks/useChannels";
// import {CastButton} from 'react-native-google-cast';

const BrowserScreen = ({ navigation }) => {
  // const client = useRemoteMediaClient();
  // const discoveryManager = GoogleCast.getDiscoveryManager();
  // discoveryManager.startDiscovery();
  // const {state} = useContext(uriContext);
  const uri = { uri: navigation.state.params.uri };
  const ref = useRef(null);
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      {/* <SearchBar 
                    style = {{marginHorizontal: 10}} 
                    uri = {uri}
                /> */}
      <WebView
        style={{
          backgroundColor: colors.background,
        }}
        ref={ref}
        allowsBackForwardNavigationGestures={true}
        startInLoadingState={true}
        pullToRefreshEnabled={true}
        cacheEnabled={false}
        // renderLoading={() => (
        //   <>
        //     <ActivityIndicator style={{ alignSelf: "center" }} size="large" />
        //   </>
        // )}
        source={uri}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          const qs = String(uri.uri);
          const query = qs.substr(qs.indexOf(".") + 1);
          console.log(query);
          navigation.navigate("Browser", {
            uri: `http://api.duckduckgo.com/?q=${query}`,
          });
        }}
        onNavigationStateChange={(webViewState) => {
          if (webViewState.canGoBack) {
            navigation.setParams({
              prevPage: { title: "", onPress: () => ref.current.goBack() },
            });
          } else {
            navigation.setParams({ prevPage: null });
          }
          if (webViewState.canGoForward) {
            navigation.setParams({
              forwardPage: {
                title: "",
                onPress: () => ref.current.goForward(),
              },
            });
          } else {
            navigation.setParams({ forwardPage: null });
          }
          navigation.setParams({
            currentPageUrl: {
              title: webViewState.title,
              url: webViewState.url,
            },
          });
        }}
        incognito={true}
      />
      <BottomNav navigation={navigation} style={styles.bottom}></BottomNav>
    </View>
  );
};

const AddChannelButton = ({ navigation }) => {
  const channels = getChannels();
  const [stations, setStations] = useState([]);
  useEffect(() => {
    channels.then((data) => {
      setStations(data);
    });
  }, []);
  const uri = navigation.getParam("currentPageUrl");
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={() => {
        Alert.alert(
          `Add ${uri.title} to channel list`,
          "",
          [
            {
              text: "Cancel",
              onPress: () => {},
              style: "cancel",
            },
            {
              text: "Add",
              onPress: () => {
                storeChannels([
                  ...stations,
                  { title: uri.title, uri: uri.url, video_uri: "" },
                ])
                  .then(() =>
                    Alert.alert(
                      "Channel Added",
                      `${uri.title} added to your channle list`
                    )
                  )
                  .catch(() =>
                    Alert.alert(
                      "Something went wrong",
                      "Could not add channel to list"
                    )
                  );
              },
              style: "default",
            },
          ],
          "plain-text"
        );
      }}
    >
      <Feather
        name="plus"
        size={30}
        style={[styles.addButton, { color: colors.text }]}
      />
    </TouchableOpacity>
  );
};

BrowserScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => <AddChannelButton navigation={navigation} />,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottom: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  addButton: {
    paddingHorizontal: 10,
  },
});

export default BrowserScreen;
