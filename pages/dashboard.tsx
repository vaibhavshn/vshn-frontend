import Head from 'next/head';
import { useEffect } from 'react';

export default function Dashboard() {
  useEffect(() => {
    window.location.href = '/';
  }, []);

  return (
    <div>
      <Head>
        <title>Dashboard - vshn.in</title>
      </Head>
      <div>Dashboard</div>
    </div>
  );
}
