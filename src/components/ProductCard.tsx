import { useState } from 'react';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  onClick?: () => void;
}

const ProductCard = ({ name, price, image, category, onClick }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Pop Frame Container */}
      <div className={`pop-frame bg-card overflow-hidden transition-all duration-300 ${isHovered ? 'scale-105' : ''}`}>
        {/* Image with Halftone Effect */}
        <div className="relative overflow-hidden aspect-square">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500"
            style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
          />
          {/* Halftone Overlay */}
          <div className="absolute inset-0 halftone-bg pointer-events-none opacity-30"></div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-4 py-2 font-bold border-4 border-foreground rotate-[-5deg] handwritten">
            {category}
          </div>

          {/* Comic-style "BANG" badge */}
          <div className="absolute top-4 right-4 bg-secondary text-secondary-foreground px-3 py-1 border-3 border-foreground rotate-[8deg] text-xs font-bold">
            NEW!
          </div>
        </div>

        {/* Product Info */}
        <div className="p-6 bg-card relative">
          {/* Dots decoration */}
          <div className="absolute top-0 left-0 w-20 h-20 dots-pattern text-primary opacity-20 pointer-events-none"></div>

          <h3 className="text-2xl font-black mb-2 text-foreground handwritten relative z-10">
            {name}
          </h3>

          <div className="flex items-center justify-between relative z-10">
            <span className="text-3xl font-black text-primary handwritten">
              ${price}
            </span>

            {/* Star decoration */}
            <div className="text-accent text-4xl animate-wiggle">★</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
