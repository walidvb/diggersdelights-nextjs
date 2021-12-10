import 'tailwindcss/tailwind.css'
import tw, { useDeviceContext } from 'twrnc';


function MyApp({ Component, pageProps }) {
  useDeviceContext(tw)
  return <Component {...pageProps} />
}

export default MyApp