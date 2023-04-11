import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '@hooks/useAuth';

export default function MainLayout({ children }) {
  const auth = useAuth();
  const router = useRouter();
  const [show, setShow] = useState(false);

  useEffect(() => {
    auth.loginValidation().then((res) => {
      if (router.pathname !== '/') {
        res == 'unauthorized' ? router.push('/login') : setShow(true);
      }
    });
  }, [auth, router]);

  return <>{show && <div className="max-w-7xl mx-auto py-6  px-5 sm:px-10 lg:px-30 ">{children}</div>}</>;
}
