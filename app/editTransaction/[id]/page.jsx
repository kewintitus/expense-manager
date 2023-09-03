'use client';
import BreadCrumb from '@/Components/breadcrumb/BreadCrumb';
import EditTxnForm from '@/Components/form/EditTxnForm';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

const page = () => {
  const pathname = usePathname();

  const { data: session, status } = useSession();
  const [userSession, setUserSession] = useState(null);
  const router = useRouter();
  const txnId = pathname.split('/')[2];
  console.log(pathname.split('/')[2]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      setUserSession(null);
      router.push('/');
    } else if (status === 'authenticated') {
      setUserSession(session);
      // console.log(session.user.email);
    }
  }, [session, status]);
  const paths = [
    { page: 'Home', path: '/' },
    { page: 'Edit Transaction', path: pathname },
  ];
  return (
    <div className="px-6 flex flex-col overflow-y-scroll h-full pb-48 sm:pb-0">
      <BreadCrumb paths={paths} />
      <ToastContainer />
      <div className="text-lg my-2">Edit Transaction</div>
      <div className="flex-1 overflow-y-scroll sm:overflow-y-auto my-2">
        <EditTxnForm userEmail={session?.user?.email} txnId={txnId} />
      </div>
    </div>
  );
};

export default page;
