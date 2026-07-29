import { useState } from 'react';
import { Dropdown } from './Dropdown';

export function CategoryDropdowns() {
  const [activeDropdown, setActiveDropdown] = useState<string>('Groceries');

  const handleActiveChange = (label: string) => {
    setActiveDropdown(label);
  };

  return (
    <>
      <Dropdown
        label="Groceries"
        isActive={activeDropdown === 'Groceries'}
        size="md"
        onActiveChange={() => handleActiveChange('Groceries')}
      >
        <div className="p-2">
          <p className="text-sm">Grocery Items</p>
        </div>
      </Dropdown>
      <Dropdown
        label="Premium Fruits"
        isActive={activeDropdown === 'Premium Fruits'}
        size="md"
        onActiveChange={() => handleActiveChange('Premium Fruits')}
      >
        <div className="p-2">
          <p className="text-sm">Premium Fruits</p>
        </div>
      </Dropdown>
      <Dropdown
        label="Home & Kitchen"
        isActive={activeDropdown === 'Home & Kitchen'}
        size="md"
        onActiveChange={() => handleActiveChange('Home & Kitchen')}
      >
        <div className="p-2">
          <p className="text-sm">Home & Kitchen Items</p>
        </div>
      </Dropdown>
      <Dropdown
        label="Fashion"
        isActive={activeDropdown === 'Fashion'}
        size="md"
        onActiveChange={() => handleActiveChange('Fashion')}
      >
        <div className="p-2">
          <p className="text-sm">Fashion Items</p>
        </div>
      </Dropdown>
      <Dropdown
        label="Electronics"
        isActive={activeDropdown === 'Electronics'}
        size="md"
        onActiveChange={() => handleActiveChange('Electronics')}
      >
        <div className="p-2">
          <p className="text-sm">Electronics Items</p>
        </div>
      </Dropdown>

      <Dropdown
        label="Gaming"
        isActive={activeDropdown === 'Gaming'}
        size="md"
        onActiveChange={() => handleActiveChange('Gaming')}
      >
        <div className="p-2">
          <p className="text-sm">Gaming</p>
        </div>
      </Dropdown>

      <Dropdown
        label="Beauty"
        isActive={activeDropdown === 'Beauty'}
        size="md"
        onActiveChange={() => handleActiveChange('Beauty')}
      >
        <div className="p-2">
          <p className="text-sm">Beauty Products</p>
        </div>
      </Dropdown>
      <Dropdown
        label="Home Improvement"
        isActive={activeDropdown === 'Home Improvement'}
        size="md"
        onActiveChange={() => handleActiveChange('Home Improvement')}
      >
        <div className="p-2">
          <p className="text-sm">Home Improvement Items</p>
        </div>
      </Dropdown>
      <Dropdown
        label="Sports & Luggage"
        isActive={activeDropdown === 'Sports, Toys & Luggage'}
        size="md"
        onActiveChange={() => handleActiveChange('Sports, Toys & Luggage')}
      >
        <div className="p-2">
          <p className="text-sm">Sports, Toys</p>
        </div>
      </Dropdown>
    </>
  );
}
