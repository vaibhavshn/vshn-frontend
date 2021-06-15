import { useUserStore } from '@/hooks/useUserStore';
import { getTotalStats } from '@/utils/http';
import { useState, useEffect } from 'react';

interface Stats {
  totalViews: number | string;
}

export const TotalStats = () => {
  const setToken = useUserStore((state) => state.setToken);
  const accessToken = useUserStore((state) => state.accessToken);
  const [data, setData] = useState<Stats | null>(null);

  useEffect(() => {
    getTotalStats(accessToken).then(async (res: Response) => {
      if (res.status === 200) {
        setData(await res.json());
      } else if (res.status === 401) {
        setToken('');
      } else {
        console.log('Error while fetching totalStats', await res.text());
      }
    });
  }, []);

  return (
    <div className="flex-1 flex flex-col py-4">
      <div className="text-center space-y-2">
        <div className="text-4xl font-bold tracking-tight">
          {data ? data.totalViews : '---'}
        </div>
        <div className="text-xs text-gray-500">TOTAL VIEWS</div>
      </div>
    </div>
  );
};
