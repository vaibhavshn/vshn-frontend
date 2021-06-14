import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Menu } from '@headlessui/react';
import { LogoutIcon } from '@heroicons/react/outline';

import { Links } from '@/components/dashboard/Links';
import { TotalStats } from '@/components/dashboard/TotalStats';
import { useUserStore } from '@/hooks/useUserStore';
import { useEffect } from 'react';

const getUserInitials = (name: string) => {
  const matches: RegExpMatchArray | null = name.match(/\b(\w)/g);
  if (!matches) {
    return name[0].toUpperCase();
  }
  const acronym: string = matches.join('').toUpperCase();
  return acronym.substr(0, 2);
};

const Dashboard = () => {
  const user = useUserStore((state) => state.user);
  const setToken = useUserStore((state) => state.setToken);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user]);

  if (!user) {
    return <div>Redirecting to homepage...</div>;
  }

  const logOut = () => {
    setToken('');
    router.push('/');
  };

  return (
    <div>
      <Head>
        <title>Dashboard - vshn.in</title>
      </Head>
      <div className="w-full max-w-5xl mx-auto p-6">
        <header className="flex items-center justify-between py-2">
          <h1 className="text-4xl font-black tracking-tight">vshn.in</h1>
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
        </header>
        <div className="flex flex-col md:flex-row-reverse my-8">
          <TotalStats />
          <Links />
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Dashboard), { ssr: false });
