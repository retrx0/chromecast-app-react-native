import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Button,
} from "react-native";
import { useColorScheme } from "react-native-appearance";
import { storeItem, getItem } from "../hooks/useChannels";
import { Picker } from "@react-native-picker/picker";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const SettingsScreen = ({ navigation }) => {
  const scheme = useColorScheme();
  const { colors } = useTheme();
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(null);
  const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(null);
  const [isStoreChacheEnabled, setIsStoreCacheEnabled] = useState(null);
  const [defaultSearchEngine, setDefaultSearchEngine] = useState("duckduckgo");
  const [
    isUseDefaultChannlesEnabled,
    setIsUseDefaultChannelsEnabled,
  ] = useState(null);

  const [modalVisible, setModalVisible] = useState(null);

  const toggleDarkModeSwitch = () => {
    setIsDarkModeEnabled((previousState) => !previousState);
    let dm = isDarkModeEnabled ? "true" : "false";
    storeItem("@dark-mode-enabled", dm);
  };
  const toggleUseDefaultChannlesSwitch = () => {
    setIsUseDefaultChannelsEnabled((state) => !state);
    let sw = isUseDefaultChannlesEnabled ? "true" : "false";
    storeItem("@use-default-channles", sw);
  };
  const toggleStoreChacheSwitch = () => {
    setIsStoreCacheEnabled((previousState) => !previousState);
    let r = isStoreChacheEnabled ? "true" : "false";
    storeItem("@store-cache", r);
  };
  const toggleAutoPlaySwitch = () => {
    setIsAutoPlayEnabled((previousState) => !previousState);
    let r = isAutoPlayEnabled ? "true" : "false";
    storeItem("@auto-play", r);
  };

  useEffect(() => {
    AsyncStorage.multiGet([
      "@dark-mode-enabled",
      "@use-default-channles",
      "@auto-play",
      "@store-cache",
      "@default-search-engine",
    ]).then((data) => {
      if (data !== null) {
        let first = data[0][1];
        let second = data[1][1];
        let third = data[2][1];
        let fourth = data[3][1];
        let fifth = data[3][1];
        setIsDarkModeEnabled(first == "false" ? true : false);
        setIsUseDefaultChannelsEnabled(second == "false" ? true : false);
        setIsAutoPlayEnabled(third == "false" ? true : false);
        setIsStoreCacheEnabled(fourth == "false" ? true : false);
        setDefaultSearchEngine(fifth);
      } else {
        setIsDarkModeEnabled(true);
        setIsUseDefaultChannelsEnabled(true);
        setIsAutoPlayEnabled(true);
        setIsStoreCacheEnabled(false);
        setDefaultSearchEngine("duckduckgo");
      }
    });
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text
          style={{
            color: colors.text,
            fontSize: 35,
            paddingHorizontal: 10,
            marginVertical: 15,
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
            Auto Darkmode
          </Text>
          <Switch
            style={styles.settingsSwitch}
            value={isDarkModeEnabled}
            onValueChange={toggleDarkModeSwitch}
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

        <Text style={[{ color: colors.text }, styles.categoryText]}>
          Browser
        </Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={[styles.row, { backgroundColor: colors.card }]}
        >
          <Text style={[styles.settingsItemText, { color: colors.text }]}>
            Change default search engine
          </Text>
          <MaterialCommunityIcons
            name="search-web"
            size={25}
            style={[{ color: colors.text }, styles.settingsIcon]}
          />
        </TouchableOpacity>
        <View style={[styles.row, { backgroundColor: colors.card }]}>
          <Text style={[styles.settingsItemText, { color: colors.text }]}>
            Store Cache and History
          </Text>
          <Switch
            style={styles.settingsSwitch}
            value={isStoreChacheEnabled}
            onValueChange={() => {
              toggleStoreChacheSwitch();
            }}
          />
        </View>

        <Text style={[{ color: colors.text }, styles.categoryText]}>
          Player
        </Text>
        <View style={[styles.row, { backgroundColor: colors.card }]}>
          <Text style={[styles.settingsItemText, { color: colors.text }]}>
            Auto play after connecting
          </Text>
          <Switch
            style={styles.settingsSwitch}
            value={isAutoPlayEnabled}
            onValueChange={() => {
              toggleAutoPlaySwitch();
            }}
          />
        </View>
      </View>
      <Modal visible={modalVisible} transparent={true}>
        <View
          style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
        >
          <View
            style={[
              {
                backgroundColor: colors.card,
                margin: 10,
                borderRadius: 15,
              },
              styles.dropShadow,
            ]}
          >
            <Picker
              selectedValue={defaultSearchEngine}
              style={{}}
              itemStyle={{ color: colors.text }}
              prompt="Set Default Search Engine"
              onValueChange={(itemValue, itemIndex) => {
                setDefaultSearchEngine(itemValue);
              }}
            >
              <Picker.Item label="DuckDuckGo" value="duckduckgo" />
              <Picker.Item label="Ecosia" value="ecosia" />
              <Picker.Item label="Bing" value="bing" />
              <Picker.Item label="Google" value="google" />
            </Picker>
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
                  storeItem("@default-search-engine", defaultSearchEngine);
                  setModalVisible(false);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
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
  dropShadow: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default SettingsScreen;
