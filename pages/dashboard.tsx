import { logOut } from '@/utils/auth';
import Head from 'next/head';
import { useEffect } from 'react';

export default function Dashboard() {
  useEffect(() => {}, []);

  return (
    <div>
      <Head>
        <title>Dashboard - vshn.in</title>
      </Head>
      <div>Dashboard</div>
      <button
        onClick={(_) => {
          logOut();
        }}
      >
        Log Out
      </button>
    </div>
  );
}
