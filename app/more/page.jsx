'use client';
import PageLoadSpinner from '@/UI/loaders/PageLoadSpinner';
import TableLoadSpinner from '@/UI/loaders/TableLoadSpinner';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const More = () => {
  const { data: session, status } = useSession();
  const [userSession, setUserSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      setUserSession(null);
      router.push('/');
    } else if (status === 'authenticated') setUserSession(session);
  }, [session, status]);
  return (
    <div>under development</div>
    // <TableLoadSpinner />
    // <PageLoadSpinner />
  );
};

export default More;
