import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { ThemeProviderHook } from './theme';

const AppProvider: React.FC = ({ children }) => {
  return (
    <ThemeProviderHook>
      <AuthProvider>
        <ToastProvider>{children}</ToastProvider>
      </AuthProvider>
    </ThemeProviderHook>
  );
};

export default AppProvider;
