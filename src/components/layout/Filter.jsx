import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';

const FilterSection = () => {
  const [priceRange, setPriceRange] = useState([1000, 3000]);
  const [isPriceExpanded, setIsPriceExpanded] = useState(true);

  const categories = ['Dresses', 'Shorts', 'Shirts', 'Top', 'Jeans'];

  return (
    <div className="bg-black text-white p-6 w-64">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Filters</h2>
        <button className="text-2xl">⋮</button>
      </div>

      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category} className="flex justify-between items-center">
            <label htmlFor={category} className="text-lg">{category}</label>
            <input
              type="checkbox"
              id={category}
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>

      <div className="mt-8">
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setIsPriceExpanded(!isPriceExpanded)}
        >
          <h3 className="text-xl font-semibold">Price</h3>
          <span className="text-2xl">{isPriceExpanded ? '∧' : '∨'}</span>
        </div>
        {isPriceExpanded && (
          <div className="mt-4">
            <Slider
              defaultValue={priceRange}
              max={5000}
              min={0}
              step={100}
              onValueChange={setPriceRange}
            />
            <div className="flex justify-between mt-2">
              <span>${priceRange[0].toLocaleString()}</span>
              <span>${priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSection;