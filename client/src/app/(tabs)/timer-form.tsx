import React from "react";
import { View, StyleSheet } from "react-native";

import TimerForm from "../../components/TimerForm";
import type { TimerFormValues } from "../../utils/TimerUtils";

export default function TimerFormScreen() {
  const handleSubmit = (values: TimerFormValues) => {
    // TODO: wire into state/store
    console.log("Timer submitted:", values);
  };

  return (
    <View style={styles.container}>
      <TimerForm onFormSubmit={handleSubmit} onFormClose={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
});
