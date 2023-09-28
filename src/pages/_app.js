// pages/_app.js or pages/_app.tsx

import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;