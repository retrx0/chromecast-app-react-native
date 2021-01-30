import AsyncStorage from "@react-native-async-storage/async-storage";

export const getChannels = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("@channels");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

export const storeChannels = async (list) => {
  try {
    const jsonValue = JSON.stringify(list);
    await AsyncStorage.setItem("@channels", jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const storeItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};

export const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key + "");
    if (value !== null) {
      console.log(value);
    }
  } catch (e) {
    console.log(e);
  }
};
