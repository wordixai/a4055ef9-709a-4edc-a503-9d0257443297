import { useState } from 'react';
import { Address } from '../components/AddressModal';

export const useAddress = () => {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      name: 'John Doe',
      phone: '(555) 123-4567',
      street: '123 Pop Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
      isDefault: true,
    },
  ]);

  const addAddress = (address: Omit<Address, 'id'>) => {
    const newAddress: Address = {
      ...address,
      id: Math.max(0, ...addresses.map((a) => a.id)) + 1,
    };

    setAddresses((prev) => {
      // If this is set as default, remove default from others
      if (newAddress.isDefault) {
        return [...prev.map((a) => ({ ...a, isDefault: false })), newAddress];
      }
      return [...prev, newAddress];
    });
  };

  const updateAddress = (id: number, updates: Partial<Address>) => {
    setAddresses((prev) =>
      prev.map((address) => {
        if (address.id === id) {
          return { ...address, ...updates };
        }
        // If setting this one as default, remove default from others
        if (updates.isDefault) {
          return { ...address, isDefault: false };
        }
        return address;
      })
    );
  };

  const deleteAddress = (id: number) => {
    setAddresses((prev) => prev.filter((address) => address.id !== id));
  };

  const getDefaultAddress = () => {
    return addresses.find((address) => address.isDefault) || addresses[0];
  };

  return {
    addresses,
    addAddress,
    updateAddress,
    deleteAddress,
    getDefaultAddress,
  };
};
