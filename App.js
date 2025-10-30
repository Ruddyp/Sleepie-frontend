import { NavigationContainer, getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import TrackPlayer, { Capability } from "react-native-track-player";
import { useEffect, useRef } from "react";

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
import createForm from "./reducers/createForm";
import track from "./reducers/track";
import { NightTabBar } from "./components/KitUI/NightTabBar";

const store = configureStore({
  reducer: { user, createForm, track },
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
    </Tab.Navigator>
  );
};

const setupTrackPlayer = async () => {
  try {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      capabilities: [Capability.Play, Capability.Pause, Capability.SeekTo],
      compactCapabilities: [Capability.Play, Capability.Pause, Capability.SeekTo],
    });
    console.log("setup track player ok.");
  } catch (error) {
    console.log("Error happened while setting up track player => ", error);
  }
};

export default function App() {
  const isPlayerSetup = useRef(false);
  useEffect(() => {
    if (!isPlayerSetup.current) {
      setupTrackPlayer();
      isPlayerSetup.current = true;
    }
  }, []);

  return (
    <Provider store={store}>
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
                  if (routeName === "profil") {
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
