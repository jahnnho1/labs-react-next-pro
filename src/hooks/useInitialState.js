import { useState } from 'react';

const initialState = () => ({
  cart: [],
});

const useInitialState = () => {
  const [state, setState] = useState(initialState());
  const [activeMenu, setActiveMenu] = useState('');
  const addToCart = (payload) => {
    const existingProduct = state.cart.find((item) => item.id === payload.id);
    if (existingProduct) {
      setState({
        ...state,
        cart: state.cart.map((item) => (item.id === payload.id ? { ...item, quantity: item.quantity + 1, price: payload.price * (item.quantity + 1) } : item)),
      });
    } else {
      const newProduct = {
        id: payload.id,
        title: payload.title,
        quantity: 1,
        price: payload.price,
        images: payload.images,
      };
      setState({ ...state, cart: [...state.cart, newProduct] });
    }
  };

  const removeFromCart = (payload) => {
    setState({
      ...state,
      cart: state.cart.filter((item) => item.id !== payload.id),
    });
  };

  return {
    state,
    addToCart,
    removeFromCart,
    activeMenu,
    setActiveMenu,
  };
};

export default useInitialState;
