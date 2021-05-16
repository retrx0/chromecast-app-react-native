import React, { useRef } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import {
  MaterialCommunityIcons,
  Feather,
  AntDesign,
  Ionicons,
  EvilIcons,
} from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { CastButton } from "react-native-google-cast";

const BottomNav = ({ navigation, visible }) => {
  const { colors } = useTheme();
  return visible ? (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-around",
        backgroundColor: "#fcfcfc",
        height: 80,
        padding: 10,
        backgroundColor: colors.card,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 5,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          const prevPage = navigation.getParam("prevPage");
          if (prevPage) {
            prevPage.onPress();
          }
        }}
      >
        <EvilIcons
          style={{ color: colors.text }}
          name="chevron-left"
          size={40}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          const forwardPage = navigation.getParam("forwardPage");
          if (forwardPage) {
            forwardPage.onPress();
          }
        }}
      >
        <EvilIcons
          style={{ color: colors.text }}
          name="chevron-right"
          size={40}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Remote")}>
        <Ionicons
          style={{ color: colors.text }}
          name="ios-tv-outline"
          size={30}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
        <EvilIcons style={{ color: colors.text }} name="gear" size={35} />
      </TouchableOpacity>
    </View>
  ) : null;
};

const styles = StyleSheet.create({});

export default BottomNav;
