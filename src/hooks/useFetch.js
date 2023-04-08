import { useEffect, useState, useCallback } from 'react';

const useFetch = (endpoint) => {
  const [products, setProducts] = useState([]);

  const fetchData = useCallback(async () => {
    const response = await fetch(endpoint);
    const data = await response.json();
    setProducts(data);
  }, [endpoint]);

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [fetchData]);
  return products;
};

export default useFetch;
