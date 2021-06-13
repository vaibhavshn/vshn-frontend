import Head from 'next/head';

import LandingPage from '@/components/home/LandingPage';

export default function Home() {
  return (
    <div>
      <Head>
        <title>vshn.in - Shorten your urls</title>
      </Head>
      <LandingPage />
    </div>
  );
}
