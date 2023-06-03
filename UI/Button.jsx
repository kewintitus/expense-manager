'use client';
import { useTheme } from 'next-themes';
import React from 'react';
import { MdDarkMode, MdLightMode, MdModeNight } from 'react-icons/md';

const Button = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  console.log(theme);
  return (
    <button
      className="flex flex-col  items-center gap-1 text-[10px] px-4 py-1 rounded-sm  hover:dark:bg-slate-900 hover:bg-gray-400 transition-all duration-300"
      onClick={() => (theme === 'dark' ? setTheme('light') : setTheme('dark'))}
    >
      {theme === 'dark' ? <MdDarkMode size={26} /> : <MdLightMode size={26} />}
      {theme === 'dark' ? 'Dark' : 'Light'}
    </button>
  );
};

export default Button;
