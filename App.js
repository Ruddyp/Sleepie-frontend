import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TrackPlayer from "react-native-track-player";
import { useEffect } from "react";

import KitScreen from "./screens/KitScreen";
import Home from "./screens/Home";
import Create from "./screens/Create";
import Listen from "./screens/Listen";
import Favoris from "./screens/Favoris";
import Login from "./screens/Login";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/users";
import { NightTabBar } from "./components/KitUI/NightTabBar";

const store = configureStore({
  reducer: { user },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={({ state, navigation }) => <NightTabBar state={state} navigation={navigation} />}
    >
      <Tab.Screen name="Accueil" component={Home} />
      <Tab.Screen name="Écouter" component={Listen} />
      <Tab.Screen name="Créer" component={Create} />
      <Tab.Screen name="Favoris" component={Favoris} />
      <Tab.Screen name="KitScreen" component={KitScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  useEffect(() => {
    (async function () {
      try {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.updateOptions({
          capabilities: [TrackPlayer.Capability.Play, TrackPlayer.Capability.Pause],
          compactCapabilities: [TrackPlayer.Capability.Play, TrackPlayer.Capability.Pause],
        });
        console.log("setup track player ok.");
      } catch (error) {
        console.log("Error happended while seting up track player => ", error);
      }
    })();
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
