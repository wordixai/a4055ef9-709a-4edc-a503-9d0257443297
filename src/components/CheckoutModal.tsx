import { useState } from 'react';
import { X, MapPin, CreditCard, Package } from 'lucide-react';
import PopButton from './PopButton';
import { CartItem } from './ShoppingCartModal';
import { Address } from './AddressModal';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  selectedAddress: Address | null;
  onSelectAddress: () => void;
  onConfirmOrder: () => void;
}

const CheckoutModal = ({
  isOpen,
  onClose,
  cartItems,
  selectedAddress,
  onSelectAddress,
  onConfirmOrder,
}: CheckoutModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 100 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-8 border-foreground shadow-[12px_12px_0_hsl(var(--primary)),_24px_24px_0_hsl(var(--secondary))] animate-bounce-pop">
        {/* Header */}
        <div className="sticky top-0 bg-primary border-b-8 border-foreground p-6 relative overflow-hidden z-10">
          <div className="absolute inset-0 dots-pattern text-secondary opacity-20"></div>

          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-accent border-4 border-foreground flex items-center justify-center rotate-12">
                <Package className="w-6 h-6 text-accent-foreground" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-primary-foreground handwritten">
                CHECKOUT
              </h2>
            </div>

            <button
              onClick={onClose}
              className="w-12 h-12 bg-destructive text-destructive-foreground border-4 border-foreground hover:scale-110 transition-transform flex items-center justify-center"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Details */}
            <div className="space-y-6">
              {/* Delivery Address */}
              <div className="border-4 border-foreground bg-background p-6 relative">
                <div className="absolute top-0 left-0 w-20 h-20 dots-pattern text-primary opacity-10"></div>

                <div className="flex items-start justify-between mb-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-black handwritten">DELIVERY ADDRESS</h3>
                  </div>
                  <button
                    onClick={onSelectAddress}
                    className="px-4 py-2 bg-secondary border-3 border-foreground font-bold hover:scale-105 transition-transform"
                  >
                    CHANGE
                  </button>
                </div>

                {selectedAddress ? (
                  <div className="relative z-10">
                    <p className="font-black text-lg mb-1">{selectedAddress.name}</p>
                    <p className="text-muted-foreground font-semibold mb-1">
                      {selectedAddress.phone}
                    </p>
                    <p className="text-foreground font-semibold">
                      {selectedAddress.street}
                    </p>
                    <p className="text-foreground font-semibold">
                      {selectedAddress.city}, {selectedAddress.state} {selectedAddress.zipCode}
                    </p>
                    <p className="text-foreground font-semibold">{selectedAddress.country}</p>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground font-bold">No address selected</p>
                    <button
                      onClick={onSelectAddress}
                      className="mt-2 text-primary font-black handwritten underline"
                    >
                      SELECT AN ADDRESS
                    </button>
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div className="border-4 border-foreground bg-background p-6 relative">
                <div className="absolute bottom-0 right-0 w-20 h-20 dots-pattern text-secondary opacity-10"></div>

                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <CreditCard className="w-6 h-6 text-primary" />
                  <h3 className="text-2xl font-black handwritten">PAYMENT METHOD</h3>
                </div>

                <div className="space-y-3 relative z-10">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`w-full p-4 border-4 border-foreground font-bold text-left transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-card hover:bg-muted'
                    }`}
                  >
                    💳 Credit / Debit Card
                  </button>

                  <button
                    onClick={() => setPaymentMethod('paypal')}
                    className={`w-full p-4 border-4 border-foreground font-bold text-left transition-all ${
                      paymentMethod === 'paypal'
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-card hover:bg-muted'
                    }`}
                  >
                    💰 PayPal
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="mt-4 space-y-3 relative z-10">
                    <input
                      type="text"
                      placeholder="Card Number"
                      className="w-full px-4 py-3 border-4 border-foreground focus:outline-none focus:ring-4 focus:ring-accent"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 border-4 border-foreground focus:outline-none focus:ring-4 focus:ring-accent"
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        className="w-full px-4 py-3 border-4 border-foreground focus:outline-none focus:ring-4 focus:ring-accent"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div>
              <div className="border-4 border-foreground bg-muted p-6 sticky top-8">
                <h3 className="text-2xl font-black handwritten mb-6">ORDER SUMMARY</h3>

                {/* Items */}
                <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3 bg-background border-3 border-foreground p-3">
                      <div className="w-16 h-16 border-3 border-foreground overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-sm truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground font-bold">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-black text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="border-t-4 border-foreground pt-4 space-y-3">
                  <div className="flex justify-between font-bold">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Shipping:</span>
                    <span className={shipping === 0 ? 'text-accent' : ''}>
                      {shipping === 0 ? 'FREE! 🎉' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Tax:</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t-4 border-foreground pt-3 flex justify-between">
                    <span className="text-2xl font-black handwritten">TOTAL:</span>
                    <span className="text-3xl font-black handwritten text-primary">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Place Order Button */}
                <div className="mt-6">
                  <PopButton
                    variant="primary"
                    className="w-full text-xl"
                    onClick={onConfirmOrder}
                    disabled={!selectedAddress}
                  >
                    PLACE ORDER! 🎉
                  </PopButton>

                  {!selectedAddress && (
                    <p className="text-center text-destructive font-bold text-sm mt-2">
                      Please select a delivery address
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
