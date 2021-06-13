import { useEffect, useState } from 'react';
import parseToken from '@/utils/parseToken';
import { verifyToken } from '@/utils/http';

// null  - Not authenticatied
// false - Loading state
// string authentication token exists
const useAuth = () => {
  const [token, setToken] = useState<string | null | false>(false);
  const [user, setUser] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    const data: string | null = localStorage.getItem('accessToken');

    if (data && data.length > 0) {
      verifyToken(data)
        .then((res: Response) => {
          if (res.status === 200) {
            const userData = parseToken(data);
            setUser(userData);
            setToken(data);
            window.location.href = '/dashboard';
          } else {
            setToken(null);
          }
        })
        .catch((_) => {
          setToken(null);
        });
    } else {
      setToken(null);
    }
  }, []);

  const updateToken = (newValue: string | null) => {
    if (!newValue) {
      localStorage.removeItem('accessToken');
      setToken(null);
      return;
    }
    localStorage.setItem('accessToken', newValue);
    setToken(newValue);
  };

  return { token, updateToken, user };
};

export default useAuth;
