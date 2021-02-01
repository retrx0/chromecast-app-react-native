import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import React, { useState } from "react";
import BrowserScreen from "./src/screens/BrowserScreen";
import RemoteScreen from "./src/screens/RemoteScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import NewTabView from "./src/screens/NewTabView";
import EditChannelsScreen from "./src/screens/EditChannelsScreen";
import { Provider as SearchUriProvider } from "./src/context/SearchUriContext";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const stackNavigator = createStackNavigator(
  {
    Browser: BrowserScreen,
    Home: NewTabView,
    Remote: RemoteScreen,
    Settings: SettingsScreen,
    Edit: EditChannelsScreen,
  },
  {
    initialRouteName: "Home",
    mode: "modal",
  }
);

const App = createAppContainer(stackNavigator);

export default () => {
  const scheme = useColorScheme();
  const [darkmode, setDarkmode] = useState("light");
  AsyncStorage.getItem("@dark-mode-enabled").then((data) => {
    if (data != null) {
      let d = data === "false" ? true : false;
      if (d) {
        let mode = scheme === "dark" ? "dark" : "light";
        setDarkmode(mode);
      }
    }
  });
  return (
    <SearchUriProvider>
      <AppearanceProvider>
        <NavigationContainer
          theme={darkmode === "dark" ? DarkTheme : DefaultTheme}
        >
          <App theme={darkmode} />
        </NavigationContainer>
      </AppearanceProvider>
    </SearchUriProvider>
  );
};
