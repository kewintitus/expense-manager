'use client';
import BreadCrumb from '@/Components/breadcrumb/BreadCrumb';
import EditTxnForm from '@/Components/form/EditTxnForm';
import { Delete } from '@mui/icons-material';
import { Icon, IconButton } from '@mui/material';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import * as Dialog from '@radix-ui/react-dialog';
import DeleteTxn from '@/Components/DeleteTxnDialog/DeleteTxn';
import DialogDemo from '@/Components/dialogDemo/Dialog';

const page = () => {
  const pathname = usePathname();

  const { data: session, status } = useSession();
  const [userSession, setUserSession] = useState(null);
  const [txnData, setTxnData] = useState(null);
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
      <div className="my-2 flex justify-between">
        <div className="text-lg ">Edit Transaction</div>
        {/* <Dialog.Root>
          <Dialog.Trigger asChild>
            <IconButton size="medium" className="bg-red-600 hover:bg-red-900">
              <Delete className="text-sm text-white " />
            </IconButton>
          </Dialog.Trigger>
          <DeleteTxn />
        </Dialog.Root> */}
        <DialogDemo txnData={txnData} tnxId={txnId} />
      </div>
      <div className="flex-1 overflow-y-scroll sm:overflow-y-auto my-2">
        <EditTxnForm
          user={session?.user}
          userEmail={session?.user?.email}
          txnId={txnId}
          setTxnData={setTxnData}
        />
      </div>
    </div>
  );
};

export default page;
