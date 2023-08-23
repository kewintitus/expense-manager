'use client';
import { useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BarLoader, PacmanLoader, ScaleLoader } from 'react-spinners';

const TableLoadSpinner = () => {
  const { data: session, status } = useSession();
  const [userSession, setUserSession] = useState(null);
  const router = useRouter();
  const [color, setColor] = useState('#98ffff');
  const theme = useTheme();
  console.log(theme.theme);
  useEffect(() => {
    if (theme.theme === 'dark') {
      setColor('white');
    } else {
      setColor('#183883');
    }
    if (status === 'unauthenticated') {
      setUserSession(null);
      router.push('/');
    } else if (status === 'authenticated') {
      setUserSession(session);
      // console.log(session.user.email);
    }
  }, [theme.theme, session, status]);
  return (
    <div className="w-full h-full flex items-center justify-center">
      <ScaleLoader color={color} />
    </div>
  );
};

export default TableLoadSpinner;
