import { useState, useEffect } from 'react';

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const isAuthenticated =  true;

    if (isAuthenticated) {
      setUser({
        isAdmin: true,
      });
    } else {
      setUser(null);
    }
  }, []);

  return { user };
};

export default useAuth;
