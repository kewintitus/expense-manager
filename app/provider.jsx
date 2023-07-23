'use client';

import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const Providers = ({ children, session }) => {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <ThemeProvider attribute="class">{children}</ThemeProvider>;
      </SessionProvider>
    </Provider>
  );
};

export default Providers;
