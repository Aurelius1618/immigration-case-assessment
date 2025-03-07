
import type { NextApiRequest } from 'next';

export const authenticateRequest = (req: NextApiRequest) => {

  const authHeader = req.headers.authorization;
  
 
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { authenticated: false };
  }
  
  
  const token = authHeader.split(' ')[1];
  

  return { 
    authenticated: true,
    user: { id: '1', name: 'Admin User' }
  };
};
