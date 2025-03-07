// pages/admin/index.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import LeadsList from '../../components/admin/LeadsList';
import { useAuth } from '../../hooks/useAuth';

const AdminPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);
  
  if (loading) return <div>Loading...</div>;
  if (!user) return null;
  
  return <LeadsList />;
};

export default AdminPage;
