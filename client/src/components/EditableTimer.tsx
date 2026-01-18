import React, { useState } from "react";

import TimerForm from "./TimerForm";
import TimerView from "./Timer";
import type { Timer as TimerType } from "../utils/TimerUtils";

type FormValues = Pick<TimerType, "id" | "title" | "project">;

type Props = TimerType & {
  onFormSubmit: (values: FormValues) => void;
  onRemovePress: (id: string) => void;
  onStartPress: (id: string) => void;
  onStopPress: (id: string) => void;
};

export default function EditableTimer(props: Props) {
  const [editFormOpen, setEditFormOpen] = useState(false);

  const openForm = () => setEditFormOpen(true);
  const closeForm = () => setEditFormOpen(false);

  const handleSubmit = (values: FormValues) => {
    props.onFormSubmit(values);
    closeForm();
  };

  const { id, title, project, elapsed, isRunning, onRemovePress, onStartPress, onStopPress } =
    props;

  if (editFormOpen) {
    return (
      <TimerForm
        id={id}
        title={title}
        project={project}
        onFormSubmit={handleSubmit}
        onFormClose={closeForm}
      />
    );
  }

  return (
    <TimerView
      id={id}
      title={title}
      project={project}
      elapsed={elapsed}
      isRunning={isRunning}
      onEditPress={openForm}
      onRemovePress={() => onRemovePress(id)}
      onStartPress={() => onStartPress(id)} // ✅ fixed
      onStopPress={() => onStopPress(id)}
    />
  );
}
