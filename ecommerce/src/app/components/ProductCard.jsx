import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from './ui-elements/Button';

function ProductCard({ product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  
  const hasMultipleImages = product.images && product.images.length > 1;
  const imageCount = product.images?.length || 0;

  const nextImage = (e) => {
    e.stopPropagation();
    if (hasMultipleImages) {
      setCurrentImageIndex((prev) => (prev + 1) % imageCount);
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (hasMultipleImages) {
      setCurrentImageIndex((prev) => (prev - 1 + imageCount) % imageCount);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const addToCart = () => {
    setCartCount(1);
  };

  const incrementCart = () => {
    setCartCount(prev => prev + 1);
  };

  const decrementCart = () => {
    if (cartCount === 1) {
      setCartCount(0);
    } else {
      setCartCount(prev => prev - 1);
    }
  };

  return (
        <div className="group relative bg-white rounded-lg border border-gray-300 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
            {/* Special Offer Badge */}
            {product.isSpecialOffer && (
                <div className="absolute top-3 left-3 z-10 bg-red-600 text-white text-xs px-2 py-1 rounded">
                    Special Offer
                </div>
            )}

            {/* Favorite Button */}
            <Button
                onClick={toggleFavorite}
                isIconOnly={true}
                variant={isFavorite ? "danger" : "white"}
                size="sm"
                className="absolute top-3 right-3 z-10"
            >
                <FontAwesomeIcon 
                    icon="fa-solid fa-heart" 
                    className={`transition ${
                        isFavorite ? 'text-white' : 'text-gray-500'
                    }`}
                />
            </Button>

        {/* Image Carousel */}
        <div className="relative aspect-square bg-gray-100 overflow-hidden group/carousel">
            <img
                src={product.images[currentImageIndex]}
                alt={product.model}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Navigation Arrows (on hover) */}
            {hasMultipleImages && (
            <>
                <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-200 text-white p-1 rounded-full opacity-0 group-hover/carousel:opacity-100 transition-opacity"
                    >
                        <FontAwesomeIcon icon="fa-solid fa-angle-left" className='text-gray-500 text-lg' />
                </button>
                <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-200 text-white p-1 rounded-full opacity-0 group-hover/carousel:opacity-100 transition-opacity"
                    >
                    <FontAwesomeIcon icon="fa-solid fa-angle-right" className='text-gray-500 text-lg' />
                </button>
            </>
            )}

            {/* Image Counter Indicator */}
            {/* {hasMultipleImages && (
            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                {currentImageIndex + 1} / {imageCount}
            </div>
            )} */}
            {hasMultipleImages && (
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {Array.from({ length: imageCount }).map((_, index) => (
                        <div
                            key={index}
                            className={`transition-all ${
                                currentImageIndex === index
                                    ? 'bg-gray-700 w-6 h-2 rounded-full'  // Чёрный овал
                                    : 'bg-white w-2 h-2 rounded-full'  // Белый круг
                                }`
                            }
                        />
                    ))}
                </div>
            )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
            {/* Brand */}
            <p className="text-sm text-gray-500 mb-1">{product.make}</p>
            
            {/* Model */}
            <h3 className="font-medium text-xl text-gray-900 line-clamp-2 mb-2 min-h-[3rem]">
                {product.model}
            </h3>
            
            {/* Price */}
            <p className="text-xl text-gray-700 mb-4">
                ${product.price.toLocaleString('en-US')}
            </p>

            {/* Button (Cart / Counter) */}
            <div className="flex items-center gap-3 mt-auto">
                {cartCount === 0 ? (
                    <Button onClick={addToCart} isFullWeight={true} variant="dark">
                        Add to Cart
                    </Button>
                ) : (
                    <div className="flex-1 flex items-center justify-between">
                        <Button onClick={decrementCart} isIconOnly={true}>
                            <FontAwesomeIcon icon="fa-solid fa-minus" className='text-gray-700 text-lg' />
                        </Button>

                        <span className="text-sm font-medium">{cartCount} in cart</span>

                        <Button onClick={incrementCart} isIconOnly={true} variant="dark">
                            <FontAwesomeIcon icon="fa-solid fa-plus" className='text-white text-lg' />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
}

export default ProductCard;