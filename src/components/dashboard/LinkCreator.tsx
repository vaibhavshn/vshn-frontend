import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { Switch } from '@headlessui/react';
import { PlusIcon } from '@heroicons/react/outline';

import useForm from '@/hooks/form';
import TextField from '../TextField';

import { AddLinkForm } from '@/types/forms';
import { addLink } from '@/utils/http';
import { useUserStore } from '@/hooks/useUserStore';
import { LinkData } from './LinkCard';

interface Props {
  onAdd: (form: LinkData) => void;
}

export const LinkCreator = ({ onAdd }: Props) => {
  const accessToken: string = useUserStore((state) => state.accessToken);
  const setToken = useUserStore((state) => state.setToken);
  const { form, formChange, clearForm } = useForm<AddLinkForm>({
    hash: '',
    url: '',
  });
  const [isCustomHash, setIsCustomHash] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent) => {
    console.log('submitting');
    if (e) e.preventDefault();

    let _form: AddLinkForm;
    if (isCustomHash) {
      _form = form;
    } else {
      _form = {
        url: form.url,
      };
    }

    addLink(accessToken, _form).then(async (res: Response) => {
      if (res.status === 200) {
        const hash = await res.text();
        onAdd({ hash, url: form.url });
        clearForm();
        alert(`Link added: ${hash}`);
      } else if (res.status === 401) {
        setToken('');
      } else if (res.status === 409) {
        alert('The link you entered is already taken.');
      } else {
        console.log(res.status, await res.text());
        alert('Unknown error, see console for error message');
      }
    });

    return false;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col p-4 border-2 border-orange-200 rounded-md space-y-3"
    >
      <motion.div layout>
        <label
          htmlFor="useCustomHash"
          className="flex items-center justify-between text-sm"
        >
          Use Custom URL
          <input
            type="checkbox"
            name="useCustomHash"
            id="useCustomHash"
            className="w-5 h-5 text-orange-600 focus:ring-orange-500"
            checked={isCustomHash}
            onChange={(e) => setIsCustomHash(e.target.checked)}
          />
        </label>
        {/* <Switch.Group>
          <div className="flex items-center justify-between text-sm">
            <Switch.Label className="mr-4">Use Custom URL</Switch.Label>
            <Switch
              checked={isCustomHash}
              onChange={setIsCustomHash}
              className={`${isCustomHash ? 'bg-orange-300' : 'bg-gray-200'}
          relative inline-flex flex-shrink-0 h-[24px] w-[48px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className={`${
                  isCustomHash ? 'translate-x-[24px]' : 'translate-x-[2px]'
                }
            pointer-events-none inline-block h-[20px] w-[20px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
              />
            </Switch>
          </div>
        </Switch.Group> */}
      </motion.div>
      {isCustomHash && (
        <motion.div
          layout
          initial={{ y: -80, opacity: 0.4 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="flex flex-col space-y-1">
            <label htmlFor="hash" className="text-gray-500 text-sm">
              Short URL
            </label>
            <div className="flex items-center rounded-md overflow-hidden bg-gray-100 border-2 border-gray-100">
              <div className="pl-2 pr-2 text-orange-700">vshn.in/</div>
              <input
                id="hash"
                name="hash"
                type="text"
                placeholder="random"
                className="flex-1 h-10 bg-white border-0 transition focus:ring-0 focus:border-gray-600 focus:ring-gray-600"
                value={form.hash}
                onChange={formChange}
              />
            </div>
          </div>
        </motion.div>
      )}
      <motion.div layout>
        <TextField
          name="url"
          label="URL"
          placeholder="Your long URL"
          value={form.url}
          onChange={formChange}
        />
      </motion.div>
      <motion.div layout className="flex w-full">
        <button className="flex items-center justify-center w-full h-12 space-x-2 bg-white border-2 border-gray-200 rounded-md text-orange-500 font-bold shadow-sm transition focus:outline-none focus:border-orange-500 hover:border-orange-200">
          <PlusIcon className="w-4 h-4" />
          <span>Add</span>
        </button>
      </motion.div>
    </form>
  );
};
