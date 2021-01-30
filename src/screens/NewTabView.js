import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
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

const NewTabView = ({ navigation }) => {
  const [channels, setChannels] = useState([]);
  useEffect(() => {
    const listener = navigation.addListener("didFocus", () => {
      const ch = getChannels();
      ch.then((data) => {
        if (data != null) {
          setChannels(data);
        } else {
          getItem("@use-default-channles").then((res) => {
            console.log(res);
            if (res === "false") {
            }
          });
          cha = [
            {
              title: "f2movies.to",
              uri: "http://www.f2movies.to",
              video_url: "",
            },
            {
              title: "MBC Max",
              uri: "http://www.3rbcafee.com/2019/04/MBC-Max-Live.html",
              video_url: "",
            },
            {
              title: "Dubai One",
              uri: "http://www.dubaione.ae/content/dubaione/en-ae/live.html",
              video_url: "",
            },
            { title: "Fmovies", uri: "http://www.fmovies.to", video_url: "" },
          ];
          storeChannels(cha);
          setChannels(cha);
        }
      });
    });
    return () => listener.remove();
  }, []);

  const { colors } = useTheme();
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
          Channels
        </Text>
        <Grid
          style={styles.grid}
          // renderPlaceholder={(id) => {}}
          keyExtractor={(item, id) => item.uri}
          numColumns={3}
          renderItem={(item, id) => {
            return (
              <View
                style={[styles.item, { backgroundColor: colors.card }]}
                key={id}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Browser", { uri: item.uri });
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
});

export default NewTabView;
