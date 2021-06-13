import 'nprogress/nprogress.css';
import '../styles/globals.css';

import NProgress from 'nprogress';
import Router from 'next/router';
import Head from 'next/head';
import type { AppProps } from 'next/app';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>vshn.in - Shorten your URLs</title>
        {/* <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;900&display=swap"
          rel="stylesheet"
        /> */}
      </Head>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
