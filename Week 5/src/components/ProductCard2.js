export function createProductCard2(product) {
  if (product.layout === "large") {
    return `
      <div class='group flex flex-col w-full h-full min-h-0 cursor-pointer overflow-hidden'>
        <div class='w-full flex-1 h-full min-h-0'>
          <img src='${product.img}' alt='${product.name}'
          class='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300' />
        </div>
        <div class='flex items-center py-4 gap-2'>
          <h3 class='text-sm font-medium'>${product.name}</h3>
          <svg class='w-3.5 h-auto origin-left group-hover:scale-x-120 transition-transform duration-300' viewBox="0 0 14 10" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z" />
          </svg>
        </div>
      </div>
    `;
  } else {
    return `
      <div class='group flex flex-col w-full h-full min-h-0 cursor-pointer overflow-hidden'>
        <div class='w-full flex-1 h-full min-h-0'>
          <img src='${product.img}' alt='${product.name}' 
          class='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300' />
        </div>
          <div class='flex ${product.price ? 'flex-col' : 'flex-row items-center'} gap-2 py-4'>
            <h3 class='text-xs font-medium group-hover:underline underline-offset-3'>${product.name}</h3>
              ${product.price ? `<span class='text-sm'>${product.price}</span>` : `
                <svg class='w-3.5 h-auto origin-left group-hover:scale-x-120 transition-transform duration-300' viewBox="0 0 14 10" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z" />
                </svg>
              `}
          </div>
      </div>
    `;
  }
}
