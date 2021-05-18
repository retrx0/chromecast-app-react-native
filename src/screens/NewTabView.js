import React, { useState, useEffect, useContext } from "react";
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
import EditChannelModal from "../components/EditChannelModal";
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
import DataContext from "../context/DataContext";

const NewTabView = ({ navigation }) => {
  const [channels, setChannels] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const client = useRemoteMediaClient();
  const { index, setIndex } = useContext(DataContext);

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
                  //     url: `https://s2.googleusercontent.com/s2/favicons?domain=${channels[0].uri}`,
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
                  uri: "http://www.3rbcafee.com/2019/04/MBC-2-Live-Streaming.html",
                  video_url:
                    "https://shls-mbc2-prod-dub.shahid.net/out/v1/b4befe19798745fe986f5a9bfba62126/index_4.m3u8",
                },
                {
                  title: "MBC Action",
                  uri: "http://www.3rbcafee.com/2019/04/MBC-Action-Live.html",
                  video_url:
                    "https://shls-mbcaction-prod-dub.shahid.net/out/v1/68dd761538e5460096c42422199d050b/index.m3u8",
                },
                {
                  title: "MBC 4",
                  uri: "http://mbc.net",
                  video_url:
                    "https://shls-mbc4-prod-dub.shahid.net/out/v1/c08681f81775496ab4afa2bac7ae7638/index_2.m3u8",
                },
                {
                  title: "Dubai One",
                  uri: "http://www.dubaione.ae/content/dubaione/en-ae/live.html",
                  video_url:
                    "https://dminnvll.cdn.mangomolo.com/dubaione/smil:dubaione.stream.smil/chunklist_b1500000.m3u8",
                },
                {
                  title: "Aljazeera",
                  uri: "http://www.aljazeera.com/live",
                  video_url: "https://live-hls-aje-ak.getaj.net/AJE/04.m3u8",
                },
                {
                  title: "NBC",
                  uri: "https://www.nbc.com/live?brand=nbc-news",
                  video_url:
                    "https://nbcnews2.akamaized.net/hls/live/723426/NBCNewsPlaymaker24x7Linear99a3a827-ua/VIDEO_1_4596000.m3u8",
                },
                {
                  title: "Flix HD",
                  uri: "http://www.flixhd.com",
                  video_url:
                    "https://y5w8j4a9.ssl.hwcdn.net/andflixhd/tracks-v1a1/index.m3u8",
                },
                // {
                //   title: "HBO US HD",
                //   uri: "http://fomny.com/Video/USA/04/HBO/HBO.php",
                //   video_url:
                //     "https://hls.ustream.to/HBO-USA-HD.m3u8?token=562-3d3-72e-b2f-b60-042-e09-4ab-3bb-27d-1d6-3f2-51d-56b-940-aa4-4c4-ff4-16d-092-28b-8",
                // },
                // {
                //   title: "HBO Family",
                //   uri: "http://fomny.com/Video/USA/04/HBO/HBO.php",
                //   video_url:
                //     "https://liveorigin01.hbogoasia.com:8443/origin/live/main/FAMILY/5-161264867.ts?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9kYWkzZmQxb2gzMjV5LmNsb3VkZnJvbnQubmV0L29yaWdpbi9saXZlL21haW4vKiIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTYxMjc4MjM4Nn19fV19&Signature=m81ZmgxgIqX3v4IUYOfplklDsoJbunl2ckg64wPsmxovl3OKo0Oc2raHIAp1zpc26SfXHcES2VgmCuXV7HPiz0q29BEO4XO-IdyU6FFW9Y2buc9HA9hjxMECYVfhpxGUKMpXgNnPW55rDJU8YsCFGoK66u0mfjQN~YNirVIRYeTXhWE2cqk1xRJGCAtXBW0rXT8dzTF4S3S2OWrfVlYSXxkDJggz-EiDbDd3P-WmGPA5ELE9gZEbkXdzm8KvITQEiTnLlZ7rvXwXz8blXmoUAExY6mKQG-L5uAOq3~j8oitYil6QOn8RM-ltSh7pJi2~iIey~ZIgQUe6UAn3HUhFbQ__&Key-Pair-Id=APKAJFBTWETXLROKW43A",
                // },
                // {
                //   title: "Comedy Central",
                //   uri:
                //     "http://fomny.com/Video/USA/01/Comedy-central/Comedy-Central.php",
                //   video_url:
                //     "https://nl1.streamlive.to/freeabr/tbmztl7gj7kol9w/chunks.m3u8?wmsAuthSign=c2VydmVyX3RpbWU9Mi82LzIwMjEgMTA6MDA6NDEgUE0maGFzaF92YWx1ZT1nazdXdnRyZi9Zb1Z0L1FwRFBYZWFBPT0mdmFsaWRtaW51dGVzPTI0MCZzdHJtX2xlbj0yMyZpZD05NTI2NDc=",
                // },
                // {
                //   title: "Nat Geo",
                //   uri:
                //     "http://fomny.com/Video/USA/02/National-Geographic-USA)/national-geographic.php#",
                //   video_url:
                //     "https://nl1.streamlive.to/freeabr/xw4xmoxhyhey0hk/chunks.m3u8?wmsAuthSign=c2VydmVyX3RpbWU9Mi82LzIwMjEgMTA6MDc6MTYgUE0maGFzaF92YWx1ZT15VXI4Y2ZNelZOVlJPNXphSzlaeGZ3PT0mdmFsaWRtaW51dGVzPTI0MCZzdHJtX2xlbj0yMyZpZD04NTE1OTU=",
                // },
                // {
                //   title: "USA Network",
                //   uri:
                //     "http://fomny.com/Video/USA/04/usa%20-network/usa%20-network.php#",
                //   video_url:
                //     "https://hls.ustream.to/USA-Network.m3u8?token=ad8-f6a-a14-12c-cd0-fe6-8c4-fc7-e32-ed2-468-d76-792-60b-ca7-ebd-bf9-214-b64-63a-b2c-9-a5d-d1c-e8t-f6c",
                // },
                {
                  title: "MTV Yo",
                  uri: "http://fomny.com/Video/Music/01/MTV/MTV-channel.php",
                  video_url:
                    "http://pluto-live.plutotv.net/egress/chandler/pluto01/live/VIACBS01/master_2400.m3u8",
                },
                {
                  title: "MTV Pop",
                  uri: "http://fomny.com/Video/Music/01/MTV/MTV-channel.php",
                  video_url:
                    "http://pluto-live.plutotv.net/egress/chandler/pluto01/live/VIACBS02/master_2400.m3u8",
                },
                // {
                //   title: "MTV Classic",
                //   uri: "http://fomny.com/Video/Music/01/MTV/MTV-channel.php",
                //   video_url:
                //     "https://nl1.streamlive.to/freeabr/a97wwdz4xhl29ok/chunks.m3u8?wmsAuthSign=c2VydmVyX3RpbWU9Mi82LzIwMjEgMTA6MjI6MzQgUE0maGFzaF92YWx1ZT1yMTJQN1c3UExIWTVxWWNrcFVpRHZBPT0mdmFsaWRtaW51dGVzPTI0MCZzdHJtX2xlbj0yMyZpZD0yMzU5NTk=",
                // },
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
    <View style={[styles.container, { backgroundColor: colors.background }]}>
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
                            "Edit",
                            "Delete",
                            "Cancel",
                          ],
                          destructiveButtonIndex: 3,
                          cancelButtonIndex: 4,
                          userInterfaceStyle:
                            scheme === "dark" ? "dark" : "light",
                        },
                        (buttonIndex) => {
                          const indx = getIndex(item, channels);
                          if (buttonIndex === 0) {
                            if (client) {
                              setIndex(indx);
                              client.loadMedia({
                                mediaInfo: {
                                  contentUrl: channels[indx].video_url,
                                  metadata: {
                                    title: channels[indx].title,
                                  },
                                },
                              });
                            } else {
                              GoogleCast.showCastDialog();
                            }
                          } else if (buttonIndex === 1) {
                            navigation.navigate("Browser", { uri: item.uri });
                          } else if (buttonIndex == 2) {
                            navigation.navigate("EditChannel", { item });
                          } else if (buttonIndex === 3) {
                            const indx = getIndex(item, channels);
                            channels.splice(indx, 1);
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
      <BottomNav
        visible
        navigation={navigation}
        style={styles.bottom}
      ></BottomNav>
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
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default NewTabView;
