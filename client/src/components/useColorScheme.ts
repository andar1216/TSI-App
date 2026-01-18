import * as SecureStore from 'expo-secure-store';
import React from 'react';
import { useColorScheme as useSystemScheme } from 'react-native';

type Scheme = 'light' | 'dark';
type Mode = 'system' | Scheme;

const KEY = 'tsi_theme_mode_v1';

let memoryMode: Mode = 'system';

async function loadMode() {
  try {
    const saved = await SecureStore.getItemAsync(KEY);
    if (saved === 'light' || saved === 'dark' || saved === 'system') memoryMode = saved;
  } catch {}
  return memoryMode;
}

async function saveMode(mode: Mode) {
  memoryMode = mode;
  try {
    await SecureStore.setItemAsync(KEY, mode);
  } catch {}
}

const ThemeCtx = React.createContext<{
  mode: Mode;
  scheme: Scheme;
  setMode: (m: Mode) => void;
  toggle: () => void;
  resetToSystem: () => void;
  ready: boolean;
} | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const system = (useSystemScheme() ?? 'light') as Scheme;
  const [mode, setModeState] = React.useState<Mode>('system');
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const m = await loadMode();
      setModeState(m);
      setReady(true);
    })();
  }, []);

  const scheme: Scheme = mode === 'system' ? system : mode;

  const setMode = (m: Mode) => {
    setModeState(m);
    saveMode(m);
  };

  const toggle = () => {
    const next: Scheme = scheme === 'dark' ? 'light' : 'dark';
    setMode(next);
  };

  const resetToSystem = () => setMode('system');

  return (
    <ThemeCtx.Provider value={{ mode, scheme, setMode, toggle, resetToSystem, ready }}>
      {children}
    </ThemeCtx.Provider>
  );
}

// This keeps Themed.tsx working exactly as written:
export function useColorScheme(): Scheme {
  const ctx = React.useContext(ThemeCtx);
  if (!ctx) return (useSystemScheme() ?? 'light') as Scheme; // fallback if provider not mounted
  return ctx.scheme;
}

// Use this in Profile to toggle/reset:
export function useThemeControls() {
  const ctx = React.useContext(ThemeCtx);
  if (!ctx) throw new Error('useThemeControls must be used inside ThemeProvider');
  return ctx;
}
