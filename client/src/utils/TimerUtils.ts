import { nanoid } from "nanoid";

export type Timer = {
  id: string;
  title: string;
  project: string;
  elapsed: number; // milliseconds
  isRunning: boolean;
};

export type TimerFormValues = Pick<Timer, "id" | "title" | "project">;

const padLeft = (value: number, size = 2) => String(value).padStart(size, "0");

export const millisecondsToHuman = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);

  return `${padLeft(hours)}:${padLeft(minutes)}:${padLeft(seconds)}`;
};

export const newTimer = (
  attrs: Partial<Pick<Timer, "title" | "project">> = {}
): Timer => {
  return {
    id: nanoid(),
    title: attrs.title ?? "Timer",
    project: attrs.project ?? "Project",
    elapsed: 0,
    isRunning: false,
  };
};
