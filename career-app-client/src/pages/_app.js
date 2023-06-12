import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps: { ...pageProps } }) {
  const getLayout = Component.getLayout || ((page) => page);
  const layout = getLayout(<Component {...pageProps} />);
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="" />
        </Head>
        {layout}
      </SessionProvider>
    </>
  );
}
