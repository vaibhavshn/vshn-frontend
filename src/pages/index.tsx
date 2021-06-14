import { useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

import LandingPage from '@/components/home/LandingPage';
import { useUserStore } from '@/hooks/useUserStore';
import { useRouter } from 'next/router';

const Home = () => {
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/dashboard');
  }, []);

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user]);

  if (user) {
    return <div>Logging you in...</div>;
  }

  return (
    <div>
      <Head>
        <title>vshn.in - Shorten your URLs</title>
      </Head>
      {!user && (
        <motion.main
          initial={{ y: 60, opacity: 0.4 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <LandingPage />
        </motion.main>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(Home), { ssr: false });
