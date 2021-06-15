import Link from 'next/link';
import { Menu } from '@headlessui/react';
import { LogoutIcon, ChevronRightIcon } from '@heroicons/react/outline';

import { useUserStore } from '@/hooks/useUserStore';

const getUserInitials = (name: string) => {
  const matches: RegExpMatchArray | null = name.match(/\b(\w)/g);
  if (!matches) {
    return name[0].toUpperCase();
  }
  const acronym: string = matches.join('').toUpperCase();
  return acronym.substr(0, 2);
};

export const Header = () => {
  const user = useUserStore((state) => state.user);
  const setToken = useUserStore((state) => state.setToken);

  const logOut = () => {
    setToken('');
  };

  return (
    <header className="flex items-center justify-between py-2">
      <Link href="/dashboard">
        <h1 className="text-4xl font-black tracking-tight cursor-pointer select-none">
          vshn.in
        </h1>
      </Link>
      {user && (
        <Menu as="div" className="relative">
          <Menu.Button className="flex w-12 h-12 items-center justify-center text-xl font-light bg-gradient-to-br from-orange-300 to-yellow-100 hover:from-orange-100 bg-opacity-40 rounded-full cursor-pointer select-none transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500">
            {getUserInitials(user.name)}
          </Menu.Button>
          <Menu.Items className="z-10 absolute right-0 w-56 p-2 mt-2 origin-top-right bg-white rounded-md shadow-lg border focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`group flex items-center w-full p-2 rounded-md text-sm ${
                    active ? 'bg-orange-100 text-orange-700' : ''
                  }`}
                  onClick={() => logOut()}
                >
                  <LogoutIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                  Log Out
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>
      )}
    </header>
  );
};
