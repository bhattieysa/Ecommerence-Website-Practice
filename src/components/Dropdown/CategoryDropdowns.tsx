import { useState } from 'react';
import { Dropdown } from './Dropdown';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';

export function CategoryDropdowns() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleActiveChange = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <Section spacing="compact" className="bg-background relative z-50">
      <Container size="hero">
        <div className="flex flex-wrap gap-3">
          <Dropdown
            label="Groceries"
            isActive={activeDropdown === 'Groceries'}
            size="md"
            onActiveChange={() => handleActiveChange('Groceries')}
          >
            <div className="p-2 min-w-48">
              {['Rice & Grains', 'Pasta & Noodles', 'Canned Goods', 'Snacks & Cookies', 'Beverages'].map((item) => (
                <button
                  key={item}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary rounded-md transition-colors duration-150"
                >
                  {item}
                </button>
              ))}
            </div>
          </Dropdown>
          <Dropdown
            label="Premium Fruits"
            isActive={activeDropdown === 'Premium Fruits'}
            size="md"
            onActiveChange={() => handleActiveChange('Premium Fruits')}
          >
            <div className="p-2 min-w-48">
              {['Apples', 'Oranges', 'Bananas', 'Grapes', 'Strawberries'].map((item) => (
                <button
                  key={item}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary rounded-md transition-colors duration-150"
                >
                  {item}
                </button>
              ))}
            </div>
          </Dropdown>
          <Dropdown
            label="Home & Kitchen"
            isActive={activeDropdown === 'Home & Kitchen'}
            size="md"
            onActiveChange={() => handleActiveChange('Home & Kitchen')}
          >
            <div className="p-2 min-w-48">
              {['Cookware', 'Small Appliances', 'Dinnerware', 'Storage & Organization', 'Kitchen Tools'].map((item) => (
                <button
                  key={item}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary rounded-md transition-colors duration-150"
                >
                  {item}
                </button>
              ))}
            </div>
          </Dropdown>
          <Dropdown
            label="Fashion"
            isActive={activeDropdown === 'Fashion'}
            size="md"
            onActiveChange={() => handleActiveChange('Fashion')}
          >
            <div className="p-2 min-w-48">
              {['Men Clothing', 'Women Clothing', 'Kids Clothing', 'Footwear', 'Accessories'].map((item) => (
                <button
                  key={item}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary rounded-md transition-colors duration-150"
                >
                  {item}
                </button>
              ))}
            </div>
          </Dropdown>
          <Dropdown
            label="Electronics"
            isActive={activeDropdown === 'Electronics'}
            size="md"
            onActiveChange={() => handleActiveChange('Electronics')}
          >
            <div className="p-2 min-w-48">
              {['Smartphones', 'Laptops', 'Tablets', 'Headphones', 'Cameras'].map((item) => (
                <button
                  key={item}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary rounded-md transition-colors duration-150"
                >
                  {item}
                </button>
              ))}
            </div>
          </Dropdown>

          <Dropdown
            label="Gaming"
            isActive={activeDropdown === 'Gaming'}
            size="md"
            onActiveChange={() => handleActiveChange('Gaming')}
          >
            <div className="p-2 min-w-48">
              {['Video Games', 'Consoles', 'Gaming Accessories', 'VR Headsets', 'Gaming Chairs'].map((item) => (
                <button
                  key={item}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary rounded-md transition-colors duration-150"
                >
                  {item}
                </button>
              ))}
            </div>
          </Dropdown>

          <Dropdown
            label="Beauty"
            isActive={activeDropdown === 'Beauty'}
            size="md"
            onActiveChange={() => handleActiveChange('Beauty')}
          >
            <div className="p-2 min-w-48">
              {['Skincare', 'Makeup', 'Hair Care', 'Fragrances', 'Personal Care'].map((item) => (
                <button
                  key={item}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary rounded-md transition-colors duration-150"
                >
                  {item}
                </button>
              ))}
            </div>
          </Dropdown>
          <Dropdown
            label="Home Improvement"
            isActive={activeDropdown === 'Home Improvement'}
            size="md"
            onActiveChange={() => handleActiveChange('Home Improvement')}
          >
            <div className="p-2 min-w-48">
              {['Tools', 'Paint Supplies', 'Lighting', 'Plumbing', 'Hardware'].map((item) => (
                <button
                  key={item}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary rounded-md transition-colors duration-150"
                >
                  {item}
                </button>
              ))}
            </div>
          </Dropdown>
          <Dropdown
            label="Sports & Luggage"
            isActive={activeDropdown === 'Sports, Toys & Luggage'}
            size="md"
            onActiveChange={() => handleActiveChange('Sports, Toys & Luggage')}
          >
            <div className="p-2 min-w-48">
              {['Sports Equipment', 'Fitness', 'Outdoor Recreation', 'Toys & Games', 'Luggage & Travel Gear'].map((item) => (
                <button
                  key={item}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary rounded-md transition-colors duration-150"
                >
                  {item}
                </button>
              ))}
            </div>
          </Dropdown>
        </div>
      </Container>
    </Section>
  );
}
