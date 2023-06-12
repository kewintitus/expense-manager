'use client';
import * as Popover from '@radix-ui/react-popover';
import { signIn, signOut, useSession } from 'next-auth/react';

const AccountPopover = (props) => {
  const { data: session } = useSession();
  return (
    <Popover.Root>
      <Popover.Trigger>{props.children}</Popover.Trigger>
      <Popover.Anchor />
      <Popover.Portal>
        <Popover.Content>
          <ul className="bg-gray-600  text-sm rounded-sm cursor-pointer">
            <li className="p-1 hover:bg-gray-300 hover:text-gray-700">
              View Account
            </li>
            <li className="p-1 hover:bg-gray-300 hover:text-gray-700">
              {session?.user ? (
                <div onClick={signOut}>Login</div>
              ) : (
                <div onClick={signIn}>Logout</div>
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
