import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import 'tailwindcss/tailwind.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/general.css';
import '../styles/navStyle.css';
import '../styles/rating.css';
import Layout from '../components/layout';
import AppContext from '../appContext';
import dataObject from '../dataObject';
// import LazyLoadComponent from 'react-intersection-observer-lazy-load';
function MyApp({ Component, pageProps }) {
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
          HREF="apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          HREF="apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          HREF="apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          HREF="apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          HREF="apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          HREF="apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          HREF="apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          HREF="apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          HREF="apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          HREF="android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          HREF="favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          HREF="favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          HREF="favicon-16x16.png"
        />
        <link rel="manifest" HREF="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta
          name="description"
          content="Таинственный переулок, центр квестов и пряток в Челябинске. Квесты в реальности и прятки во тьме"
        />
      </Head>
      <AppContext.Provider value={dataObject}>
        <Layout>
        {/* <LazyLoadComponent> */}
          <Component {...pageProps} />
          {/* </LazyLoadComponent> */}
        </Layout>
      </AppContext.Provider>
      <ToastContainer />
    </SessionProvider>
  );
}

export default MyApp;
