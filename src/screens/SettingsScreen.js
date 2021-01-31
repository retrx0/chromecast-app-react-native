import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useColorScheme } from "react-native-appearance";
import { storeItem, getItem } from "../hooks/useChannels";

const SettingsScreen = ({ navigation }) => {
  const scheme = useColorScheme();
  const { colors } = useTheme();
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
  const [isStoreChacheEnabled, setIsStoreCacheEnabled] = useState(false);
  const [
    isUseDefaultChannlesEnabled,
    setIsUSeDefaultChannelsEnabled,
  ] = useState(false);
  const toggleDarkModeSwitch = () =>
    setIsDarkModeEnabled((previousState) => !previousState);

  const toggleUseDefaultChannlesSwitch = () =>
    setIsUSeDefaultChannelsEnabled((state) => !state);

  const toggleStoreChacheSwitch = () =>
    setIsStoreCacheEnabled((previousState) => !previousState);
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: colors.text,
          fontSize: 35,
          paddingHorizontal: 10,
          marginVertical: 10,
          fontWeight: "500",
        }}
      >
        Settings
      </Text>

      <Text style={[{ color: colors.text }, styles.categoryText]}>
        Appearance
      </Text>
      <View style={[styles.row, { backgroundColor: colors.card }]}>
        <Text style={[styles.settingsItemText, { color: colors.text }]}>
          Darkmode
        </Text>
        <Switch
          style={styles.settingsSwitch}
          value={isDarkModeEnabled}
          onValueChange={() => {
            toggleDarkModeSwitch();
            const dm = isDarkModeEnabled ? "true" : "false";
            console.log(dm);
            storeItem("@dark-mode-enabled", dm);
          }}
        />
      </View>

      <Text style={[{ color: colors.text }, styles.categoryText]}>
        Channels
      </Text>
      <View style={[styles.row, { backgroundColor: colors.card }]}>
        <Text style={[styles.settingsItemText, { color: colors.text }]}>
          Use Default Channles
        </Text>
        <Switch
          style={styles.settingsSwitch}
          value={isUseDefaultChannlesEnabled}
          onValueChange={() => {
            toggleUseDefaultChannlesSwitch();
            const sw = isUseDefaultChannlesEnabled ? "true" : "false";
            storeItem("@use-default-channles", sw);
          }}
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("Edit")}
        style={[styles.row, { backgroundColor: colors.card }]}
      >
        <Text style={[styles.settingsItemText, { color: colors.text }]}>
          Edit Channels
        </Text>
        <MaterialIcons
          name="edit"
          size={25}
          style={[{ color: colors.text }, styles.settingsIcon]}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          Alert.alert(
            "Are you sure",
            "Do you still want to delete all channles?",
            [
              { text: "Cancel", style: "cancel", onPress: () => {} },
              {
                text: "Clear",
                onPress: () => {
                  AsyncStorage.removeItem("@channels")
                    .then(() => {
                      Alert.alert(
                        "Channel list cleared",
                        "Your channel list was cleared successfully"
                      );
                      navigation.navigate("Home");
                    })
                    .catch(() =>
                      Alert.alert(
                        "Something went wrong",
                        "Unable to clear list"
                      )
                    );
                },
              },
            ]
          );
        }}
        style={[styles.row, { backgroundColor: colors.card }]}
      >
        <Text style={[styles.settingsItemText, { color: colors.text }]}>
          Clear Channels
        </Text>
        <MaterialIcons
          name="clear-all"
          size={25}
          style={[{ color: colors.text }, styles.settingsIcon]}
        />
      </TouchableOpacity>

      <Text style={[{ color: colors.text }, styles.categoryText]}>Browser</Text>
      <View style={[styles.row, { backgroundColor: colors.card }]}>
        <Text style={[styles.settingsItemText, { color: colors.text }]}>
          Store Cache and History
        </Text>
        <Switch
          style={styles.settingsSwitch}
          value={isStoreChacheEnabled}
          onValueChange={() => {
            toggleStoreChacheSwitch();
            const dm = isStoreChacheEnabled ? "true" : "false";
            console.log(dm);
            // storeItem("@dark-mode-enabled", dm);
          }}
        />
      </View>

      <Text style={[{ color: colors.text }, styles.categoryText]}>Player</Text>
      <View style={[styles.row, { backgroundColor: colors.card }]}>
        <Text style={[styles.settingsItemText, { color: colors.text }]}>
          Auto play after connecting
        </Text>
        <Switch
          style={styles.settingsSwitch}
          value={isStoreChacheEnabled}
          onValueChange={() => {
            toggleStoreChacheSwitch();
            const dm = isStoreChacheEnabled ? "true" : "false";
            console.log(dm);
            // storeItem("@dark-mode-enabled", dm);
          }}
        />
      </View>
    </View>
  );
};

const getPrefereces = () => {
  const dakrMode = getItem("@dark-mode-enabled").then(() => {});
  const useDefChannels = getItem("@use-default-channles").then(() => {});
  const autoPlayChannel = getItem("@dark-mode-enabled").then(() => {});
  const storeCache = getItem("@dark-mode-enabled").then(() => {});
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  categoryText: {
    padding: 10,
    margin: 5,
    fontSize: 18,
  },
  settingsItemText: {
    padding: 10,
    fontSize: 18,
    justifyContent: "flex-start",
  },
  settingsSwitch: {
    justifyContent: "flex-end",
    margin: 5,
  },
  settingsIcon: {
    paddingHorizontal: 10,
    alignSelf: "center",
  },
});

export default SettingsScreen;
