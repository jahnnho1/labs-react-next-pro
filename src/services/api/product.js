import endPoints from '@services/api';

const addProduct = async (body) => {
  const config = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(endPoints.products.addProducts, config);
  const data = await response.json();
  return data;
};

export { addProduct };
