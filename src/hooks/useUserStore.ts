import create from 'zustand';
import { persist } from 'zustand/middleware';

import { User } from '@/types/data';
import parseToken from '@/utils/parseToken';

interface UserStore {
  accessToken: string;
  user: User | null;
  setToken: (accessToken: string) => void;
}

export const useUserStore = create<UserStore>(
  persist(
    (set, get) => ({
      accessToken: '',
      user: null,
      setToken: (accessToken: string) => {
        if (accessToken === '') {
          set({ accessToken: '', user: null });
        } else {
          const user = parseToken(accessToken);
          set({ accessToken, user });
        }
      },
    }),
    {
      name: 'tokenStore',
    }
  )
);
