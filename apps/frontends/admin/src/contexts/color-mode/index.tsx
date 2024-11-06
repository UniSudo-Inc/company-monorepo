import { RefineThemes } from '@refinedev/antd';
import { ConfigProvider, theme } from 'antd';
import { type PropsWithChildren, createContext, useCallback, useEffect, useMemo, useState } from 'react';

interface ColorModeContextType {
  mode: string;
  setMode: (mode: string) => void;
}

export const ColorModeContext = createContext<ColorModeContextType>({} as ColorModeContextType);

export function ColorModeContextProvider({ children }: Readonly<PropsWithChildren>): React.ReactElement {
  const colorModeFromLocalStorage = localStorage.getItem('colorMode');
  const isSystemPreferenceDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const systemPreference = isSystemPreferenceDark ? 'dark' : 'light';
  const [mode, setMode] = useState(colorModeFromLocalStorage ?? systemPreference);

  useEffect(() => {
    window.localStorage.setItem('colorMode', mode);
  }, [mode]);

  const setColorMode = useCallback(() => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  }, []);

  const { darkAlgorithm, defaultAlgorithm } = theme;

  const contextValue = useMemo(
    () => ({
      setMode: setColorMode,
      mode,
    }),
    [setColorMode, mode],
  );

  return (
    <ColorModeContext.Provider value={contextValue}>
      <ConfigProvider
        // you can change the theme colors here. example: ...RefineThemes.Magenta,
        theme={{
          ...RefineThemes.Blue,
          algorithm: mode === 'light' ? defaultAlgorithm : darkAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    </ColorModeContext.Provider>
  );
}
