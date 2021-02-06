import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Modal,
  TextInput,
  Image,
  Alert,
} from "react-native";
import { useColorScheme } from "react-native-appearance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";
import { color } from "react-native-reanimated";
import { getChannels, storeChannels } from "../hooks/useChannels";

const EditChannelModal = ({ navigation }) => {
  const channel = navigation.state.params.item;
  const [title, setTitle] = useState(channel.title);
  const [uri, setUri] = useState(channel.uri);
  const [video_url, setVideo_url] = useState(channel.video_url);
  const [channels, setChannels] = useState([]);

  const { colors } = useTheme();

  useEffect(() => {
    getChannels().then((data) => {
      setChannels(data);
    });
  }, []);

  return (
    <View
      style={[
        styles.view,
        { color: colors.text, backgroundColor: colors.card, marginTop: 10 },
      ]}
    >
      <Image
        style={[styles.img]}
        source={{
          url: `https://s2.googleusercontent.com/s2/favicons?domain=${channel.uri}`,
        }}
      />
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.sub, { color: colors.text }]}>Title</Text>
      <CustomInput value={title} onChangeText={setTitle} theme={colors} />
      <Text style={[styles.sub, { color: colors.text }]}>Website url</Text>
      <CustomInput value={uri} onChangeText={setUri} theme={colors} />
      <Text style={[styles.sub, { color: colors.text }]}>Video url</Text>
      <CustomInput
        value={video_url}
        onChangeText={setVideo_url}
        theme={colors}
      />
      <Button
        style={{ width: 50, height: 30, margin: 10, alignSelf: "center" }}
        title="Save"
        onPress={() => {
          let index = getIndex(channel, channels);
          channels[index].title = title;
          channels[index].uri = uri;
          channels[index].video_url = video_url;
          setChannels([...channels]);
          storeChannels(channels)
            .catch(() =>
              Alert.alert("Something went wrong", "Could not edit channel")
            )
            .then(() =>
              Alert.alert("Channel saved", "Channel saved succesfully")
            );
          navigation.navigate("Home");
        }}
      />
    </View>
  );
};

const CustomInput = (props) => {
  const { theme } = props;
  return (
    <View style={{ height: 45, margin: 3 }}>
      <TextInput
        {...props}
        clearButtonMode="while-editing"
        keyboardType="default"
        returnKeyType="default"
        autoCapitalize="none"
        autoCorrect={false}
        style={[
          styles.input,
          { color: theme.text, backgroundColor: theme.background },
        ]}
      />
    </View>
  );
};

const getIndex = (item, cha) => {
  let index = cha.findIndex((elem) => {
    if (elem.uri === item.uri) return true;
  });
  return index;
};

EditChannelModal.navigationOptions = () => ({
  mode: "modal",
  title: "Channel",
  headerLeft: () => null,
  headerShown: true,
  gestureEnabled: false,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  view: {
    margin: 10,
    padding: 5,
    borderRadius: 14,
  },
  img: {
    width: 24,
    height: 24,
    alignSelf: "center",
    margin: 10,
  },
  title: {
    fontSize: 20,
    alignSelf: "center",
    padding: 5,
    margin: 5,
  },
  sub: {
    fontSize: 16,
    padding: 5,
    margin: 3,
  },
  input: {
    flex: 1,
    height: 40,
    padding: 5,
    margin: 5,
    borderRadius: 8,
  },
});

export default EditChannelModal;
