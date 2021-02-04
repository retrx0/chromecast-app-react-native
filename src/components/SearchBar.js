import React, { useState, useContext } from "react";
import { StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

const SearchBar = ({ navigation }) => {
  const [address, setAddress] = useState("");
  const { colors } = useTheme();
  return (
    <View
      style={{
        height: 48,
        padding: 5,
        marginVertical: 5,
        flexDirection: "row",
      }}
    >
      <TextInput
        style={{
          flex: 1,
          fontSize: 15,
          borderColor: colors.border,
          borderWidth: 0.3,
          borderRadius: 8,
          height: 40,
          paddingLeft: 7,
          backgroundColor: colors.card,
          color: colors.text,
        }}
        placeholder="Type url"
        clearButtonMode="while-editing"
        keyboardType="url"
        returnKeyType="go"
        autoCapitalize="none"
        autoCorrect={false}
        value={address}
        onChangeText={setAddress}
        onFocus={() => setAddress("")}
        onSubmitEditing={() => {
          navigation.navigate("Browser", { uri: `http://www.${address}` });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default SearchBar;
