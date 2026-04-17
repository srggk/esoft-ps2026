import { useState, useEffect } from 'react';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import { loadCart, saveCart } from '../../data/cartStorage';

function Container() {
  const [pageType, setPageType] = useState('tv');
  const [cart, setCart] = useState(() => loadCart());

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  return (
    <>
      <Header
        pageType={pageType}
        setPageType={setPageType}
        cart={cart}
      />
      <Content
        pageType={pageType}
        setPageType={setPageType}
        cart={cart}
        setCart={setCart}
      />
      <Footer />
    </>
  );
}

export default Container;