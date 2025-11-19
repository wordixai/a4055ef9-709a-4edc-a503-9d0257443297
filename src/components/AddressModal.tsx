import { useState } from 'react';
import { X, MapPin, Plus, Edit, Trash2 } from 'lucide-react';
import PopButton from './PopButton';

export interface Address {
  id: number;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  addresses: Address[];
  onAddAddress: (address: Omit<Address, 'id'>) => void;
  onUpdateAddress: (id: number, address: Partial<Address>) => void;
  onDeleteAddress: (id: number) => void;
  onSelectAddress?: (address: Address) => void;
  selectedAddressId?: number;
}

const AddressModal = ({
  isOpen,
  onClose,
  addresses,
  onAddAddress,
  onUpdateAddress,
  onDeleteAddress,
  onSelectAddress,
  selectedAddressId,
}: AddressModalProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    isDefault: false,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      onUpdateAddress(editingId, formData);
      setEditingId(null);
    } else {
      onAddAddress(formData);
    }
    resetForm();
    setIsAdding(false);
  };

  const handleEdit = (address: Address) => {
    setFormData({
      name: address.name,
      phone: address.phone,
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      isDefault: address.isDefault,
    });
    setEditingId(address.id);
    setIsAdding(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'USA',
      isDefault: false,
    });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    resetForm();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-card border-8 border-foreground shadow-[12px_12px_0_hsl(var(--primary)),_24px_24px_0_hsl(var(--secondary))] animate-bounce-pop">
        {/* Header */}
        <div className="sticky top-0 bg-primary border-b-8 border-foreground p-6 relative overflow-hidden z-10">
          <div className="absolute inset-0 dots-pattern text-secondary opacity-20"></div>

          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-accent border-4 border-foreground flex items-center justify-center rotate-12">
                <MapPin className="w-6 h-6 text-accent-foreground" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-primary-foreground handwritten">
                DELIVERY ADDRESS
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
          {/* Add/Edit Form */}
          {isAdding ? (
            <form onSubmit={handleSubmit} className="mb-8 bg-muted border-4 border-foreground p-6 relative">
              <div className="absolute top-0 left-0 w-20 h-20 dots-pattern text-primary opacity-10"></div>

              <h3 className="text-2xl font-black handwritten mb-6 relative z-10">
                {editingId ? 'EDIT ADDRESS' : 'NEW ADDRESS'}
              </h3>

              <div className="grid md:grid-cols-2 gap-4 relative z-10">
                <div>
                  <label className="block font-bold mb-2 text-foreground">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border-4 border-foreground focus:outline-none focus:ring-4 focus:ring-accent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-2 text-foreground">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border-4 border-foreground focus:outline-none focus:ring-4 focus:ring-accent"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-bold mb-2 text-foreground">Street Address *</label>
                  <input
                    type="text"
                    required
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    className="w-full px-4 py-3 border-4 border-foreground focus:outline-none focus:ring-4 focus:ring-accent"
                    placeholder="123 Pop Street"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-2 text-foreground">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 border-4 border-foreground focus:outline-none focus:ring-4 focus:ring-accent"
                    placeholder="New York"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-2 text-foreground">State *</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-4 py-3 border-4 border-foreground focus:outline-none focus:ring-4 focus:ring-accent"
                    placeholder="NY"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-2 text-foreground">ZIP Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    className="w-full px-4 py-3 border-4 border-foreground focus:outline-none focus:ring-4 focus:ring-accent"
                    placeholder="10001"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-2 text-foreground">Country *</label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-4 py-3 border-4 border-foreground focus:outline-none focus:ring-4 focus:ring-accent"
                    placeholder="USA"
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={formData.isDefault}
                  onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                  className="w-6 h-6 border-4 border-foreground accent-accent"
                />
                <label htmlFor="isDefault" className="font-bold text-foreground cursor-pointer">
                  Set as default address
                </label>
              </div>

              <div className="flex gap-4 mt-6">
                <PopButton type="submit" variant="accent" className="flex-1">
                  {editingId ? 'UPDATE' : 'SAVE'} ADDRESS ✓
                </PopButton>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-4 font-black handwritten border-4 border-foreground bg-card hover:bg-muted transition-colors"
                >
                  CANCEL
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setIsAdding(true)}
              className="w-full mb-6 p-6 border-4 border-dashed border-foreground bg-muted/30 hover:bg-muted transition-colors group"
            >
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 bg-accent border-4 border-foreground flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Plus className="w-6 h-6 text-accent-foreground" />
                </div>
                <span className="text-2xl font-black handwritten text-foreground">
                  ADD NEW ADDRESS
                </span>
              </div>
            </button>
          )}

          {/* Address List */}
          {addresses.length === 0 ? (
            <div className="text-center py-12 bg-background border-4 border-foreground">
              <div className="text-6xl mb-4">📍</div>
              <p className="text-xl font-black handwritten text-muted-foreground">
                NO ADDRESSES YET!
              </p>
              <p className="text-muted-foreground font-semibold">
                Add your first delivery address above
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className={`border-4 border-foreground p-6 relative transition-all ${
                    selectedAddressId === address.id
                      ? 'bg-accent/20 ring-4 ring-accent'
                      : 'bg-background hover:bg-muted/30'
                  } ${onSelectAddress ? 'cursor-pointer' : ''}`}
                  onClick={() => onSelectAddress?.(address)}
                >
                  {/* Default Badge */}
                  {address.isDefault && (
                    <div className="absolute -top-3 -left-3 bg-accent text-accent-foreground px-4 py-1 border-4 border-foreground rotate-[-5deg]">
                      <span className="font-black text-sm handwritten">DEFAULT</span>
                    </div>
                  )}

                  {/* Selected Badge */}
                  {selectedAddressId === address.id && (
                    <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground px-4 py-1 border-4 border-foreground rotate-[5deg]">
                      <span className="font-black text-sm handwritten">SELECTED ✓</span>
                    </div>
                  )}

                  <div className="flex justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="text-xl font-black handwritten mb-2">{address.name}</h4>
                      <p className="text-muted-foreground font-semibold mb-1">{address.phone}</p>
                      <p className="text-foreground font-semibold">
                        {address.street}, {address.city}, {address.state} {address.zipCode}
                      </p>
                      <p className="text-foreground font-semibold">{address.country}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 items-start">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(address);
                        }}
                        className="p-3 bg-secondary border-3 border-foreground hover:scale-110 transition-transform"
                      >
                        <Edit className="w-5 h-5 text-secondary-foreground" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteAddress(address.id);
                        }}
                        className="p-3 bg-destructive border-3 border-foreground hover:scale-110 transition-transform"
                      >
                        <Trash2 className="w-5 h-5 text-destructive-foreground" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
