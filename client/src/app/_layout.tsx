import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "../components/useColorScheme";

export { ErrorBoundary } from "expo-router";

// Start on Sign In (index)
export const unstable_settings = {
  initialRouteName: "index",
};

SplashScreen.preventAutoHideAsync();

/* ---------- Auth (fake for now) ---------- */
type AuthCtx = {
  userEmail: string | null;
  signIn: (email: string, password: string) => boolean;
  signOut: () => void;
};

const AuthContext = createContext<AuthCtx>(null as any);
export const useAuth = () => useContext(AuthContext);

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  const [userEmail, setUserEmail] = useState<string | null>(null);

  const auth = useMemo<AuthCtx>(
    () => ({
      userEmail,
      signIn: (email, password) => {
        const ok =
          email.trim().toLowerCase() === "test@gmail.com" && password === "Password";
        if (ok) setUserEmail("test@gmail.com");
        return ok;
      },
      signOut: () => setUserEmail(null),
    }),
    [userEmail]
  );

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <AuthContext.Provider value={auth}>
      <RootLayoutNav />
    </AuthContext.Provider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Sign In */}
        <Stack.Screen name="index" options={{ headerShown: false }} />

        {/* Protected App */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Existing */}
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </ThemeProvider>
  );
}
