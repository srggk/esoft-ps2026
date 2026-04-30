import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from './ui-elements/Button';
import LoginModal from '../components/modals/LoginModal'

function Header({ pageType = 'tv', setPageType, cart = {} }) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const categories = [
    { id: "tv", label: "TV" },
    { id: "phone", label: "Phone" },
    { id: "laptop", label: "Laptop" }
  ];
  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-300">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between flex-wrap gap-4">
        <div className="flex flex-row gap-4">
          {/* Logo */}
          <button 
            onClick={() => setPageType('tv')}
            className="text-2xl font-medium text-gray-900 hover:text-gray-500 transition text-left"
          >
            TechStore
          </button>

          {/* Category Tabs */}
          {pageType !== 'cart' && (
            <nav className="hidden sm:flex gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setPageType(cat.id)}
                  className={`px-4 py-2 rounded-lg transition ${
                    pageType === cat.id
                      ? 'text-gray-900'
                      : 'text-gray-500 hover:text-gray-700 hover:underline'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </nav>
          )}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <Button
            onClick={() => setPageType('cart')}
            isIconOnly={true}
            variant="light"
            className="relative"
          >
            <FontAwesomeIcon icon="fa-solid fa-cart-shopping" className="text-gray-700 hover:text-gray-900 text-lg" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Button>

          <Button
            isIconOnly={true}
            variant="light"
            onClick={() => setIsLoginModalOpen(true)}
          >
            <FontAwesomeIcon icon="fa-solid fa-user" className="text-gray-700 hover:text-gray-900 text-lg" />
          </Button>
        </div>

        {/* Mobile Category Tabs */}
        {pageType !== 'cart' && (
          <div className="overflow-x-auto sm:hidden border-t border-gray-300 w-full">
            <div className="flex gap-2 min-w-max pt-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setPageType(cat.id)}
                  className={`px-4 py-2 text-center transition whitespace-nowrap w-1/3 ${
                    pageType === cat.id
                      ? 'text-gray-900 border-b-2 border-gray-900'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </header>
  );
}

export default Header;