import { useEffect, useState } from 'react';

import { useUserStore } from './useUserStore';
import { getLinkData } from '@/utils/http';
import { LinkStore } from '@/types/data';

export const useLink = (hash: string) => {
  const setToken = useUserStore((state) => state.setToken);
  const accessToken: string = useUserStore((state) => state.accessToken);
  const [linkData, setLinkData] = useState<LinkStore | null>({ loading: true });

  useEffect(() => {
    if (!hash) return;
    getLinkData(accessToken, hash).then(async (res: Response) => {
      if (res.status === 200) {
        const link = await res.json();
        setLinkData({ loading: false, data: link });
      } else if (res.status === 401) {
        setToken('');
      } else {
        setLinkData(null);
      }
    });
  }, [hash]);

  return { linkData };
};
