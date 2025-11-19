import { ShoppingCart, Menu, Sparkles } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

const Header = ({ cartCount, onCartClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 border-b-8 border-foreground">
      {/* Orange background section */}
      <div className="bg-primary relative overflow-hidden">
        {/* Dot pattern overlay */}
        <div className="absolute inset-0 dots-pattern text-secondary opacity-20"></div>

        <div className="container mx-auto px-4 py-6 relative z-10">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-accent border-4 border-foreground rotate-12 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-accent-foreground" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-primary-foreground comic-text handwritten">
                POP SHOP
              </h1>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-primary-foreground font-bold text-lg hover:scale-110 transition-transform handwritten">
                NEW IN
              </a>
              <a href="#" className="text-primary-foreground font-bold text-lg hover:scale-110 transition-transform handwritten">
                TRENDING
              </a>
              <a href="#" className="text-primary-foreground font-bold text-lg hover:scale-110 transition-transform handwritten">
                SALE
              </a>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={onCartClick}
                className="relative p-3 bg-secondary border-4 border-foreground hover:scale-110 transition-transform"
              >
                <ShoppingCart className="w-6 h-6 text-secondary-foreground" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-6 h-6 px-1 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xs font-bold border-2 border-foreground animate-bounce-pop">
                    {cartCount}
                  </span>
                )}
              </button>

              <button className="md:hidden p-3 bg-accent border-4 border-foreground">
                <Menu className="w-6 h-6 text-accent-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pink accent strip */}
      <div className="bg-secondary h-3 relative overflow-hidden">
        <div className="absolute inset-0 halftone-bg"></div>
      </div>
    </header>
  );
};

export default Header;
