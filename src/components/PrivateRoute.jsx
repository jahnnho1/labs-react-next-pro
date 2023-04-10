import { useRouter } from 'next/router';
import { useEffect } from 'react';

const PrivateRoute = ({ Component, auth, isPrivate }) => {
  const router = useRouter();

  useEffect(() => {
    if (isPrivate && !auth) {
      router.push('/dashboard/products');
    } else if (auth && auth.role !== 'admin') {
      router.push('/');
    }
  }, [auth, isPrivate, router]);

  return <Component />;
};

export default PrivateRoute;
