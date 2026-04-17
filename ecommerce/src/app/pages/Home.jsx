import ProductCard from '../components/ProductCard';
import products from '../../data/products';
import Sidebar from '../components/Sidebar';
import Dropdown from '../components/ui-elements/Dropdown';

function Home() {
  const tvProducts = products.filter(product => product.category === 'tv');
  const tvBrands = [...new Set(tvProducts.map(product => product.brand))].sort();
  const tvBrandsWithAll = ['All', ...tvBrands || []];
  const sortOptions = [
    { value: 'default', label: 'Default' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
        <main className="flex-grow container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                <Sidebar brands={tvBrandsWithAll} />

                {/* Product Grid */}
                <div className="flex-1">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <p className="font-light text-gray-500">{tvProducts?.length} products</p>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-900 text-sm">Sort by:</span>
                            <Dropdown
                                options={sortOptions}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {tvProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    </div>
  );
}

export default Home;
