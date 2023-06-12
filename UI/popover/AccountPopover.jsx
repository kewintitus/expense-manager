'use client';
import * as Popover from '@radix-ui/react-popover';

const AccountPopover = (props) => (
  <Popover.Root>
    <Popover.Trigger>{props.children}</Popover.Trigger>
    <Popover.Anchor />
    <Popover.Portal>
      <Popover.Content>
        <ul className="bg-gray-600  text-sm rounded-sm cursor-pointer">
          <li className="p-1 hover:bg-gray-300 hover:text-gray-700">
            View Account
          </li>
          <li className="p-1 hover:bg-gray-300 hover:text-gray-700"> Logout</li>
        </ul>

        <Popover.Close />
        <Popover.Arrow />
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
);

export default AccountPopover;
