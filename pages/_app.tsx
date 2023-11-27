import Head from 'next/head';
import 'tailwindcss/tailwind.css';
import tw, { useDeviceContext } from 'twrnc';

export default function App({ Component, pageProps }) {
  useDeviceContext(tw);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
