import React, { useMemo, useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

import TimerButton from "./TimerButton";
import type { Timer } from "../utils/TimerUtils";

type FormValues = Pick<Timer, "id" | "title" | "project">;

type Props = {
  id?: string;
  title?: string;
  project?: string;

  onFormSubmit: (values: FormValues) => void;
  onFormClose: () => void;
};

export default function TimerForm({
  id,
  title,
  project,
  onFormSubmit,
  onFormClose,
}: Props) {
  const isEdit = Boolean(id);

  const [localTitle, setLocalTitle] = useState<string>(isEdit ? title ?? "" : "");
  const [localProject, setLocalProject] = useState<string>(isEdit ? project ?? "" : "");

  const submitText = useMemo(() => (isEdit ? "Update" : "Create"), [isEdit]);

  const handleSubmit = () => {
    onFormSubmit({
      id: id ?? "",
      title: localTitle.trim(),
      project: localProject.trim(),
    });
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.attributeContainer}>
        <Text style={styles.textInputTitle}>Title</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            value={localTitle}
            onChangeText={setLocalTitle}
            placeholder="Timer title"
            autoCorrect={false}
            autoCapitalize="sentences"
          />
        </View>
      </View>

      <View style={styles.attributeContainer}>
        <Text style={styles.textInputTitle}>Project</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            value={localProject}
            onChangeText={setLocalProject}
            placeholder="Project name"
            autoCorrect={false}
            autoCapitalize="words"
            returnKeyType="done"
            onSubmitEditing={handleSubmit}
          />
        </View>
      </View>

      <View style={styles.buttonGroup}>
        <TimerButton small color="#21BA45" title={submitText} onPress={handleSubmit} />
        <TimerButton small color="#DB2828" title="Cancel" onPress={onFormClose} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: "white",
    borderColor: "#D6D7DA",
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    margin: 15,
    marginBottom: 0,
  },
  attributeContainer: {
    marginVertical: 8,
  },
  textInputContainer: {
    borderColor: "#D6D7DA",
    borderRadius: 2,
    borderWidth: 1,
    marginBottom: 5,
  },
  textInput: {
    height: 36,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  textInputTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
