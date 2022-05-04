import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import 'tailwindcss/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/general.css';
import '../styles/navStyle.css';
import '../styles/dropdown.css';
import '../styles/rating.css';
import Layout from '../components/layout';
// import { useState } from 'react';
// import PageSetContext from '../PageSetContext';
import AppContext from '../appContext';
import dataObject from '../dataObject';
import { motion } from 'framer-motion';
// import LazyLoadComponent from 'react-intersection-observer-lazy-load';
function MyApp({ Component, pageProps, router }) {
  // const [pageState, setPageState] = useState({
  //   location: 0,
  //   game: 0,
  //   onReload: (location, game) => {
  //     setPageState({ ...pageState, location, game });
  //   },
  // });
  return (
    <SessionProvider
      session={pageProps.session}
      options={{
        // Stale Time controls how often the useSession in the client should
        // contact the server to sync the session state. Value in seconds.
        // e.g.
        // * 0  - Disabled (always use cache value)
        // * 60 - Sync session state with server if it's older than 60 seconds
        staleTime: 0,
        // Refetch Interval tells windows / tabs that are signed in to keep sending
        // a keep alive request (which extends the current session expiry) to
        // prevent sessions in open windows from expiring. Value in seconds.
        //
        // Note: If a session has expired when keep alive is triggered, all open
        // windows / tabs will be updated to reflect the user is signed out.
        refetchInterval: 0,
      }}
    >
      <Head>
        <title>
          Таинственный переулок, центр квестов и пряток в Челябинске.
        </title>
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="apple-icon-180x180.png"
        />
        {/*<link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="android-icon-192x192.png"
        />
         <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="favicon-16x16.png"
        /> */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta
          name="description"
          content="Таинственный переулок, центр квестов и пряток в Челябинске. Квесты в реальности и прятки во тьме"
        />
      </Head>
      {/* <PageSetContext.Provider value={pageState}> */}
        <AppContext.Provider value={dataObject}>
          <motion.div
            key={router.route}
            initial="pageInitial"
            animate="pageAnimate"
            variants={{
              pageInitial: { opacity: 0, x: -200, y: 0 },
              pageAnimate: { opacity: 1, x: 0, y: 0 },
            }}
            exit={{ opacity: 0, x: 0, y: -100 }}
            transition={{ duration: 0.5 }}
          >
            <Layout>
              {/* <LazyLoadComponent> */}
              <Component {...pageProps} />
              {/* </LazyLoadComponent> */}
            </Layout>
          </motion.div>
        </AppContext.Provider>
      {/* </PageSetContext.Provider> */}
    </SessionProvider>
  );
}

export default MyApp;
