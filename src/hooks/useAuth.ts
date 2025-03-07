
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';


interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

interface Credentials {
  username: string;
  password: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
   
    const checkAuth = async () => {
      try {
        
        const token = localStorage.getItem('authToken');
        if (token) {
         
          setUser({ id: '1', name: 'Admin User', email: 'admin@example.com', token });
        }
      } catch (error) {
        console.error('Authentication error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials: Credentials) => {
    
    if (credentials.username === 'admin' && credentials.password === 'password') {
      const mockToken = 'mock-jwt-token';
      localStorage.setItem('authToken', mockToken);
      setUser({ id: '1', name: 'Admin User', email: 'admin@example.com', token: mockToken });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    router.push('/admin/login');
  };

  return { user, loading, login, logout };
};
