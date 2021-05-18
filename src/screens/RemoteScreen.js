import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Slider } from "react-native";
// import Slider from "@react-native-community/slider";
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
import { useContext } from "react";
import DataContext from "../context/DataContext";

const RemoteScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const client = useRemoteMediaClient();
  const session = useCastSession();
  const [channels, setChannels] = useState([]);
  const [pause_play, setPause_play] = useState("play");
  const [mute_unmute, setMute_unmute] = useState("volume-high");
  const [volume, setVolume] = useState(0);
  const { index, setIndex } = useContext(DataContext);

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

  const playMedia = (client, idx) => {
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
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: colors.background,
      }}
    >
      <Text style={{ fontSize: 30, margin: 10, textAlign: "center" }}>
        {/*channels[index].title*/}
      </Text>
      <View style={[styles.col]}>
        <Text style={{ alignSelf: "center", color: colors.text, fontSize: 18 }}>
          Channels
        </Text>
        <View
          style={[
            styles.row,
            styles.raised,
            { backgroundColor: colors.card, width: 300 },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              if (index === 0) {
                playMedia(client, channels.length - 1);
                setIndex(channels.length - 1);
              } else {
                playMedia(client, index - 1);
                setIndex(index - 1);
              }
            }}
          >
            <AntDesign
              style={{ color: colors.text }}
              name="caretleft"
              size={90}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (index === channels.length - 1) {
                playMedia(client, 0);
                setIndex(0);
              } else {
                playMedia(client, index + 1);
                setIndex(index + 1);
              }
            }}
          >
            <AntDesign
              style={{ color: colors.text }}
              name="caretright"
              size={90}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={[styles.row, styles.raised, { backgroundColor: colors.card }]}
      >
        <Ionicons
          style={{ color: colors.text, alignSelf: "center" }}
          name={"volume-low"}
          size={30}
        />
        <Slider
          style={{ width: 300 }}
          minimumValue={0.0}
          step={0.01}
          maximumValue={1.0}
          onValueChange={(v) => {
            if (client) {
              client.setStreamVolume(v);
            }
          }}
        />
        <Ionicons
          style={{ color: colors.text, alignSelf: "center" }}
          name={"volume-high"}
          size={30}
        />
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
              navigation.navigate("Home");
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
                fontSize: 18,
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
    padding: 10,
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
    shadowOpacity: 0.08,
    shadowRadius: 3,
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
