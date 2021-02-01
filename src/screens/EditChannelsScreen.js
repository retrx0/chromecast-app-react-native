import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
  FlatList,
  Image,
  SafeAreaView,
} from "react-native";
import { Feather, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { getChannels, storeChannels } from "../hooks/useChannels";

const EditChannelsScreen = ({ navigation }) => {
  const [channels, setChannels] = useState([]);
  const [change, setChange] = useState([]);
  const { colors } = useTheme();

  useEffect(() => {
    getChannels().then((data) => setChannels(data));
  }, []);
  return (
    <SafeAreaView>
      <View
        style={[
          {
            backgroundColor: colors.card,
            marginVertical: 10,
          },
        ]}
      >
        <FlatList
          data={channels}
          extraData={change}
          keyExtractor={(item) => item.title}
          style={{ flexDirection: "column" }}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.listItem}>
                <View
                  style={{
                    justifyContent: "flex-start",
                    flexDirection: "row",
                    paddingHorizontal: 10,
                  }}
                >
                  <Image
                    style={{ height: 20, width: 20, alignSelf: "center" }}
                    source={{
                      uri: `https://s2.googleusercontent.com/s2/favicons?domain=${item.uri}`,
                    }}
                  />
                  <Text
                    style={{
                      color: colors.text,
                      padding: 5,
                      margin: 3,
                      fontSize: 18,
                    }}
                  >
                    {item.title}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: "flex-end",
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      const index = getIndex(item, channels);
                      if (index != 0) {
                        var a = channels[index];
                        channels[index] = channels[index - 1];
                        channels[index - 1] = a;
                        setChange([...channels]);
                      } else {
                      }
                    }}
                  >
                    <AntDesign
                      style={[{ color: colors.text }, styles.listItemButton]}
                      name="caretup"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      const index = getIndex(item, channels);
                      let size = channels.length - 1;
                      if (index != size) {
                        var a = channels[index];
                        channels[index] = channels[index + 1];
                        channels[index + 1] = a;
                        setChange([...channels]);
                      } else {
                      }
                    }}
                  >
                    <AntDesign
                      style={[{ color: colors.text }, styles.listItemButton]}
                      name="caretdown"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      const index = getIndex(item, channels);
                      channels.splice(index, 1);
                      setChange([...channels]);
                      storeChannels([...channels]);
                    }}
                  >
                    <MaterialIcons
                      style={[{ color: "#e33300" }, styles.listItemButton]}
                      name="delete"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            margin: 10,
          }}
        >
          <Button
            title="Done"
            onPress={() => {
              storeChannels([...channels]);
              navigation.goBack();
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

EditChannelsScreen.navigationOptions = ({}) => ({
  mode: "modal",
  title: "Edit Channels",
  headerLeft: () => null,
  headerShown: true,
  gestureEnabled: false,
});

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
  modalButton: {
    alignSelf: "center",
    justifyContent: "center",
  },
  dropShadow: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  listItem: {
    marginVertical: 5,
    justifyContent: "space-between",
  },
  listItemButton: {
    fontSize: 30,
    padding: 3,
    margin: 2,
  },
});

export default EditChannelsScreen;
