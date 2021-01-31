import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { getChannels, storeChannels } from "../hooks/useChannels";

const RemoteScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <View
        style={[styles.row, { borderColor: colors.border, borderWidth: 1 }]}
      >
        <TouchableOpacity>
          <Ionicons
            style={{ color: colors.text }}
            name="play-back-sharp"
            size={80}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons
            style={{ color: colors.text }}
            name="play-sharp"
            size={80}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons
            style={{ color: colors.text }}
            name="play-forward-sharp"
            size={80}
          />
        </TouchableOpacity>
      </View>
      <View style={[styles.row]}>
        <View
          style={[styles.col, { borderColor: colors.border, borderWidth: 1 }]}
        >
          <Text style={{ alignSelf: "center", color: colors.text }}>
            Channels
          </Text>
          <TouchableOpacity>
            <AntDesign
              style={{ color: colors.text }}
              name="caretup"
              size={80}
            />
          </TouchableOpacity>
          <TouchableOpacity>
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
          <TouchableOpacity>
            <AntDesign style={{ color: colors.text }} name="plus" size={80} />
          </TouchableOpacity>
          <TouchableOpacity>
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
