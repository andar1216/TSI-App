import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import TimerButton from "./TimerButton";
import TimerForm from "./TimerForm";
import type { Timer } from "../utils/TimerUtils";

type FormValues = Pick<Timer, "id" | "title" | "project">;

type Props = {
  onFormSubmit: (values: FormValues) => void;
};

export default function ToggleableTimerForm({ onFormSubmit }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleFormOpen = () => setIsOpen(true);
  const handleFormClose = () => setIsOpen(false);

  const handleFormSubmit = (values: FormValues) => {
    onFormSubmit(values);
    setIsOpen(false);
  };

  return (
    <View style={[styles.container, !isOpen && styles.buttonPadding]}>
      {isOpen ? (
        <TimerForm onFormSubmit={handleFormSubmit} onFormClose={handleFormClose} />
      ) : (
        <TimerButton title="+" color="black" onPress={handleFormOpen} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  buttonPadding: {
    paddingHorizontal: 15,
  },
});
