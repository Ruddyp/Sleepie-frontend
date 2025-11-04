import { NavigationContainer, getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import TrackPlayer, { Capability, AppKilledPlaybackBehavior } from "react-native-track-player";
import { useEffect, useRef } from "react";
import KitScreen from "./screens/KitScreen";
import Home from "./screens/Home";
import Create from "./screens/Create";
import Discover from "./screens/Discover";
import Favorites from "./screens/Favorites";
import Login from "./screens/Login";
import Header from "./components/header";
import Profil from "./screens/Profil";
import Playlist from "./screens/Playlist";
import { Colors } from "./components/KitUI/tokens";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/users";
import createForm from "./reducers/createForm";
import track from "./reducers/track";
import modal from "./reducers/modal";
import modalparam from "./reducers/modalparam"
import stories from "./reducers/stories";
import { NightTabBar } from "./components/KitUI/NightTabBar";
import TrackManager from "./components/Player/TrackManager";

const store = configureStore({
  reducer: { user, createForm, track, modal, stories, modalparam },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={({ state, navigation, descriptors }) => (
        <NightTabBar state={state} navigation={navigation} descriptors={descriptors} />
      )}
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
          tabBarItemStyle: { display: "none" },
          tabBarButton: () => null, // cache le bouton Profil de la tab bar
        }}
      />
      <Tab.Screen
        name="playlist"
        component={Playlist}
        options={{
          tabBarItemStyle: { display: "none" },
          tabBarButton: () => null, // cache le bouton Playlist de la tab bar
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  const isSetup = useRef(false);
  useEffect(() => {
    (async function () {
      if (isSetup.current) {
        console.log("Setup déjà effectué, on ignore la seconde exécution.");
        return;
      }
      try {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.updateOptions({
          progressUpdateEventInterval: 5,
          capabilities: [Capability.Play, Capability.Pause, Capability.SeekTo],
          compactCapabilities: [Capability.Play, Capability.Pause, Capability.SeekTo],
          notificationCapabilities: [Capability.Play, Capability.Pause, Capability.SeekTo],
          android: {
            appKilledPlaybackBehavior: AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
          },
        });
        console.log("setup track player ok.");
      } catch (error) {
        console.log("Error happended while seting up track player => ", error);
      }
    })();
  }, []);

  return (
    <Provider store={store}>
      <TrackManager />
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bgPrimarySolid }}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
              <Stack.Screen
                name="TabNavigator"
                component={TabNavigator}
                options={({ navigation, route }) => {
                  const routeName = getFocusedRouteNameFromRoute(route) || "home";
                  //ajouter ci-dessous pour cacher le header les différentes pages sans header
                  if (routeName === "profil" || routeName === "playlist") {
                    return { headerShown: false };
                  } else {
                    return {
                      header: () => (
                        <Header
                          title="Sleepie"
                          navigation={navigation}
                          route={route}
                          descriptors={route.descriptors}
                        />
                      ),
                    };
                  }
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}
