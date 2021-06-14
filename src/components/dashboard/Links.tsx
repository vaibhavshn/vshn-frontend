import { useState } from 'react';
import { AnimateSharedLayout, motion } from 'framer-motion';
import {
  XIcon,
  PlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/outline';

import { LinkCreator } from './LinkCreator';
import { LinkCard, LinkData } from './LinkCard';

interface Links {
  links: LinkData[];
  hasNextPage: boolean;
  page: number;
  pages: number;
  total: number;
}

export const Links = () => {
  const [linkCreatorVisible, setLinkCreatorVisible] = useState<boolean>(false);
  const [data, setData] = useState<Links>({
    links: [
      {
        hash: 'updated',
        url: 'https://vaibhavshinde.com',
      },
      {
        hash: '5c0b74',
        url: 'https://example.com/',
      },
      {
        hash: 'be0de3',
        url: 'https://example.com/',
      },
    ],
    hasNextPage: false,
    page: 1,
    total: 3,
    pages: 1,
  });

  return (
    <div className="w-full max-w-sm mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <h5 className="text-md text-gray-700">Your links ({data.total})</h5>
        <button
          onClick={() => setLinkCreatorVisible(!linkCreatorVisible)}
          className="flex items-center px-3 py-1 gold-gradient text-orange-800 text-sm rounded-full focus:outline-none"
        >
          {linkCreatorVisible ? (
            <XIcon className="w-4 h-4 mr-1" aria-hidden="true" />
          ) : (
            <PlusIcon className="w-4 h-4 mr-1" aria-hidden="true" />
          )}

          {linkCreatorVisible ? 'Close' : 'New'}
        </button>
      </div>
      <AnimateSharedLayout>
        {linkCreatorVisible && (
          <motion.div
            layout
            initial={{ y: -80, opacity: 0.4 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <LinkCreator
              onAdd={(link: LinkData) => {
                const links: LinkData[] = [link, ...data.links];
                setData(Object.assign({}, data, { links }));
              }}
            />
          </motion.div>
        )}
        <motion.div
          layout
          initial={{ y: -80, opacity: 0.4 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="flex flex-col space-y-3 mt-4">
            {data.links.map((link) => (
              <LinkCard link={link} key={link.hash} />
            ))}
          </div>
          <div
            className={`flex items-center justify-between mt-6 text-sm ${
              data.page === 1 && !data.hasNextPage ? 'justify-center' : ''
            }`}
          >
            {data.page > 1 && (
              <button className="flex items-center px-4 py-2 bg-white text-orange-700 border border-gray-400 rounded-md">
                <ChevronLeftIcon
                  className="w-3 h-3 -ml-2 mr-2"
                  aria-hidden="true"
                />
                Prev
              </button>
            )}
            <span className="text-gray-600">
              Page {data.page} of {data.pages}
            </span>
            {data.hasNextPage && (
              <button className="flex items-center px-4 py-2 bg-white text-orange-700 border border-gray-400 rounded-md disabled:text-gray-600 disabled:bg-gray-100">
                Next
                <ChevronRightIcon
                  className="w-3 h-3 -mr-2 ml-2"
                  aria-hidden="true"
                />
              </button>
            )}
          </div>
        </motion.div>
      </AnimateSharedLayout>
    </div>
  );
};
