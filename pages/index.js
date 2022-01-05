import Head from 'next/head';
import Link from 'next/link';
import { signIn, signOut, useSession, getSession } from 'next-auth/react';


export default function Home() {
  const { data: session, status } = useSession();
  return (
    <>
      <Head>
        
      </Head>
        {!(status === "authenticated") && (
          <>
            Not signed in <br />
            <button>
            <Link href="/login">Sign in</Link>
            </button>
          </>
        )}
        {(status === "authenticated") && (
          <>
            Signed in as {session.user.email} <br />
            <div>You can now access our super secret pages</div>
            <button onClick={signOut}>sign out</button>
          </>
        )}
    </>
  );
}


