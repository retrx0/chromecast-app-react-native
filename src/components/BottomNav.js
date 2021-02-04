import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import {
  MaterialCommunityIcons,
  Feather,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { CastButton } from "react-native-google-cast";

const BottomNav = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "baseline",
        justifyContent: "space-around",
        backgroundColor: "#fcfcfc",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        height: 70,
        padding: 10,
        backgroundColor: colors.card,
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
        <AntDesign style={{ color: colors.text }} name="arrowleft" size={30} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          const forwardPage = navigation.getParam("forwardPage");
          if (forwardPage) {
            forwardPage.onPress();
          }
        }}
      >
        <AntDesign style={{ color: colors.text }} name="arrowright" size={30} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Remote")}>
        <MaterialCommunityIcons
          style={{ color: colors.text }}
          name="remote-tv"
          size={30}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
        <Feather style={{ color: colors.text }} name="settings" size={30} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default BottomNav;
