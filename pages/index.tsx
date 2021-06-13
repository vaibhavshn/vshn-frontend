import Head from 'next/head';
import { motion } from 'framer-motion';

import LandingPage from '@/components/home/LandingPage';

export default function Home() {
  return (
    <div>
      <Head>
        <title>vshn.in - Shorten your URLs</title>
      </Head>
      <motion.main
        initial={{ y: 60, opacity: 0.4 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <LandingPage />
      </motion.main>
    </div>
  );
}
