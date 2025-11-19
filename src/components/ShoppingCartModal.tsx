import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import PopButton from './PopButton';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
  size?: string;
  color?: string;
}

interface ShoppingCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

const ShoppingCartModal = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
}: ShoppingCartModalProps) => {
  if (!isOpen) return null;

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-end p-0 md:p-4 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Cart Panel */}
      <div className="relative w-full md:w-[480px] h-[90vh] md:h-auto md:max-h-[90vh] bg-card border-8 border-foreground shadow-[12px_12px_0_hsl(var(--primary)),_24px_24px_0_hsl(var(--secondary))] flex flex-col animate-in slide-in-from-right md:slide-in-from-right duration-300">
        {/* Header */}
        <div className="bg-primary border-b-8 border-foreground p-6 relative overflow-hidden">
          <div className="absolute inset-0 dots-pattern text-secondary opacity-20"></div>

          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-accent border-4 border-foreground flex items-center justify-center rotate-12">
                <ShoppingBag className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-primary-foreground handwritten">
                  YOUR CART
                </h2>
                <p className="text-primary-foreground/80 font-bold">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-12 h-12 bg-destructive text-destructive-foreground border-4 border-foreground hover:scale-110 transition-transform flex items-center justify-center"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-8xl mb-4 animate-bounce-pop-infinite">🛒</div>
              <p className="text-2xl font-black handwritten text-muted-foreground mb-2">
                YOUR CART IS EMPTY!
              </p>
              <p className="text-muted-foreground font-semibold">
                Add some awesome items! 🎨
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-background border-4 border-foreground p-4 relative group"
                >
                  {/* Delete Button */}
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="absolute -top-3 -right-3 w-10 h-10 bg-destructive text-destructive-foreground border-4 border-foreground hover:scale-110 transition-transform flex items-center justify-center z-10 rotate-12"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>

                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-24 h-24 border-4 border-foreground overflow-hidden flex-shrink-0 relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 halftone-bg opacity-20"></div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-black handwritten text-foreground truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-muted-foreground font-bold mb-2">
                        {item.category}
                      </p>

                      {/* Size & Color */}
                      {(item.size || item.color) && (
                        <div className="flex gap-2 mb-2">
                          {item.size && (
                            <span className="px-2 py-1 bg-accent text-accent-foreground border-2 border-foreground text-xs font-bold">
                              {item.size}
                            </span>
                          )}
                          {item.color && (
                            <div
                              className="w-6 h-6 border-2 border-foreground"
                              style={{ backgroundColor: item.color }}
                            ></div>
                          )}
                        </div>
                      )}

                      {/* Price & Quantity */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-2xl font-black text-primary handwritten">
                          ${item.price}
                        </span>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                            }
                            className="w-8 h-8 bg-secondary text-secondary-foreground border-3 border-foreground hover:scale-110 transition-transform flex items-center justify-center font-black"
                          >
                            <Minus className="w-4 h-4" />
                          </button>

                          <span className="w-10 text-center font-black text-lg handwritten">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 bg-accent text-accent-foreground border-3 border-foreground hover:scale-110 transition-transform flex items-center justify-center font-black"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Total & Checkout */}
        {cartItems.length > 0 && (
          <div className="border-t-8 border-foreground bg-secondary p-6 relative overflow-hidden">
            <div className="absolute inset-0 halftone-bg opacity-20"></div>

            <div className="relative z-10 space-y-4">
              {/* Subtotal */}
              <div className="flex justify-between items-center">
                <span className="text-xl font-black handwritten text-secondary-foreground">
                  SUBTOTAL:
                </span>
                <span className="text-3xl font-black handwritten text-secondary-foreground">
                  ${total.toFixed(2)}
                </span>
              </div>

              {/* Shipping Notice */}
              <div className="bg-accent text-accent-foreground p-3 border-4 border-foreground rotate-[-1deg]">
                <p className="text-center font-bold text-sm">
                  {total >= 100
                    ? '🎉 FREE SHIPPING UNLOCKED! 🎉'
                    : `💸 Add $${(100 - total).toFixed(2)} more for FREE shipping!`}
                </p>
              </div>

              {/* Checkout Button */}
              <PopButton variant="primary" className="w-full text-xl">
                <span className="flex items-center justify-center gap-2">
                  CHECKOUT NOW! 🚀
                </span>
              </PopButton>

              <button
                onClick={onClose}
                className="w-full text-center text-secondary-foreground font-bold hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCartModal;
