'use client';

import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

const Providers = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class">{children}</ThemeProvider>;
    </SessionProvider>
  );
};

export default Providers;
