'use client';
import Image from 'next/image';
import React from 'react';
import image from './../../public/assets/money.jpg';
import { signIn } from 'next-auth/react';
import './Login.css';
import { Google } from '@mui/icons-material';

const Login = () => {
  return (
    <div className="flex-1 -z-10 bgImg h-full w-full">
      <div className="p-4 flex h-full flex-col gap-3 items-center justify-center">
        <h2 className="text-5xl text-green-950 bg-green-200 inline-block px-4 py-2 font-bold -skew-x-12">
          ExpenSync
        </h2>
        <p className="text-xl backdrop-blur-sm text-green-200 bg-green-900 font-semibold px-2 py-1">
          Unlock Your Financial Freedom
        </p>
        <button
          onClick={signIn}
          className="bg-blue-900 hover:bg-blue-700 transition-all delay-150 text-white px-3 py-1 rounded-md text-lg w-32 z-50 flex items-center justify-center gap-3"
        >
          <Google />
          <div>Log In</div>
        </button>
      </div>
    </div>
  );
};

export default Login;
