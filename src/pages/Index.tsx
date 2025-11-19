import { ShoppingBag, Zap, Star } from 'lucide-react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import PopButton from '../components/PopButton';

const Index = () => {
  const products = [
    {
      id: 1,
      name: 'Retro Tee',
      price: 45,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop',
      category: 'TOPS'
    },
    {
      id: 2,
      name: 'Pop Jacket',
      price: 120,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop',
      category: 'JACKETS'
    },
    {
      id: 3,
      name: 'Art Sneakers',
      price: 85,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop',
      category: 'SHOES'
    },
    {
      id: 4,
      name: 'Comic Hoodie',
      price: 65,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop',
      category: 'HOODIES'
    },
    {
      id: 5,
      name: 'Neon Cap',
      price: 35,
      image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=600&fit=crop',
      category: 'HATS'
    },
    {
      id: 6,
      name: 'Bold Pants',
      price: 75,
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=600&fit=crop',
      category: 'PANTS'
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-accent py-20 md:py-32 border-b-8 border-foreground">
        {/* Animated dot pattern */}
        <div className="absolute inset-0 dots-pattern text-foreground opacity-10 animate-pulse"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Comic-style burst decoration */}
            <div className="inline-block mb-6 relative">
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-accent border-4 border-foreground rotate-12 flex items-center justify-center animate-bounce-pop-infinite">
                <Zap className="w-8 h-8 text-accent-foreground" />
              </div>
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-secondary border-4 border-foreground rotate-[-12deg] flex items-center justify-center animate-bounce-pop-infinite" style={{ animationDelay: '0.3s' }}>
                <Star className="w-8 h-8 text-secondary-foreground" />
              </div>

              <h2 className="text-6xl md:text-8xl font-black text-card comic-text handwritten px-12">
                WOW!
              </h2>
            </div>

            <p className="text-2xl md:text-4xl font-black text-card mb-8 handwritten leading-relaxed">
              YOUR STYLE, BUT MAKE IT <span className="bg-accent text-accent-foreground px-4 py-2 border-4 border-foreground inline-block rotate-[-2deg]">POP!</span>
            </p>

            <p className="text-lg md:text-xl text-card/90 mb-12 max-w-2xl mx-auto font-semibold">
              Discover bold designs & vibrant fashion that screams personality! Limited edition drops every week!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <PopButton variant="accent" className="group">
                <span className="flex items-center gap-2">
                  <ShoppingBag className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  SHOP NOW
                </span>
              </PopButton>

              <PopButton variant="secondary">
                NEW ARRIVALS ⚡
              </PopButton>
            </div>
          </div>
        </div>

        {/* Decorative comic elements */}
        <div className="absolute bottom-10 left-10 text-6xl animate-wiggle opacity-50">
          💥
        </div>
        <div className="absolute top-20 right-20 text-6xl animate-bounce-pop-infinite opacity-50" style={{ animationDelay: '0.5s' }}>
          ⭐
        </div>
      </section>

      {/* Featured Banner */}
      <section className="bg-accent border-b-8 border-foreground relative overflow-hidden">
        <div className="absolute inset-0 halftone-bg opacity-30"></div>
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-5xl animate-bounce-pop-infinite">🎨</span>
              <p className="text-xl md:text-2xl font-black text-accent-foreground handwritten">
                FREE SHIPPING ON ORDERS OVER $100!
              </p>
            </div>
            <div className="flex gap-2">
              <div className="w-12 h-12 bg-primary border-4 border-foreground rotate-12"></div>
              <div className="w-12 h-12 bg-secondary border-4 border-foreground rotate-[-8deg]"></div>
              <div className="w-12 h-12 bg-accent border-4 border-foreground rotate-[15deg]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Background with color blocks */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background"></div>

        {/* Large decorative dots */}
        <div className="absolute top-20 left-10 w-40 h-40 dots-pattern text-primary opacity-10"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 dots-pattern text-secondary opacity-10"></div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block bg-primary text-primary-foreground px-8 py-3 border-4 border-foreground rotate-[-1deg] mb-6">
              <h2 className="text-4xl md:text-6xl font-black handwritten">
                TRENDING NOW
              </h2>
            </div>
            <p className="text-xl text-muted-foreground font-bold">
              Hot picks that everyone's talking about! 🔥
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-12">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center">
            <PopButton variant="primary" className="text-2xl">
              LOAD MORE AWESOME STUFF! 🚀
            </PopButton>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-secondary border-t-8 border-b-8 border-foreground py-16 relative overflow-hidden">
        <div className="absolute inset-0 dots-pattern text-primary opacity-10"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-4xl md:text-5xl font-black text-secondary-foreground mb-4 comic-text handwritten">
              JOIN THE POP SQUAD!
            </h3>
            <p className="text-lg text-secondary-foreground/90 mb-8 font-semibold">
              Get exclusive drops, secret sales & rad style tips! 💌
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-6 py-4 border-4 border-foreground handwritten text-lg focus:outline-none focus:ring-4 focus:ring-accent"
              />
              <PopButton variant="accent">
                SIGN UP! ✨
              </PopButton>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 relative overflow-hidden">
        <div className="absolute inset-0 halftone-bg opacity-10"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-2xl font-black mb-4 handwritten text-primary">SHOP</h4>
              <ul className="space-y-2 font-semibold">
                <li><a href="#" className="hover:text-accent transition-colors">New Arrivals</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Best Sellers</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Sale</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-2xl font-black mb-4 handwritten text-secondary">HELP</h4>
              <ul className="space-y-2 font-semibold">
                <li><a href="#" className="hover:text-accent transition-colors">Shipping</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-2xl font-black mb-4 handwritten text-accent">FOLLOW</h4>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary border-4 border-background flex items-center justify-center font-black hover:scale-110 transition-transform cursor-pointer">
                  IG
                </div>
                <div className="w-12 h-12 bg-secondary border-4 border-background flex items-center justify-center font-black hover:scale-110 transition-transform cursor-pointer">
                  TW
                </div>
                <div className="w-12 h-12 bg-accent border-4 border-background flex items-center justify-center font-black hover:scale-110 transition-transform cursor-pointer">
                  FB
                </div>
              </div>
            </div>
          </div>

          <div className="text-center pt-8 border-t-4 border-background/20">
            <p className="font-bold">© 2024 POP SHOP. All rights reserved. Made with 💖 & 🎨</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
