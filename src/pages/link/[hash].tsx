import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useLink } from '@/hooks/useLink';
import { useUserStore } from '@/hooks/useUserStore';

import { Header } from '@/components/dashboard/Header';
import { LinkUpdateForm } from '@/components/dashboard/LinkUpdateForm';
import { MyPieChart } from '@/components/MyPieChart';
import { API_HOST } from '@/utils/http';

const LinkViewer = () => {
  const router = useRouter();
  const hash: string =
    typeof router.query.hash === 'string' ? router.query.hash : '';

  const user = useUserStore((state) => state.user);

  const { linkData } = useLink(hash);

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user]);

  if (!linkData) {
    return (
      <div className="flex flex-col items-center my-24 space-y-4">
        <h1 className="text-6xl font-black">404!</h1>
        <div className="text-lg text-gray-700">Not Found</div>
      </div>
    );
  }

  console.log(linkData);

  if (
    !hash ||
    linkData.loading === true ||
    !linkData.data ||
    !('browsers' in linkData.data) ||
    !('os' in linkData.data)
  ) {
    return <div>Loading...</div>;
  }

  const browsers = Object.entries(linkData.data.browsers).map(
    ([browser, count]) => {
      return {
        name: browser,
        value: count,
      };
    }
  );
  const os = Object.entries(linkData.data.os).map(([os, count]) => {
    return {
      name: os,
      value: count,
    };
  });

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <Header />
      <div className="flex flex-col space-y-6 md:space-y-6 md:flex-row items-center md:items-start mt-8 mb-12">
        <div className="flex-1 flex flex-col items-center lg:items-start w-full">
          <a
            target="_blank"
            href={`${API_HOST}/${hash}`}
            className="px-6 py-2 my-6 bg-orange-100 text-orange-600 font-medium rounded-md"
          >
            {API_HOST}/{hash}
          </a>
          <LinkUpdateForm hash={hash} data={linkData.data} />
        </div>
        <div className="flex flex-col w-full max-w-sm space-y-4">
          <div className="flex flex-col items-center space-y-2">
            <div className="text-4xl font-bold text-gray-700">
              {linkData.data.totalViews}
            </div>
            <div className="text-sm text-gray-500">Total Views</div>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="text-4xl font-bold text-gray-700">
              {linkData.data.uniqueViews}
            </div>
            <div className="text-sm text-gray-500">Unique Views</div>
          </div>
          {Object.keys(browsers).length > 0 && (
            <MyPieChart data={browsers} label="Browsers" />
          )}
          {Object.keys(os).length > 0 && <MyPieChart data={os} label="OS" />}
        </div>
      </div>
    </div>
  );
};

export default LinkViewer;
