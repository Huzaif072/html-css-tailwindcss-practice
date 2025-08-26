// ProductCard.js
const labelColors = {
  'Sold out': 'bg-gray-900',
  'Sale': 'bg-blue-700'
};

export function createProductCard(product) {
  return `
    <div class='flex flex-col gap-4 cursor-pointer group'>
      <div class='relative aspect-[1/1] overflow-hidden'>
        ${product.label ? `
          <span class='absolute z-10 text-white text-xs px-3.5 py-1 rounded-full left-2.5 bottom-3 ${labelColors[product.label] || ''}'>
            ${product.label}
          </span>` : ''}
        <img src="${product.img}" alt="${product.name}" class='absolute inset-0 w-full h-full transition-opacity duration-300 group-hover:opacity-0' />
        <img src="${product.imgHover}" alt="${product.name} on hover" class='absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105' />
      </div>
      <div class='flex flex-col justify-center gap-y-2'>
        <h3 class='text-xs group-hover:underline'>${product.name}</h3>
        ${product.oldPrice
          ? `<p class='flex flex-wrap gap-1'>
               <span class='text-xs text-gray-700 line-through'>${product.oldPrice}</span>
               <span class='text-sm tracking-widest'>${product.price}</span>
             </p>`
          : `<span class='text-sm tracking-widest'>${product.price}</span>`}
      </div>
    </div>
  `;
}
