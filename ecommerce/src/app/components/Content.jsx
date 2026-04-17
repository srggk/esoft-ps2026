import Listing from '../pages/Listing';
import Cart from '../pages/Cart';

function Content({ pageType, setPageType, cart, setCart }) {
  return (
    <>
      {pageType === 'tv' && <Listing key="tv" category="tv" cart={cart} setCart={setCart} />}
      {pageType === 'phone' && <Listing key="phone" category="phone" cart={cart} setCart={setCart} />}
      {pageType === 'laptop' && <Listing key="laptop" category="laptop" cart={cart} setCart={setCart} />}
      {pageType === 'cart' && <Cart cart={cart} setCart={setCart} pageType={pageType} setPageType={setPageType} />}
    </>
  );
}

export default Content;