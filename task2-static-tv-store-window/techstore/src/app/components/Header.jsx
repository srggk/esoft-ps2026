import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Header({ selectedCategory = "tv" }) {
  const categories = [
    { id: "tv", label: "TV" },
    { id: "phone", label: "Phone" },
    { id: "laptop", label: "Laptop" }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-300">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between flex-wrap gap-4">
        <div className="flex flex-row gap-4">
          {/* Logo */}
          <a href="/tv" className="text-2xl font-medium text-gray-900 hover:text-gray-500 transition">
            TechStore
          </a>

          {/* Category Tabs */}
          <nav className="hidden sm:flex gap-2">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`/${cat.id}`}
                className={`px-4 py-2 rounded-lg transition ${
                  selectedCategory === cat.id
                    ? 'text-gray-900'
                    : 'text-gray-500 hover:text-gray-700 hover:underline'
                }`}
              >
                {cat.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition">
            <FontAwesomeIcon icon="fa-solid fa-cart-shopping" className='text-gray-700 text-lg' />
            {/* <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              0
            </span> */}
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition">
            <FontAwesomeIcon icon="fa-solid fa-user" className='text-gray-700 text-lg' />
          </button>
        </div>

        {/* Mobile Category Tabs */}
        <div className="overflow-x-auto sm:hidden border-t border-gray-300 w-full">
          <div className="flex gap-2 min-w-max pt-2">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`/${cat.id}`}
                className={`px-4 py-2 text-center transition whitespace-nowrap w-1/3 ${
                  selectedCategory === cat.id
                    ? 'text-gray-900 border-b-2 border-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {cat.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;