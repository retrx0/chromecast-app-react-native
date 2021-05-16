import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import React, { useState } from "react";
import BrowserScreen from "./src/screens/BrowserScreen";
import RemoteScreen from "./src/screens/RemoteScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import NewTabView from "./src/screens/NewTabView";
import RearrangeChannelsScreen from "./src/screens/RearrangeChannelsScreen";
import { Provider as SearchUriProvider } from "./src/context/SearchUriContext";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EditChannelModal from "./src/components/EditChannelModal";

const customTheme = {
  dark: true,
  roundness: 4,
  colors: {
    primary: "#3A87FA",
    accent: "#B113FE",
    background: "#000000",
    tint: "#fcfcfc",
    card: "#151515",
    border: "#111111",
    surface: "#F1F7ED",
    text: "#FcFcFc",
    error: "#B71F0E",
    disabled: "#BEC6C6",
    placeholder: "#f2f2f2",
    backdrop: "#001021",
  },
  fonts: {
    regular: "Helvetica Neue",
    medium: "Helvetica Neue Light",
  },
};

const lightTheme = {
  dark: true,
  roundness: 4,
  colors: {
    primary: "#3A87FA",
    accent: "#B113FE",
    background: "#FAFBFD",
    tint: "#fcfcfc",
    card: "#FFFFFF",
    border: "#FCFCFC",
    surface: "#F1F7ED",
    text: "#000000",
    error: "#B71F0E",
    disabled: "#BEC6C6",
    placeholder: "#f2f2f2",
    backdrop: "#001021",
  },
  fonts: {
    regular: "Helvetica Neue",
    medium: "Helvetica Neue Light",
  },
};

const stackNavigator = createStackNavigator(
  {
    Browser: BrowserScreen,
    Home: NewTabView,
    Remote: RemoteScreen,
    Settings: SettingsScreen,
    Edit: RearrangeChannelsScreen,
    EditChannel: EditChannelModal,
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
          theme={darkmode === "dark" ? customTheme : lightTheme}
        >
          <App theme={darkmode} />
        </NavigationContainer>
      </AppearanceProvider>
    </SearchUriProvider>
  );
};
