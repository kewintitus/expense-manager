'use client';
import BreadCrumb from '@/Components/breadcrumb/BreadCrumb';
import SelectAccountType from '@/Components/select/SelectAccountType';
import CancelBtnAccount from '@/UI/CancelBtnAccount';
import EditBtn from '@/UI/EditBtn';
import CancelBtn from '@/UI/formui/CancelBtn';
import SubmitBtn from '@/UI/formui/SubmitBtn';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

const EditAccount = () => {
  const paths = [
    { page: 'Home', path: '/' },
    { page: 'Accounts', path: '/accounts' },
    { page: 'Edit Account', path: '/accounts/Edit Account' },
  ];

  const { data: session, status } = useSession();
  const [userSession, setUserSession] = useState(null);

  const [account, setAccount] = useState(null);
  const [isEditable, setIsEditable] = useState(false);

  const router = useRouter();
  const accNameRef = useRef();
  const accAmt = useRef();
  const params = useParams();
  console.log(params);

  const getAccount = async () => {
    const account = await axios.get(
      `${process.env.NEXT_PUBLIC_APIURL}/api/account/${session?.user?.email}?id=${params.id}`
    );
    setAccount(account.data.data);
    console.log(account.data.data);
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      setUserSession(null);
      router.push('/');
    } else if (status === 'authenticated') {
      setUserSession(session);
      // console.log(session.user.email);
    }
    getAccount();
  }, [session, status]);

  const submitAccountChanges = async () => {
    try {
      const changes = await axios.put(
        `${process.env.NEXT_PUBLIC_APIURL}/api/account/${session?.user?.email}`,
        {
          id: params.id,
          data: {
            accountName: accNameRef.current.value,
            amount: accAmt.current.value,
          },
        }
      );
      setIsEditable(false);
      getAccount();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="px-4">
      <BreadCrumb paths={paths} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitAccountChanges();
        }}
        className="flex flex-col items-start justify-center w-full outline outline-1 outline-slate-300 dark:outline-[#2E2E2E]  p-2 rounded-md"
      >
        <div className="flex gap-8">
          <div className="text-md my-2">Edit Account</div>
          <div
            onClick={() => {
              setIsEditable((prev) => !prev);
            }}
          >
            {isEditable ? <CancelBtnAccount /> : <EditBtn />}
          </div>
        </div>
        <div className="mb-3">
          {/* <h5 className="text-[#8C8C8C] text-sm">Select Account Type</h5> */}
          {/* <SelectAccountType fn={() => {}} /> */}
          {account && (
            <div className="flex flex-col gap-3 items-start justify-start">
              <div>
                <label htmlFor="" className="block text-xs  text-[#8C8C8C]">
                  Account Name
                </label>
                <input
                  ref={accNameRef}
                  className="h-8 min-w-8 text-xs bg-slate-100 outline outline-1 outline-slate-300 rounded-sm dark:outline-[#2E2E2E]  dark:bg-[#191919] px-2"
                  type="text"
                  onChange={(e) => {}}
                  defaultValue={account.accountName}
                  disabled={!isEditable}
                />
              </div>
              <div>
                <label htmlFor="" className="block text-xs  text-[#8C8C8C]">
                  Account Amount
                </label>
                <input
                  ref={accAmt}
                  className="h-8 min-w-8 text-xs bg-slate-100 outline outline-1 outline-slate-300 rounded-sm dark:outline-[#2E2E2E]  dark:bg-[#191919] px-2"
                  type="number"
                  onChange={(e) => {}}
                  defaultValue={account.amount}
                  disabled={!isEditable}
                />
              </div>
              {isEditable && (
                <div className="flex gap-2">
                  <div
                    onClick={() => {
                      setIsEditable(false);
                      getAccount();
                    }}
                  >
                    <CancelBtn>Cancel</CancelBtn>
                  </div>
                  <div>
                    <SubmitBtn>Save</SubmitBtn>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditAccount;
