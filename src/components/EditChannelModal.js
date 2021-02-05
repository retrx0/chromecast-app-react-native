import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Modal,
  TextInput,
  Image,
} from "react-native";
import { useColorScheme } from "react-native-appearance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";
import { color } from "react-native-reanimated";

const EditChannelModal = ({ navigation }) => {
  const channel = navigation.state.params.item;
  const [title, setTitle] = useState(channel.title);
  const [uri, setUri] = useState(channel.uri);
  const [video_url, setVideo_url] = useState(channel.video_url);

  const { colors } = useTheme();
  return (
    <View style={[styles.container, { color: colors.text }]}>
      <View
        style={[
          styles.view,
          { color: colors.text, backgroundColor: colors.card },
        ]}
      >
        <Image
          style={[styles.img]}
          source={{
            url: `https://s2.googleusercontent.com/s2/favicons?domain=${channel.uri}`,
          }}
        />
        <Text style={[styles.title, { color: colors.text }]}>
          {channel.title}
        </Text>
        <Text style={[styles.sub, { color: colors.text }]}>Title</Text>
        <CustomInput value={channel.title} onChange={setTitle} theme={colors} />
        <Text style={[styles.sub, { color: colors.text }]}>Website url</Text>
        <CustomInput value={channel.uri} onChange={setUri} theme={colors} />
        <Text style={[styles.sub, { color: colors.text }]}>Video url</Text>
        <CustomInput
          value={channel.video_url}
          onChange={setVideo_url}
          theme={colors}
        />
        <Button
          style={{ width: 50, height: 30, margin: 10, alignSelf: "center" }}
          title="Done"
          onPress={() => {
            navigation.pop();
          }}
        />
      </View>
    </View>
  );
};

const CustomInput = ({ value, onChange, theme }) => {
  return (
    <View style={{ height: 45, margin: 3 }}>
      <TextInput
        clearButtonMode="while-editing"
        keyboardType="default"
        returnKeyType="done"
        autoCapitalize="none"
        autoCorrect={false}
        value={value}
        onChangeText={onChange}
        style={[
          styles.input,
          { color: theme.text, backgroundColor: theme.background },
        ]}
      />
    </View>
  );
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
