import { Formik } from 'formik';
import { TrashIcon, CloudUploadIcon } from '@heroicons/react/outline';

import { LinkData } from '@/types/data';
import { AddLinkForm } from '@/types/forms';
import { updateLink, deleteLink } from '@/utils/http';
import { useUserStore } from '@/hooks/useUserStore';
import { useRouter } from 'next/router';

interface Props {
  hash: string;
  data: LinkData;
}

export const LinkUpdateForm = ({ hash, data }: Props) => {
  const router = useRouter();
  const accessToken = useUserStore((state) => state.accessToken);
  const setToken = useUserStore((state) => state.setToken);

  const handleSubmit = (form: AddLinkForm) => {
    updateLink(accessToken, form, hash).then(async (res: Response) => {
      if (res.status === 200) {
        alert('URL Updated');
        if (form.hash) {
          router.push(`/link/${form.hash}`);
        }
      } else if (res.status === 401) setToken('');
      else alert('Unknown error');
    });
  };

  const handleDelete = () => {
    const confirmation = confirm(
      `Are you sure you want to delete the link "${hash}" ?`
    );
    if (!confirmation) return false;
    deleteLink(accessToken, hash).then(async (res: Response) => {
      if (res.status === 200) {
        alert('Link deleted. Redirecting you back to dashboard...');
        router.push('/dashboard');
      } else if (res.status === 401) {
        setToken('');
      } else {
        alert('Unknown error');
      }
    });
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md">
      <Formik
        initialValues={{ hash: hash, url: data.url }}
        onSubmit={handleSubmit}
      >
        {(props) => {
          const { values, handleSubmit, handleChange } = props;
          return (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-full max-w-md space-y-3"
            >
              <div className="flex flex-col space-y-1">
                <label htmlFor="hash">Short URL</label>
                <input
                  id="hash"
                  placeholder="vshn.in/url"
                  type="text"
                  value={values.hash}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label htmlFor="url">URL</label>
                <input
                  id="url"
                  placeholder="A long URL"
                  type="text"
                  value={values.url}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center w-full h-12 mt-8 bg-white border-2 border-gray-200 rounded-md text-orange-500 font-bold shadow-sm transition focus:outline-none focus:border-orange-500 hover:border-orange-200"
              >
                <CloudUploadIcon className="w-5 h-5 mr-2" />
                Update
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center justify-center w-full h-12 mt-8 bg-white border-2 border-gray-200 rounded-md text-red-500 font-bold shadow-sm transition focus:outline-none focus:border-red-500 hover:border-red-200"
              >
                <TrashIcon className="w-5 h-5 mr-2" />
                Delete
              </button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};
