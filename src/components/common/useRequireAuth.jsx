/* eslint-disable react/prop-types */

const useRequireAuth = () => {
  const sessionId = localStorage.getItem('guest_session_id');
  return sessionId;
};

export default useRequireAuth;