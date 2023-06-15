'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useState } from 'react';
// import { data } from 'autoprefixer';

const Test = () => {
  const { data: session, status } = useSession();
  const [userSession, setUserSession] = useState(null);

  useEffect(() => {
    if (status === 'unauthenticated') setUserSession(null);
    else if (status === 'authenticated') setUserSession(session);
  }, [session, status]);

  console.log(session, status);

  return (
    <p>
      {status === 'unauthenticated' ? (
        <p>Kingly Login</p>
      ) : (
        <p>Logged in as {session?.user?.name}</p>
      )}
    </p>
  );
};

export default Test;
