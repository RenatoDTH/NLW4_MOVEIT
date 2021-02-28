import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { ChangeEvent, useContext, useState } from 'react';
import { AuthContext } from '../contexts';

import styles from '../styles/pages/Login.module.css';

const Login: React.FC = (props) => {
  const [userName, setUserName] = useState('');

  const { signIn } = useContext(AuthContext);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value.trim());
  };

  const handleSubmit = async () => {
    signIn(userName);
  };

  return (
    <>
      <Head>
        <title>LogIn | move.it</title>
      </Head>

      <div className={styles.container}>
        <div>
          <img src="/icons/rectangles.svg" alt="rectangles" />
        </div>

        <section className={styles.section}>
          <img src="/logo.svg" alt="move.it" />
          <strong>Bem-vindo</strong>
          <div>
            <img src="/icons/github.svg" alt="github" />

            <p>Faça login com seu Github para começar</p>
          </div>
          <div>
            <form>
              <input
                type="text"
                onChange={handleInputChange}
                placeholder="Digite seu username"
              />
              <button disabled={!userName} type="button" onClick={handleSubmit}>
                <img src="/icons/right-arrow.svg" alt="entrar" />
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { user } = ctx.req.cookies;
  if (user !== undefined) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
  return {
    props: {},
  };
};

export default Login;
