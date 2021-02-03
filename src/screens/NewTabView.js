import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ActionSheetIOS,
  Platform,
} from "react-native";
import Grid from "react-native-grid-component";
import BottomNav from "../components/BottomNav";
import SearchBar from "../components/SearchBar";
import {
  getChannels,
  storeChannels,
  getItem,
  storeItem,
} from "../hooks/useChannels";
import { useTheme } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GoogleCast, { CastButton } from "react-native-google-cast";
import { useRemoteMediaClient } from "react-native-google-cast";
import { useColorScheme } from "react-native-appearance";
import { Feather } from "@expo/vector-icons";

const NewTabView = ({ navigation }) => {
  const [channels, setChannels] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const client = useRemoteMediaClient();
  if (client) {
    if (!loaded) {
      AsyncStorage.getItem("@auto-play").then((data) => {
        if (data !== null) {
          if (data === "false") {
            client.loadMedia({
              mediaInfo: {
                contentUrl: channels[0].video_url,
                metadata: {
                  // images: [
                  //   {
                  //     url:
                  //       "https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/images/480x270/BigBuckBunny.jpg",
                  //   },
                  // ],
                  title: channels[0].title,
                },
              },
            });
            setLoaded(true);
          }
        }
      });
    }
  }
  useEffect(() => {
    const listener = navigation.addListener("didFocus", () => {
      const ch = getChannels();
      ch.then((data) => {
        if (data != null || data != undefined) {
          if (data.length != 0) setChannels(data);
        } else {
          AsyncStorage.getItem("@use-default-channles").then((res) => {
            if (res === "false") {
              cha = [
                {
                  title: "MBC Max",
                  uri: "http://www.3rbcafee.com/2019/04/MBC-Max-Live.html",
                  video_url:
                    "https://shls-mbcmax-prod-dub.shahid.net/out/v1/13815a7cda864c249a88c38e66a2e653/index_4.m3u8",
                },
                {
                  title: "MBC 2",
                  uri:
                    "http://www.3rbcafee.com/2019/04/MBC-2-Live-Streaming.html",
                  video_url:
                    "https://shls-mbc2-prod-dub.shahid.net/out/v1/b4befe19798745fe986f5a9bfba62126/index_4.m3u8",
                },
                {
                  title: "MBC Action",
                  uri:
                    "http://www.3rbcafee.com/2019/04/MBC-Action-Live-Streaming.html",
                  video_url:
                    "https://shls-mbcaction-prod-dub.shahid.net/out/v1/68dd761538e5460096c42422199d050b/index.m3u8",
                },
                {
                  title: "Dubai One",
                  uri:
                    "http://www.dubaione.ae/content/dubaione/en-ae/live.html",
                  video_url:
                    "http://www.elahmad.com/tv/m3u8/dubaitv.m3u8?id=dubaione",
                },
                {
                  title: "Aljazeera",
                  uri: "http://www.aljazeera.com/live",
                  video_url:
                    "https://live-hls-web-aje.getaj.net/AJE/02.m3u8?@amarnettv.live",
                },
              ];
              storeChannels(cha);
              setChannels(cha);
            }
          });
        }
      });
    });
    return () => listener.remove();
  }, []);

  const { colors } = useTheme();
  const scheme = useColorScheme();
  return (
    <View style={styles.container}>
      <SearchBar navigation={navigation} style={{ marginHorizontal: 10 }} />
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 30,
            paddingHorizontal: 20,
            margin: 5,
            color: colors.text,
          }}
        >
          Live channels
        </Text>
        <Grid
          style={styles.grid}
          // renderPlaceholder={(id) => {}}
          keyExtractor={(item, id) => item.uri}
          numColumns={3}
          renderItem={(item, id) => {
            return (
              <View
                style={[
                  styles.item,
                  { backgroundColor: colors.card },
                  styles.dropShadow,
                ]}
                key={id}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Browser", { uri: item.uri });
                  }}
                  onLongPress={() => {
                    if (Platform.OS === "ios") {
                      ActionSheetIOS.showActionSheetWithOptions(
                        {
                          options: [
                            "Play",
                            "Open in browser",
                            "Delete",
                            "Cancel",
                          ],
                          destructiveButtonIndex: 2,
                          cancelButtonIndex: 3,
                          userInterfaceStyle:
                            scheme === "dark" ? "dark" : "light",
                        },
                        (buttonIndex) => {
                          const index = getIndex(item, channels);
                          if (buttonIndex === 0) {
                            if (client) {
                              client.loadMedia({
                                mediaInfo: {
                                  contentUrl: channels[index].video_url,
                                  metadata: {
                                    title: channels[index].title,
                                  },
                                },
                              });
                            } else {
                              GoogleCast.showCastDialog();
                            }
                          } else if (buttonIndex === 1) {
                            navigation.navigate("Browser", { uri: item.uri });
                          } else if (buttonIndex === 2) {
                            const index = getIndex(item, channels);
                            channels.splice(index, 1);
                            setChannels([...channels]);
                            storeChannels([...channels]);
                          }
                        }
                      );
                    }
                  }}
                >
                  <Image
                    style={styles.itemicon}
                    source={{
                      url: `https://s2.googleusercontent.com/s2/favicons?domain=${item.uri}`,
                    }}
                  />
                  <Text
                    style={{
                      alignSelf: "center",
                      color: colors.text,
                      paddingVertical: 5,
                    }}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
          data={channels}
        />
      </View>
      <BottomNav navigation={navigation} style={styles.bottom}></BottomNav>
    </View>
  );
};

NewTabView.navigationOptions = () => {
  return {
    headerRight: () => (
      <CastButton
        style={{
          width: 40,
          height: 40,
          marginHorizontal: 10,
          marginVertical: 5,
          tintColor: useColorScheme() === "dark" ? "#fcfcfc" : "black",
        }}
      />
    ),
  };
};

const getIndex = (item, cha) => {
  let index = cha.findIndex((elem) => {
    if (elem.uri === item.uri) return true;
  });
  return index;
};

const getFavicon = (item) => {
  const domain_tmp = String(item.uri).substring(
    String(item.uri).indexOf("/") + 2
  );
  const domain = String(domain_tmp).substring(0, domain_tmp.indexOf("/"));
  const query = {
    favicon_generation: {
      api_key: "87d5cd739b05c00416c4a19cd14a8bb5632ea563",
      master_picture: {
        type: "no_picture",
        demo: "false",
      },
      files_location: {
        type: "none",
      },
      callback: {
        type: "none",
        short_url: "false",
        path_only: "false",
        custom_parameter: "ref=157539001",
      },
    },
  };
  const ret = fetch(
    `http://favicongrabber.com/api/grab/${domain}?pretty=true`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson != null) {
        const { icons } = responseJson;
        if (icons != null) {
          const obj = icons[0];
          if (obj != null) {
            const { src } = obj;
            return {
              url: src,
            };
          } else {
            return {
              url: `https://s2.googleusercontent.com/s2/favicons?domain=${item.uri}`,
            };
          }
        } else {
          return {
            url: `https://s2.googleusercontent.com/s2/favicons?domain=${item.uri}`,
          };
        }
      } else {
        return {
          url: `https://s2.googleusercontent.com/s2/favicons?domain=${item.uri}`,
        };
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return ret;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  grid: {
    flex: 1,
  },
  item: {
    flex: 1,
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  itemicon: {
    height: 20,
    width: 20,
    alignSelf: "center",
  },
  bottom: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  dropShadow: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default NewTabView;
