'use client';
import { useTheme } from 'next-themes';
import React from 'react';

const Button = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  return <button>Toggle</button>;
};

export default Button;
