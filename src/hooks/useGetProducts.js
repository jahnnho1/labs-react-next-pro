import { useEffect, useState } from 'react';

const useGetProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);

  /*
  useEffect(async () => {
    const response = await fetch("https://api.escuelajs.co/api/v1/products?limit=20&offset=50");
    const data = await response.json();
    setProducts(data);
    console.log(data)
  }, []);

*/

  useEffect(() => {
    setLoading(true);
    fetch('https://api.escuelajs.co/api/v1/products?limit=20&offset=50')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  return { products, isLoading };
};

export default useGetProducts;
