import Head from 'next/head';
import { motion } from 'framer-motion';

import LandingPage from '@/components/home/LandingPage';
import useAuth from '@/hooks/auth';

export default function Home() {
  const { user, token, updateToken } = useAuth();

  return (
    <div>
      <Head>
        <title>vshn.in - Shorten your URLs</title>
      </Head>
      {!token && (
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
}
