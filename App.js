import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import TrackPlayer from "react-native-track-player";
import { useEffect } from "react";


import KitScreen from "./screens/KitScreen";
import Home from "./screens/Home";
import Create from "./screens/Create";
import Discover from "./screens/Discover";
import Favorites from "./screens/Favorites";
import Login from "./screens/Login";
import Header from "./components/header";
import Profil from "./screens/Profil";
import { Colors } from "./components/KitUI/tokens";

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
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="discover" component={Discover} />
      <Tab.Screen name="create" component={Create} />
      <Tab.Screen name="favorites" component={Favorites} />
      <Tab.Screen name="kitScreen" component={KitScreen} />
      <Tab.Screen
        name="profil"
        component={Profil}
        options={{
          headerShown: false,
          tabBarButton: () => null, // cache le bouton Profil
        }}
      />
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
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bgPrimarySolid }}>
          <NavigationContainer>
            <Stack.Navigator >
              <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
              {/* <Stack.Screen name="Profil" component={Profil} options={{ headerShown: false }} /> */}
              <Stack.Screen
                name="TabNavigator"
                component={TabNavigator}
                options={({ navigation, route }) => ({
                  headerHideOnScroll: true,
                  header: () => (
                    <Header
                      title="Sleepie"
                      navigation={navigation}
                      route={route}
                    />
                  )
                }
                )}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}
