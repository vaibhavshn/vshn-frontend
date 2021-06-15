import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { Links } from '@/components/dashboard/Links';
import { Header } from '@/components/dashboard/Header';
import { TotalStats } from '@/components/dashboard/TotalStats';
import { useUserStore } from '@/hooks/useUserStore';
import { useEffect } from 'react';

const Dashboard = () => {
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user]);

  if (!user) {
    return <div>Redirecting to homepage...</div>;
  }

  return (
    <div>
      <Head>
        <title>Dashboard - vshn.in</title>
      </Head>
      <div className="w-full max-w-5xl mx-auto p-6">
        <Header />
        <div className="flex flex-col md:flex-row-reverse my-8">
          <TotalStats />
          <Links />
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Dashboard), { ssr: false });
