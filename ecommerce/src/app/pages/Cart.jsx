import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../components/ui-elements/Button';
import products from '../../data/products';
import QuantityControls from '../components/ui-elements/QuantityControls';

function Cart({ cart, setCart, setPageType }) {
  const cartItems = Object.entries(cart).map(([id, qty]) => {
    const product = products.find(p => p.id === Number(id));
    return product ? { ...product, quantity: qty } : null;
  }).filter(Boolean);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleIncrement = (productId) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const handleDecrement = (productId) => {
    if (cart[productId] === 1) {
      const newCart = { ...cart };
      delete newCart[productId];
      setCart(newCart);
    } else {
      setCart(prev => ({
        ...prev,
        [productId]: prev[productId] - 1
      }));
    }
  };

  const handleRemove = (productId) => {
    const newCart = { ...cart };
    delete newCart[productId];
    setCart(newCart);
  };

  if (cartItems.length === 0) {
    return (
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center py-28">
          <FontAwesomeIcon icon="fa-solid fa-cart-shopping" className="text-6xl text-gray-300 mb-4" />
          <h2 className="text-2xl font-medium text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add some products to get started!</p>
          <Button variant="dark" onClick={() => setPageType('tv')}>
            Continue Shopping
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <h1 className="text-2xl font-medium mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1">
          <div className="bg-white flex flex-col gap-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center gap-4 p-4 rounded-lg border border-gray-300">
                {/* Image Section */}
                <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={item.images[0]}
                    alt={item.model}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info Section */}
                <div className="flex flex-col w-full">

                  {/* Product Info & Remove */}
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-gray-500">{item.make}</p>
                      <h3 className="font-medium text-gray-900 truncate">{item.model}</h3>
                    </div>

                    <Button
                      onClick={() => handleRemove(item.id)}
                      isIconOnly={true}
                      variant="light"
                      size="sm"
                    >
                      <FontAwesomeIcon icon="fa-solid fa-trash" className="text-red-600 hover:text-red-700 text-sm" />
                    </Button>
                  </div>

                  {/* Controlls & Price */}
                  <div className="flex items-center justify-between">
                    <QuantityControls
                      onClickLeft={() => handleDecrement(item.id)}
                      onClickRight={() => handleIncrement(item.id)}
                      quantityText={item.quantity}
                      isSmallSize={true}
                    />

                    <p className="text-xl text-gray-900 text-right">
                      ${(item.price * item.quantity).toLocaleString('en-US')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-80">
          <div className="bg-white rounded-lg border border-gray-300 p-5 sticky top-24">
            <h2 className="text-lg font-medium mb-4">Order Summary</h2>
            
            <div className="space-y-3 border-b border-gray-300 pb-4 mb-4">
              <div className="flex justify-between items-baseline">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-gray-500">Tax (8%)</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-gray-500">Shipping</span>
                <span className="text-gray-400 text-sm">Calculated at checkout</span>
              </div>
            </div>

            <div className="flex justify-between mb-6">
              <span className="font-medium text-lg">Total</span>
              <span className="font-medium text-lg">${total.toFixed(2)}</span>
            </div>

            <div className="space-y-2">
              <Button variant="dark" isFullWeight={true}>
                Proceed to Checkout
              </Button>
              <Button variant="light_bordered" isFullWeight={true} onClick={() => setPageType('tv')}>
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Cart;