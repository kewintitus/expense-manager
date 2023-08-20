'use client';
import * as Popover from '@radix-ui/react-popover';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect } from 'react';
import { useState } from 'react';
import { MdOutlineAccountCircle } from 'react-icons/md';

const AccountPopover = (props) => {
  const { data: session, status } = useSession();

  const [userDetails, setUserDetails] = useState(null);

  console.log(session);
  // useEffect(() => {
  //   if (status === 'unauthenticated') setUserDetails(null);
  //   else if (status === 'authenticated') setUserDetails(session);
  // }, [session, status]);

  return (
    <Popover.Root>
      <Popover.Trigger>
        <div className="flex gap-2 z-40 ">
          {status === 'authenticated' ? (
            <Image
              alt="user profile pic"
              className="rounded-full self-center"
              height={36}
              width={36}
              src={session?.user?.image}
            />
          ) : (
            <MdOutlineAccountCircle className="text-4xl" />
          )}
          <div className="hidden sm:block">
            <div className="text-base">{session?.user?.name}</div>
            <div className="text-sm">{session?.user?.email}</div>
          </div>
        </div>
      </Popover.Trigger>
      <Popover.Anchor />
      <Popover.Portal>
        <Popover.Content>
          <ul className="bg-gray-100 outline outline-1 outline-gray-600 dark:bg-gray-600   text-sm rounded-sm cursor-pointer z-50">
            <li className="p-1 hover:bg-gray-300 hover:text-gray-700">
              View Account
            </li>
            <li className="p-1 hover:bg-gray-300 hover:text-gray-700">
              {status === 'unauthenticated' ? (
                <div onClick={signIn}>Login</div>
              ) : (
                <div onClick={signOut}>Logout</div>
              )}
            </li>
          </ul>

          <Popover.Close />
          <Popover.Arrow />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default AccountPopover;
