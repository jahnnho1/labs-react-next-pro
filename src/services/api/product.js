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

const deleteProduct = async (id) => {
  const config = {
    method: 'DELETE',
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  const response = await fetch(endPoints.products.deleteProducts(id), config);
  const data = await response.json();
  return data;
};

const updateProduct = async (id, body) => {
  const config = {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(endPoints.products.updateProducts(id), config);
  const data = await response.json();
  return data;
};

export { addProduct, deleteProduct, updateProduct };
