const parseToken = (token: string): Record<string, any> | null => {
  try {
    const data = token.split('.')[1];
    return JSON.parse(atob(data));
  } catch (_) {}
  return null;
};

export default parseToken;
