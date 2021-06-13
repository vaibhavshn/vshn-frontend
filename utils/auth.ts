export const logOut = () => {
  localStorage.removeItem('accessToken');
  window.location.href = '/';
};
