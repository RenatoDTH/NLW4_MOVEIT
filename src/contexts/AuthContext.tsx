import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

interface User {
  avatar_url: string;
  name: string;
  login: string;
}

interface AuthContextData {
  signIn: (userName: string) => void;
  userAuth: User;
}

interface AuthContextProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthContextProvider({ children }: AuthContextProps) {
  const router = useRouter();
  const [userAuth, setUserAuth] = useState<User>({} as User);
  useEffect(() => {
    async function loadUserCookie(): Promise<void> {
      const userCookie = Cookies.get('user');
      if (typeof userCookie !== 'undefined') {
        const userCookieParse = JSON.parse(userCookie) as User;
        const userParams = {
          avatar_url: userCookieParse.avatar_url ?? '',
          name: userCookieParse.name ?? '',
          login: userCookieParse.login ?? '',
        };
        setUserAuth(userParams);
      }
    }
    loadUserCookie();
  }, []);

  async function singIn(userName: string) {
    try {
      const response = await fetch(`https://api.github.com/users/${userName}`);
      const data = await response.json();
      if (data.message) {
        alert(
          `${
            data.message === 'Not Found'
              ? 'Seu usuário não foi encontrado'
              : data.message
          }`,
        );
        return;
      }
      const userData: User = {
        avatar_url: data.avatar_url,
        name: data.name,
        login: data.login,
      };
      Cookies.set('user', JSON.stringify(userData));
      router.push('/');
    } catch (err) {
      alert('Github não responde');
    }
  }

  return (
    <AuthContext.Provider
      value={{
        userAuth,
        signIn: singIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
