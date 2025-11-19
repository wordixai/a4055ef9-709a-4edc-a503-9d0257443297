import { useState } from 'react';
import { X, ShoppingCart, Heart, Share2 } from 'lucide-react';
import PopButton from './PopButton';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size?: string, color?: string) => void;
}

const ProductModal = ({ product, isOpen, onClose, onAddToCart }: ProductModalProps) => {
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [selectedColor, setSelectedColor] = useState<string>('hsl(var(--primary))');

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-8 border-foreground shadow-[12px_12px_0_hsl(var(--primary)),_24px_24px_0_hsl(var(--secondary))] animate-bounce-pop">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-12 h-12 bg-destructive text-destructive-foreground border-4 border-foreground hover:scale-110 transition-transform flex items-center justify-center"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Dot Pattern Decoration */}
        <div className="absolute top-0 left-0 w-32 h-32 dots-pattern text-primary opacity-10 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 dots-pattern text-secondary opacity-10 pointer-events-none"></div>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Product Image */}
          <div className="relative border-b-8 md:border-b-0 md:border-r-8 border-foreground">
            <div className="aspect-square relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {/* Halftone Overlay */}
              <div className="absolute inset-0 halftone-bg opacity-20 pointer-events-none"></div>

              {/* Comic Starburst Badge */}
              <div className="absolute top-8 right-8">
                <div className="relative w-24 h-24 bg-accent border-4 border-foreground rotate-12 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full bg-accent border-4 border-foreground absolute rotate-45"></div>
                  </div>
                  <span className="relative z-10 text-2xl font-black handwritten text-accent-foreground">
                    HOT!
                  </span>
                </div>
              </div>

              {/* Category Badge */}
              <div className="absolute top-8 left-8 bg-secondary text-secondary-foreground px-6 py-3 border-4 border-foreground rotate-[-5deg]">
                <span className="text-lg font-black handwritten">{product.category}</span>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="p-8 md:p-12 relative">
            {/* Product Name */}
            <div className="mb-6">
              <h2 className="text-5xl md:text-6xl font-black handwritten text-foreground mb-2 comic-text">
                {product.name}
              </h2>
              <div className="flex items-center gap-3 mt-4">
                <span className="text-4xl animate-wiggle">⭐</span>
                <span className="text-4xl animate-wiggle" style={{ animationDelay: '0.1s' }}>⭐</span>
                <span className="text-4xl animate-wiggle" style={{ animationDelay: '0.2s' }}>⭐</span>
                <span className="text-4xl animate-wiggle" style={{ animationDelay: '0.3s' }}>⭐</span>
                <span className="text-4xl animate-wiggle" style={{ animationDelay: '0.4s' }}>⭐</span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-8 bg-primary text-primary-foreground p-6 border-4 border-foreground inline-block rotate-[-2deg]">
              <span className="text-5xl font-black handwritten">${product.price}</span>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-2xl font-black handwritten mb-4 text-foreground">Description:</h3>
              <p className="text-lg leading-relaxed text-muted-foreground font-semibold">
                This incredible piece combines retro vibes with modern street style!
                Made with premium materials and designed to turn heads. Limited edition -
                once it's gone, it's GONE! 💥
              </p>
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <h3 className="text-2xl font-black handwritten mb-4 text-foreground">Size:</h3>
              <div className="flex gap-3 flex-wrap">
                {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-16 h-16 border-4 border-foreground font-black text-xl handwritten hover:scale-110 transition-all hover:rotate-[-5deg] ${
                      selectedSize === size
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-card text-foreground hover:bg-accent hover:text-accent-foreground'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-8">
              <h3 className="text-2xl font-black handwritten mb-4 text-foreground">Color:</h3>
              <div className="flex gap-3">
                {[
                  { value: 'hsl(var(--primary))', label: 'Orange' },
                  { value: 'hsl(var(--secondary))', label: 'Pink' },
                  { value: 'hsl(var(--accent))', label: 'Yellow' },
                  { value: 'hsl(var(--muted))', label: 'Purple' },
                ].map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`w-14 h-14 border-4 border-foreground hover:scale-110 transition-transform ${
                      selectedColor === color.value ? 'ring-4 ring-foreground ring-offset-2' : ''
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.label}
                  ></button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <PopButton variant="primary" className="flex-1" onClick={handleAddToCart}>
                <span className="flex items-center justify-center gap-2">
                  <ShoppingCart className="w-6 h-6" />
                  ADD TO CART
                </span>
              </PopButton>

              <button className="p-4 bg-secondary border-4 border-foreground hover:scale-110 transition-transform">
                <Heart className="w-6 h-6 text-secondary-foreground" />
              </button>

              <button className="p-4 bg-accent border-4 border-foreground hover:scale-110 transition-transform">
                <Share2 className="w-6 h-6 text-accent-foreground" />
              </button>
            </div>

            {/* Comic Badge */}
            <div className="mt-8 bg-accent text-accent-foreground p-4 border-4 border-foreground rotate-[1deg]">
              <p className="text-center font-black handwritten text-lg">
                🔥 ONLY 5 LEFT IN STOCK! 🔥
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
