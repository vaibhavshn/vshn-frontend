import { User } from '@/types/data';
import { pick } from 'lodash';

const parseToken = (token: string): User | null => {
  if (token === '') return null;
  try {
    const data = token.split('.')[1];
    return pick(JSON.parse(atob(data)), ['id', 'name', 'email']);
  } catch (_) {}
  return null;
};

export default parseToken;
