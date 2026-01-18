import React, { useEffect, useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import EditableTimer from "../../components/EditableTimer";
import ToggleableTimerForm from "../../components/ToggleableTimerForm";
import { newTimer } from "../../utils/TimerUtils";
import type { Timer, TimerFormValues } from "../../utils/TimerUtils";

const TIME_INTERVAL = 1000;

export default function TimersTabScreen() {
  const [timers, setTimers] = useState<Timer[]>([]);

  // Tick timers every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimers((prev) =>
        prev.map((t) =>
          t.isRunning ? { ...t, elapsed: t.elapsed + TIME_INTERVAL } : t
        )
      );
    }, TIME_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  const handleUpdateSubmit = (attrs: TimerFormValues) => {
    setTimers((prev) =>
      prev.map((t) =>
        t.id === attrs.id
          ? { ...t, title: attrs.title, project: attrs.project }
          : t
      )
    );
  };

  const handleCreateSubmit = (attrs: TimerFormValues) => {
    setTimers((prev) => [
      newTimer({ title: attrs.title, project: attrs.project }),
      ...prev,
    ]);
  };

  const handleRemovePress = (timerId: string) => {
    setTimers((prev) => prev.filter((t) => t.id !== timerId));
  };

  const toggleTimer = (timerId: string) => {
    setTimers((prev) =>
      prev.map((t) =>
        t.id === timerId ? { ...t, isRunning: !t.isRunning } : t
      )
    );
  };

  const editableTimers = useMemo(
    () =>
      timers.map((t) => (
        <EditableTimer
          key={t.id}
          {...t}
          onFormSubmit={handleUpdateSubmit}
          onRemovePress={handleRemovePress}
          onStartPress={toggleTimer}
          onStopPress={toggleTimer}
        />
      )),
    [timers]
  );

  return (
    <View style={styles.appContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Timers</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.timerListContainer}
      >
        <ScrollView style={styles.timerList}>
          <ToggleableTimerForm onFormSubmit={handleCreateSubmit} />
          {editableTimers}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  titleContainer: {
    paddingTop: 35,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#D6D7DA",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  timerList: {
    paddingBottom: 15,
  },
  timerListContainer: {
    flex: 1,
  },
});
