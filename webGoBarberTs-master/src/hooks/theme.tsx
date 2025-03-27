import React, { createContext, useCallback, useContext, useState } from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import usePersistedState from './usePersistedState';

import GlobalStyle from '../styles/global';
import light from '../styles/themes/light';
import dark from '../styles/themes/dark';

interface Theme {
  menuColor?: string;
  layout?: 'vertical' | 'horizontal'; // "vertical", "horizontal"
  name: 'light' | 'dark' | 'semidark';
  sidebarCollapsed?: boolean;
  navbarColor?: string;
  navbarType?: 'hidden' | 'static' | 'sticky' | 'floating';
  footerType?: 'hidden' | 'static' | 'sticky';
  direction?: 'ltl' | 'rtl';
  hideScrollToTop?: boolean;
}
const defaultTheme: Theme = {
  menuColor: 'primary',
  layout: 'vertical',
  name: 'light',
  sidebarCollapsed: false,
  navbarColor: 'primary',
  navbarType: 'floating',
  footerType: 'static',
  direction: 'rtl',
  hideScrollToTop: false,
};
interface ThemeContextData {
  theme: Theme;
  changeTheme(theme: Theme): void;
}
interface ThemeState {
  theme: Theme;
}
const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const ThemeProviderHook: React.FC = ({ children }) => {
  const [data, setData] = usePersistedState<ThemeState>('@gobarber:theme', {
    theme: defaultTheme,
  });
  const [themeStyled, setThemeStyled] = useState<DefaultTheme>(() => {
    if (data && data.theme.name === 'dark') {
      return dark;
    }
    return light;
  });

  const changeTheme = useCallback(
    (theme: Theme) => {
      const dataAux = { theme: { ...data.theme, ...theme } };
      setData(dataAux);
      if (dataAux.theme.name === 'light') {
        setThemeStyled(light);
      } else {
        setThemeStyled(dark);
      }
    },
    [data.theme, setData],
  );

  return (
    <ThemeContext.Provider value={{ theme: data.theme, changeTheme }}>
      <ThemeProvider theme={themeStyled}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export function useTheme(): ThemeContextData {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
