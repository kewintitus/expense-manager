'use client';
import PageLoadSpinner from '@/UI/loaders/PageLoadSpinner';
import TableLoadSpinner from '@/UI/loaders/TableLoadSpinner';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setToast } from '../redux/slices/toastSlice';

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
  // const dispatch = useDispatch();
  const notify = () => {
    // dispatch(setToast([{ type: 'warn', message: 'Wrong' }]));
    toast('Wow so easy!');
  };
  return (
    <div>
      under development
      {/* <div>
        <button onClick={notify}>Notify!</button>
        <ToastContainer />
      </div> */}
    </div>
  );
};

export default More;
