import React, { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { useAuth } from "./_layout";
import { Appearance, useColorScheme } from 'react-native';


export default function SignIn() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("Password");

  const onSubmit = () => {
    if (!signIn(email, password)) {
      return Alert.alert("Invalid login", "Use test@gmail.com / Password");
    }
router.replace("/(tabs)");
  };
  
  function ThemeSwitch() {
  let colorScheme = useColorScheme();

  if (colorScheme === 'dark') {
    // render some dark thing
  } else {
    // render some light thing
  }
}

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center", gap: 12 }}>
      <Text style={{ fontSize: 26, fontWeight: "700" }}>TSI Portal</Text>
      <Text style={{ opacity: 0.7 }}>Sign in to continue</Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Email"
        style={{ borderWidth: 1, borderRadius: 10, padding: 12 }}
      />

      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Password"
        style={{ borderWidth: 1, borderRadius: 10, padding: 12 }}
      />

      <Pressable
        onPress={onSubmit}
        style={{ padding: 14, borderRadius: 10, borderWidth: 1, alignItems: "center" }}
      >
        <Text style={{ fontWeight: "700" }}>Sign In</Text>
      </Pressable>

      <Text style={{ opacity: 0.6 }}>Demo: test@gmail.com / Password</Text>
    </View>
  );
}
