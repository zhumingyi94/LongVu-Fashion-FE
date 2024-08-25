import React, { useState } from 'react';
import CustomSlider from './CustomSlider';

const FilterSection = () => {
  const [priceRange, setPriceRange] = useState([1000, 3000]);
  const [isPriceExpanded, setIsPriceExpanded] = useState(true);

  const categories = ['Dresses', 'Shorts', 'Shirts', 'Top', 'Jeans'];

  return (
    <div className="bg-black text-white pl-[46px] w-[341px] mt-[57px]">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-[27.611px] font-normal font-montserrat">Filters</h2>
        <img src="Filter_ico.png" alt="Filter" className="w-[33px] h-[33px]" />
      </div>

      <div className="space-y-[25px] mb-[86px]">
        {categories.map((category) => (
          <div key={category} className="flex justify-between items-center self-stretch">
            <label htmlFor={category} className="text-[20.1px] font-normal font-montserrat leading-[normal] text-edge-cap">
              {category}
            </label>
            <input
              type="checkbox"
              id={category}
              className="h-5 w-5 border border-white bg-transparent appearance-none checked:bg-white checked:border-white mr-[20px]"
            />
          </div>
        ))}
      </div>

      <div>
        <div 
          className="flex justify-between items-center cursor-pointer mb-4"
          onClick={() => setIsPriceExpanded(!isPriceExpanded)}
        >
          <h3 className="text-[27.61px] font-normal font-montserrat leading-normal text-white">Price</h3>
          <img 
            src={isPriceExpanded ? "Price_ico_expand.png" : "Price_ico.png"} 
            alt={isPriceExpanded ? "Collapse" : "Expand"} 
            className="w-6 h-6"
          />
        </div>
        {isPriceExpanded && (
          <div className="mt-4">
            <CustomSlider
              min={0}
              max={5000}
              step={100}
              defaultValue={priceRange}
              onValueChange={setPriceRange}
            />
            <div className="flex justify-between mt-2 font-[Nakula] text-[20px]">
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