import { memo, useCallback } from 'react';

import { SUB_CATEGORY_LABELS, type ProductSubCategory } from '../../features/products/productTypes';

type CategoryTabsProps = {
  active: ProductSubCategory;
  onChange: (subCategory: ProductSubCategory) => void;
};

const SUB_CATEGORY_KEYS = Object.keys(SUB_CATEGORY_LABELS) as ProductSubCategory[];

function CategoryTabsComponent({ active, onChange }: CategoryTabsProps) {
  const handleClick = useCallback(
    (key: ProductSubCategory) => () => {
      onChange(key);
    },
    [onChange],
  );

  return (
    <div className="w-full overflow-x-auto scrollbar-hide" style={{ marginBottom: '80px' }}>
      <div className="flex min-w-max gap-[20px]">
        {SUB_CATEGORY_KEYS.map((key) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              type="button"
              onClick={handleClick(key)}
              className={`flex h-[80px] w-[200px] items-center justify-center rounded-full border whitespace-nowrap font-['Alexandria'] text-[30px] font-light leading-none transition-all duration-300 ${
                isActive
                  ? 'border-black bg-black text-white'
                  : 'border-black bg-white text-black hover:bg-black hover:text-white'
              }`}
              aria-current={isActive ? 'true' : undefined}
            >
              {SUB_CATEGORY_LABELS[key]}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const CategoryTabs = memo(CategoryTabsComponent);

export default CategoryTabs;
