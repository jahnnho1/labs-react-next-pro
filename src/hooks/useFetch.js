import { useEffect, useState } from 'react';

const useFetch = (endpoint) => {
  const [products, setProducts] = useState([]);
  //const [isLoading, setLoading] = useState(false);

  // async function fetchData() {
  const fetchData = async () => {
    const response = await fetch(endpoint);
    const data = await response.json();
    setProducts(data);
    //setLoading(false);
    return data;
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return products;
};
export default useFetch;
