import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

const RemoteScreen = () => {
  const { colors } = useTheme();
  return (
    <View
      style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
    >
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
      <View
        style={[styles.row, { borderColor: colors.border, borderWidth: 1 }]}
      >
        <View style={styles.col}>
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
        <View style={styles.col}>
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
        <TouchableOpacity style={{ flexDirection: "row" }}>
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
    borderRadius: 10,
    marginHorizontal: 10,
    padding: 5,
  },
  col: {
    flexDirection: "column",
    alignSelf: "center",
    marginVertical: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    padding: 5,
  },
});

export default RemoteScreen;
