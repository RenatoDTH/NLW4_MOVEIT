import '../styles/global.css';
import { GetServerSideProps } from 'next';
import { AuthContextProvider } from '../contexts';

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}

export default MyApp;
