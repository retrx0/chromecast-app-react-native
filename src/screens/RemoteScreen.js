import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { getChannels, storeChannels } from "../hooks/useChannels";
import GoogleCast, {
  useRemoteMediaClient,
  useCastSession,
} from "react-native-google-cast";
import { color } from "react-native-reanimated";

const RemoteScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const client = useRemoteMediaClient();
  const session = useCastSession();
  const [channels, setChannels] = useState([]);
  const [idx, setIdx] = useState(0);
  const [pause_play, setPause_play] = useState("play");
  const [mute_unmute, setMute_unmute] = useState("volume-high");
  const [volume, setVolume] = useState(0);

  useEffect(() => {
    if (client) {
      session.getVolume().then((v) => setVolume(v));
    }
    getChannels().then((data) => {
      if (data !== null) {
        setChannels(data);
      }
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: colors.background,
      }}
    >
      <View style={[styles.row]}>
        <View
          style={[styles.col, styles.raised, { backgroundColor: colors.card }]}
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
          style={[styles.col, styles.raised, { backgroundColor: colors.card }]}
        >
          <Text style={{ color: colors.text, alignSelf: "center", margin: 10 }}>
            Volume
          </Text>
          <TouchableOpacity
            onPress={() => {
              if (client) {
                if (volume < 1.0) {
                  client.setStreamVolume(volume + 0.1);
                  setVolume(volume + 0.1);
                }
              }
            }}
          >
            <Feather
              style={{ color: colors.text, alignSelf: "center" }}
              name="plus"
              size={80}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (client) {
                if (volume >= 0) {
                  client.setStreamVolume(volume - 0.1);
                  setVolume(volume - 0.1);
                }
              }
            }}
          >
            <Feather
              style={{ color: colors.text, alignSelf: "center" }}
              name="minus"
              size={80}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={[styles.row, styles.raised, { backgroundColor: colors.card }]}
      >
        <TouchableOpacity
          onPress={() => {
            if (client) {
              if (pause_play === "pause") {
                client.play();
                setPause_play("play");
              } else {
                client.pause();
                setPause_play("pause");
              }
            }
          }}
        >
          <Ionicons
            style={{ color: colors.text, alignSelf: "center" }}
            name={pause_play}
            size={60}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            GoogleCast.showExpandedControls();
          }}
        >
          <MaterialCommunityIcons
            style={{ color: colors.text, alignSelf: "center" }}
            name="remote"
            size={55}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (client) {
              if (mute_unmute === "volume-mute") {
                setMute_unmute("volume-high");
                client.setStreamMuted(false);
              } else {
                setMute_unmute("volume-mute");
                client.setStreamMuted(true);
              }
            }
          }}
        >
          <Ionicons
            style={{ color: colors.text, alignSelf: "center" }}
            name={mute_unmute}
            size={60}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (client) {
              GoogleCast.getSessionManager().endCurrentSession(true);
            }
          }}
        >
          <Ionicons
            style={{ color: colors.text, alignSelf: "center" }}
            name="ios-stop"
            size={60}
          />
        </TouchableOpacity>
      </View>
      <View
        style={[styles.row, styles.raised, { backgroundColor: colors.card }]}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Edit");
          }}
          style={{ flexDirection: "row" }}
        >
          <Text
            style={[
              {
                color: colors.text,
                padding: 20,
                borderRadius: 8,
                textAlignVertical: "center",
              },
            ]}
          >
            Edit channels{" "}
          </Text>
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
  raised: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 5,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "column",
  },
});

export default RemoteScreen;
