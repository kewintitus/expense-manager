'use client';
import BreadCrumb from '@/Components/breadcrumb/BreadCrumb';
import AccountsList from '@/Components/lists/AccountsList';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const AccountsPage = () => {
  const paths = [
    { page: 'Home', path: '/' },
    { page: 'Accounts', path: '/accounts' },
  ];

  const { data: session, status } = useSession();
  const [userSession, setUserSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      setUserSession(null);
      router.push('/');
    } else if (status === 'authenticated') {
      setUserSession(session);
    }
  }, [session, status]);

  return (
    <div className="px-6">
      <BreadCrumb paths={paths} />
      <div className="text-lg my-2">Accounts</div>
      <AccountsList session={session} />
    </div>
  );
};

export default AccountsPage;
