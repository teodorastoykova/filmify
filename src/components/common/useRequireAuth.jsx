/* eslint-disable react/prop-types */

const useRequireAuth = () => {
  const sessionId = localStorage.getItem('sessionId');
  return sessionId;
};

export default useRequireAuth;