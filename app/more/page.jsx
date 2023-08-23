'use client';
import PageLoadSpinner from '@/UI/loaders/PageLoadSpinner';
import TableLoadSpinner from '@/UI/loaders/TableLoadSpinner';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

const More = () => {
  const { data: session, status } = useSession();
  const [userSession, setUserSession] = useState(null);
  useEffect(() => {
    if (status === 'unauthenticated') setUserSession(null);
    else if (status === 'authenticated') setUserSession(session);
  }, [session, status]);
  return (
    <div>under development</div>
    // <TableLoadSpinner />
    // <PageLoadSpinner />
  );
};

export default More;
