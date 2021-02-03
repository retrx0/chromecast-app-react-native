import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { getChannels, storeChannels } from "../hooks/useChannels";
import GoogleCast, {
  useRemoteMediaClient,
  useCastSession,
} from "react-native-google-cast";

const RemoteScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const client = useRemoteMediaClient();
  const session = useCastSession();
  const [channels, setChannels] = useState([]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    getChannels().then((data) => {
      if (data !== null) {
        setChannels(data);
      }
    });
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <View
        style={[styles.row, { borderColor: colors.border, borderWidth: 1 }]}
      >
        <TouchableOpacity
          onPress={() => {
            GoogleCast.showExpandedControls();
          }}
        >
          <MaterialCommunityIcons
            style={{ color: colors.text, alignSelf: "center" }}
            name="remote"
            size={80}
          />
          <Text style={{ color: colors.text, alignSelf: "center", padding: 5 }}>
            Show Controls
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.row]}>
        <View
          style={[styles.col, { borderColor: colors.border, borderWidth: 1 }]}
        >
          <Text style={{ alignSelf: "center", color: colors.text }}>
            Channels
          </Text>
          <TouchableOpacity
            onPress={() => {
              if (idx === 0) {
                setIdx(channels.length - 1);
              } else setIdx(idx - 1);
              if (client) {
                client.loadMedia({
                  mediaInfo: {
                    contentUrl: channels[idx].video_url,
                    metadata: {
                      title: channels[idx].title,
                    },
                  },
                });
              }
            }}
          >
            <AntDesign
              style={{ color: colors.text }}
              name="caretup"
              size={80}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (idx === channels.length - 1) {
                setIdx(0);
              } else setIdx(idx + 1);
              if (client) {
                client.loadMedia({
                  mediaInfo: {
                    contentUrl: channels[idx].video_url,
                    metadata: {
                      title: channels[idx].title,
                    },
                  },
                });
              }
            }}
          >
            <AntDesign
              style={{ color: colors.text }}
              name="caretdown"
              size={80}
            />
          </TouchableOpacity>
        </View>
        <View
          style={[styles.col, { borderColor: colors.border, borderWidth: 1 }]}
        >
          <Text style={{ color: colors.text, alignSelf: "center" }}>
            Volume
          </Text>
          <TouchableOpacity
            onPress={() => {
              if (session) {
                session.getVolume().then((data) => {
                  if (data !== null) {
                    if (data !== 1.0) {
                      // session.setVolume(Math.floor(1));
                      console.log(data);
                    }
                  }
                });
              }
            }}
          >
            <AntDesign style={{ color: colors.text }} name="plus" size={80} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (session) {
                session.getVolume().then((data) => {
                  if (data !== null) {
                    console.log(data);
                    if (data !== 0) {
                      // session.setVolume(data);
                    }
                  }
                });
              }
            }}
          >
            <AntDesign style={{ color: colors.text }} name="minus" size={80} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Edit");
          }}
          style={{ flexDirection: "row" }}
        >
          <Text style={{ color: colors.text }}>Edit channels list </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const getIndex = (item, cha) => {
  let index = cha.findIndex((elem) => {
    if (elem.uri === item.uri) return true;
  });
  return index;
};

const styles = StyleSheet.create({
  buttonText: {
    alignSelf: "center",
    margin: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
    borderRadius: 15,
    marginHorizontal: 10,
    padding: 5,
  },
  col: {
    flexDirection: "column",
    alignSelf: "center",
    marginVertical: 10,
    borderRadius: 15,
    marginHorizontal: 10,
    padding: 10,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "column",
  },
});

export default RemoteScreen;
