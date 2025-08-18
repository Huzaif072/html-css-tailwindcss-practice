import { loadCommonPartials } from '../common.js';

// Partials
import banner from '../../partials/banner.html';
import productSection from '../../partials/product-section.html';
import productSection2 from '../../partials/product-section2.html';
import videoSection from '../../partials/video-section.html';
import quoteSection from '../../partials/quotes-section.html';

// Styles
import '../../css/styles.css';

// Data & Components
import products from '../../data/products.js';
import { createProductCard } from '../../components/ProductCard.js';
import products2 from '../../data/products2.js';
import { createProductCard2 } from '../../components/ProductCard2.js';

// Assets
import banner1 from '../../assets/images/bannerimg1.webp';
import banner2 from '../../assets/images/bannerimg2.webp';
import videoimage from '../../assets/images/Mlouye_video.webp';
import quotelogo1 from '../../assets/icons/Mlouye_Refinery_logo.png';
import quotelogo2 from '../../assets/icons/the-cut-logo2_180x_eb657194-39db-4604-852b-1c97f84255ce.png';

const htmlPartials = {
  'banner': banner,
  'product-section': productSection,
  'product-section-2': productSection2,
  'video-section': videoSection,
  'quote-section': quoteSection,
};

const images = {
  'bannerimg1': banner1,
  'bannerimg2': banner2,
  'video': videoimage,
  'quotelogo1': quotelogo1,
  'quotelogo2': quotelogo2
};

document.addEventListener('DOMContentLoaded', () => {
  loadCommonPartials();

  Object.entries(htmlPartials).forEach(([id, content]) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = content;
  });

  Object.entries(images).forEach(([id, src]) => {
    const el = document.getElementById(id);
    if (el) el.src = src;
  });

  // First products container
  const productsContainer = document.getElementById('products-container');
  if (productsContainer) {
    productsContainer.innerHTML = products.map(createProductCard).join('');
  }

  // Second products container
  const container = document.getElementById('products-container-2');
  if (container) {
    const largeItem = products2.find(p => p.layout === "large");
    const smallItems = products2.filter(p => p.layout !== "large");

    container.innerHTML = `
      <div class='grid grid-cols-1 grid-rows-2 md:grid-rows-1 md:grid-cols-3 gap-1 md:gap-2 h-full min-h-0'>
        <div class='md:col-span-2 row-span-2 md:row-span-1 h-full min-h-0'>
          ${createProductCard2(largeItem)}
        </div>
        <div class='grid grid-cols-2 md:grid-cols-1 md:grid-rows-2 gap-1 h-full min-h-0'>
          ${smallItems.map(p => `
            <div class='h-full min-h-0'>
              ${createProductCard2(p)}
            </div>`).join('')}
        </div>
      </div>
    `;
  }
});
