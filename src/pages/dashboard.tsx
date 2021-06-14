import Head from 'next/head';
import Link from 'next/link';
import { Menu } from '@headlessui/react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  LogoutIcon,
} from '@heroicons/react/outline';

import useAuth from '@/hooks/auth';
import { logOut } from '@/utils/auth';

export default function Dashboard() {
  const { user, token, updateToken } = useAuth(false);

  if (!token) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>Dashboard - vshn.in</title>
      </Head>
      <div className="w-full max-w-5xl mx-auto p-6">
        <header className="flex items-center justify-between py-2">
          <h1 className="text-4xl font-black tracking-tight">vshn.in</h1>
          <Menu as="div" className="relative">
            <Menu.Button className="flex w-12 h-12 items-center justify-center text-xl font-light bg-gradient-to-br from-orange-300 to-yellow-100 hover:from-orange-100 bg-opacity-40 rounded-full cursor-pointer select-none transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500">
              VS
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
          <div className="flex-1 flex flex-col py-4">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold tracking-tight">13202</div>
              <div className="text-xs text-gray-500">TOTAL VIEWS</div>
            </div>
          </div>
          <div className="w-full max-w-sm mx-auto">
            <h5 className="text-md text-gray-700">Your links</h5>
            <div className="flex flex-col space-y-3 mt-4">
              {[...Array(5)].map((_, i) => (
                <Link href={`/link/updated`} key={`link-${i}`}>
                  <button className="flex items-center justify-between p-4 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-lg transition text-gray-500 hover:text-gray-800 hover:shadow-lg focus:outline-none focus:ring-2 ring-orange-400">
                    <div className="flex-1 flex flex-col items-start w-full space-y-1">
                      <div className="text-black truncate max-w-[320px]">
                        vshn.in/updated
                      </div>
                      <div className="font-light text-xs text-gray-600 truncate max-w-[320px]">
                        https://vaibhavshinde.com
                      </div>
                    </div>
                    <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
                  </button>
                </Link>
              ))}
            </div>
            <div className="flex items-center justify-between mt-6 text-sm">
              <button className="flex items-center px-4 py-2 bg-white text-orange-700 border border-gray-400 rounded-md">
                <ChevronLeftIcon
                  className="w-3 h-3 -ml-2 mr-2"
                  aria-hidden="true"
                />
                Prev
              </button>
              <span className="text-gray-600">1 of 2</span>
              <button className="flex items-center px-4 py-2 bg-white text-orange-700 border border-gray-400 rounded-md">
                Next
                <ChevronRightIcon
                  className="w-3 h-3 -mr-2 ml-2"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
