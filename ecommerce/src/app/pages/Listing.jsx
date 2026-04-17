import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import products from '../../data/products';
import Sidebar from '../components/Sidebar';
import Dropdown from '../components/ui-elements/Dropdown';

function Listing({ category, cart, setCart }) {
  const categoryProducts = products.filter(product => product.category === category);
  const brands = [...new Set(categoryProducts.map(product => product.brand))].sort();
  const brandsWithAll = ['All Brands', ...brands];

  const [filters, setFilters] = useState({
    brand: 'All Brands',
    minPrice: '',
    maxPrice: 5000
  });
  const [appliedFilters, setAppliedFilters] = useState({
    brand: 'All Brands',
    minPrice: '',
    maxPrice: 5000
  });
  const [sort, setSort] = useState('price-asc');

  const sortOptions = [
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' }
  ];

  const handleApplyFilters = () => {
    setAppliedFilters({ ...filters });
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const filteredProducts = categoryProducts.filter(product => {
    if (appliedFilters.brand !== 'All Brands' && product.brand !== appliedFilters.brand) {
      return false;
    }
    if (appliedFilters.minPrice && product.price < Number(appliedFilters.minPrice)) {
      return false;
    }
    if (appliedFilters.maxPrice && product.price > Number(appliedFilters.maxPrice)) {
      return false;
    }
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === 'price-asc') {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <Sidebar
          brands={brandsWithAll}
          filters={filters}
          setFilters={setFilters}
          onApply={handleApplyFilters}
        />

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <p className="font-light text-gray-500">{sortedProducts.length} products</p>
            <div className="flex items-center gap-2">
              <span className="text-gray-900 text-sm">Sort by:</span>
              <Dropdown
                options={sortOptions}
                value={sort}
                onChange={handleSortChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                cart={cart}
                setCart={setCart}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Listing;