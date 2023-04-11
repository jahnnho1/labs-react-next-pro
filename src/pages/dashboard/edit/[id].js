import React, { useState, useEffect } from 'react';
import FormProduct from '@components/FormProduct';
import { useRouter } from 'next/router';
import endPoints from '@services/api';
import SecurityLayout from '@layout/SecurityLayout';

export default function Edit() {
  const [product, setProduct] = useState({});
  const router = useRouter();

  useEffect(() => {
    const { id } = router.query;
    if (!router.isReady || !id) return;
    async function getProduct() {
      const response = await fetch(endPoints.products.getProduct(id));
      const data = await response.json();
      setProduct(data);
    }
    getProduct();
  }, [router.isReady, router.query]);

  return (
    <SecurityLayout>
      <FormProduct product={product} />
    </SecurityLayout>
  );
}
