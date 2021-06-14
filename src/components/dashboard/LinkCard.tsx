import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/outline';

export interface LinkData {
  hash: string;
  url: string;
}

interface Props {
  link: LinkData;
}

export const LinkCard = ({ link }: Props) => {
  return (
    <Link href={`/link/${link.hash}`}>
      <button className="flex items-center justify-between p-4 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-lg transition text-gray-500 hover:text-gray-800 hover:shadow-lg focus:outline-none focus:ring-2 ring-orange-400">
        <div className="flex-1 flex flex-col items-start w-full space-y-1">
          <div className="text-black truncate max-w-[320px]">
            vshn.in/{link.hash}
          </div>
          <div className="font-light text-xs text-gray-600 truncate max-w-[320px]">
            {link.url}
          </div>
        </div>
        <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
      </button>
    </Link>
  );
};
