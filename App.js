import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import React from "react";
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
  return (
    <SearchUriProvider>
      <AppearanceProvider>
        <NavigationContainer
          theme={scheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <App theme={scheme === "dark" ? "dark" : "light"} />
        </NavigationContainer>
      </AppearanceProvider>
    </SearchUriProvider>
  );
};
