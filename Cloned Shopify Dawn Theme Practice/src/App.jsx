import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const App = () => {
  return (
    <>
      {/* Background Images */}
      <div className='flex -z-100 fixed w-[100%] h-[100%] sm:w-full sm:h-full brightness-60'>

        <img className='w-[50%] h-auto object-cover' src="bannerimg1.webp" alt="Banner Image 1" />

        <img className='w-[50%] h-auto object-cover' src="bannerimg2.webp" alt="Banner Image 2" />

      </div>

      {/* Announcement Bar */}
      <div className='flex justify-center items-center bg-white border-b border-gray-200
                      py-2.5 z-10 px-8 lg:px-13 xl:px-40 2xl:px-180'>

        <span className='text-xs tracking-widest text-center'>
          Free shipping available on all orders!</span>

      </div>

      {/* Header */}
      <header className='flex justify-between md:justify-between items-center bg-white px-8 z-10 h-15 lg:px-13 xl:px-40 2xl:px-180 lg:h-20 w-full '>

        {/* Hamburger Icon */}
        <div className='flex md:pr-22 lg:hidden'>

          <svg className='w-5 h-auto' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16"><path d="M1 .5a.5.5 0 100 1h15.71a.5.5 0 000-1H1zM.5 8a.5.5 0 01.5-.5h15.71a.5.5 0 010 1H1A.5.5 0 01.5 8zm0 7a.5.5 0 01.5-.5h15.71a.5.5 0 010 1H1a.5.5 0 01-.5-.5z" fill="currentColor"></path></svg>

        </div>

        <div className='flex gap-x-5 lg:gap-x-10'>
          {/* Logo */}
          <a href="#"><img className='w-22 sm:w-24 h-auto' src="Dawn_logo.png" alt="Dawn" /></a>

          {/* Navigation Bar */}
          <nav className='lg:flex gap-x-5 text-xs hidden'>
            <a className='flex items-end tracking-widest font-medium text-gray-600 hover:text-black hover:underline underline-offset-4' href="#">
              Bags
              <svg className='ml-1 w-4 h-auto' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M12 15.4L6 9.4L7.4 8L12 12.6L16.6 8L18 9.4L12 15.4Z" fill="#1D1B20" /></svg>
            </a>

            {/* Shoes */}
            <a className='flex items-end tracking-widest font-medium text-gray-600 hover:text-black hover:underline underline-offset-4' href="#">
              Shoes
              <svg className='ml-1 w-4 h-auto' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M12 15.4L6 9.4L7.4 8L12 12.6L16.6 8L18 9.4L12 15.4Z" fill="#1D1B20" /></svg>
            </a>

            {/* Lookbook */}
            <a className='flex items-end tracking-widest font-medium text-gray-600 hover:text-black hover:underline underline-offset-4' href="#">Lookbook</a>
          </nav>
        </div>

        <div className='flex gap-x-3 md:gap-x-6 items-center'>

          {/* Search Icon */}
          <a href="#">
            <svg className='w-6 h-auto hover:scale-110' viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 14L11.1 11.1M12.6667 7.33333C12.6667 10.2789 10.2789 12.6667 7.33333 12.6667C4.38781 12.6667 2 10.2789 2 7.33333C2 4.38781 4.38781 2 7.33333 2C10.2789 2 12.6667 4.38781 12.6667 7.33333Z" stroke="#1E1E1E" /></svg>
          </a>

          {/* Account Login Icon */}
          <a className='hidden md:flex' href="#">
            <svg className='md:w-5 lg:h-auto hover:scale-110' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 19"><path d="M6 4.5a3 3 0 116 0 3 3 0 01-6 0zm3-4a4 4 0 100 8 4 4 0 000-8zm5.58 12.15c1.12.82 1.83 2.24 1.91 4.85H1.51c.08-2.6.79-4.03 1.9-4.85C4.66 11.75 6.5 11.5 9 11.5s4.35.26 5.58 1.15zM9 10.5c-2.5 0-4.65.24-6.17 1.35C1.27 12.98.5 14.93.5 18v.5h17V18c0-3.07-.77-5.02-2.33-6.15-1.52-1.1-3.67-1.35-6.17-1.35z" /></svg>
          </a>

          {/* Cart Icon */}
          <a href="#">
            <svg className='w-5 h-auto hover:scale-110' viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.666687 0.666672H3.33335L5.12002 9.59334C5.18098 9.90027 5.34796 10.176 5.59172 10.3722C5.83548 10.5684 6.14049 10.6727 6.45335 10.6667H12.9334C13.2462 10.6727 13.5512 10.5684 13.795 10.3722C14.0387 10.176 14.2057 9.90027 14.2667 9.59334L15.3334 4.00001H4.00002M6.66669 14C6.66669 14.3682 6.36821 14.6667 6.00002 14.6667C5.63183 14.6667 5.33335 14.3682 5.33335 14C5.33335 13.6318 5.63183 13.3333 6.00002 13.3333C6.36821 13.3333 6.66669 13.6318 6.66669 14ZM14 14C14 14.3682 13.7015 14.6667 13.3334 14.6667C12.9652 14.6667 12.6667 14.3682 12.6667 14C12.6667 13.6318 12.9652 13.3333 13.3334 13.3333C13.7015 13.3333 14 13.6318 14 14Z" stroke="#000000" /></svg>
          </a>
        </div>
      </header>

      <main>

        {/* Banner Text */}
        <div className='flex flex-col justify-center text-center items-center text-white gap-y-2 sm:gap-y-5 lg:mt-110 lg:px-13 xl:px-40 2xl:px-180 px-8 mt-20 md:mt-90'>

          <h1 className='text-4xl sm:text-5xl leading-normal'>Industrial design meets fashion.</h1>

          <p className='pb-4'>
            <span className='text-base text-gray-300'>Atypical leather goods</span>
          </p>

          <button className='text-sm tracking-widest text-center px-8 py-3 border-1'>
            Shop now
          </button>
        </div>

        <div className='flex flex-col justify-center items-center gap-y-8 mt-20 py-8 sm:py-10 px-8 lg:px-13 xl:px-40 2xl:px-180 bg-white'>

          <h2 className='text-3xl md:px-23 md:text-4xl text-center'>
            Obsessive Attention. Intelligent Effort.
          </h2>

          <p className='md:px-23 text-center'>
            <span className='font-normal text-sm sm:text-base text-gray-600'>
              Functional handbags made of luxurious materials to improve people's lives in small
              but mighty ways.
            </span>
          </p>
        </div>

        {/* Products */}
        <div className='flex flex-wrap gap-x-1 gap-y-3 sm:gap-x-2 sm:gap-y-6 underline-offset-3 bg-white px-4 py-2 md:px-13 xl:px-40 2xl:px-180 tracking-wider'>

          {/* Product-1 */}
          <div className='flex flex-col gap-y-4 basis-[calc(50%-2px)] sm:basis-[calc(50%-4px)] lg:basis-[calc(25%-6px)] cursor-pointer group'>

            {/* Product Image */}
            <div className='relative aspect-[1/1] overflow-hidden'>

              <p>
                <span className='absolute bg-[#242833] z-10 text-white text-xs px-3.5 py-1 rounded-full left-2.5 bottom-3'>Sold out</span>
              </p>

              <img src="bag1.webp" alt="Bag" className='absolute inset-0 w-full h-full opacity-100 transition-opacity duration-300 group-hover:opacity-0' />

              <img src="bag1hover.webp" alt="Bag on Hover" className='absolute inset-0 w-full h-full opacity-0  group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105' />
            </div>

            {/* Product Text */}
            <div className='flex flex-col flex-wrap gap-y-2 '>

              <h3 className='text-xs font-medium group-hover:underline'>
                Small Convertible Flex Bag
              </h3>

              <p className='flex flex-wrap items-center gap-x-2 sm:gap-x-4'>\

                <span className='text-xs text-gray-700 line-through'>$395.00 CAD</span>
                <span className='text-sm'>From $320.00 CAD</span>

              </p>

            </div>

          </div>

          {/* Product-2 */}
          <div className='flex flex-col gap-y-4 basis-[calc(50%-2px)] sm:basis-[calc(50%-4px)] lg:basis-[calc(25%-6px)] cursor-pointer group'>

            {/* Product Image */}
            <div className='relative aspect-[1/1] overflow-hidden'>
              <p>
                <span className='absolute bg-[#242833] z-10 text-white text-xs px-3.5 py-1 rounded-full left-2.5 bottom-3'>Sold out</span>
              </p>

              <img src="bag2.webp" alt="Bag" className='absolute inset-0 w-full h-full transition-opacity duration-300 group-hover:opacity-0' />

              <img src="bag2hover.webp" alt="Bag on Hover" className='absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105' />

            </div>

            {/* Product Text */}
            <div className='flex flex-col flex-wrap gap-y-2'>

              <h3 className='text-xs font-medium group-hover:underline'>Studio Bag</h3>

              <span className='text-sm'>$465.00 CAD</span>

            </div>

          </div>

          {/* Product-3 */}
          <div className='flex flex-col gap-y-4 basis-[calc(50%-2px)] sm:basis-[calc(50%-4px)] lg:basis-[calc(25%-6px)] cursor-pointer group'>

            {/* Product Image */}
            <div className='relative aspect-[1/1] overflow-hidden'>
              <p>
                <span className='absolute bg-[#334fb4] z-10 text-white text-xs px-3.5 py-1 rounded-full left-2.5 bottom-3'>Sale</span>
              </p>

              <img src="sandal3.webp" alt="Sandal" className='absolute inset-0 w-full h-full transition-opacity duration-300 group-hover:opacity-0' />

              <img src="sandal3hover.webp" alt="Sandle on Hover" className='absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105' />

            </div>

            {/* Product Text */}
            <div className='flex flex-col flex-wrap gap-y-2'>

              <h3 className='text-xs font-medium group-hover:underline'>Louise Slide Sandal</h3>

              <p className='flex flex-wrap items-center gap-x-4'>
                <span className='text-xs text-gray-700 line-through'>$430.00 CAD</span>
                <span className='text-sm'>$395.00 CAD</span>
              </p>

            </div>

          </div>

          {/* Product-4 */}
          <div className='flex flex-col gap-y-4 basis-[calc(50%-2px)] sm:basis-[calc(50%-4px)] lg:basis-[calc(25%-6px)] cursor-pointer group'>

            {/* Product Image */}
            <div className='relative aspect-[1/1] overflow-hidden'>
              <p>
                <span className='absolute bg-[#334fb4] z-10 text-white text-xs px-3.5 py-1 rounded-full left-2.5 bottom-3'>Sale</span>
              </p>

              <img src="bag4.webp" alt="Bag" className='absolute inset-0 w-full h-full transition-opacity duration-300 group-hover:opacity-0' />

              <img src="bag4hover.jpg" alt="Bag on Hover" className='inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105' />

            </div>

            {/* Product Text */}
            <div className='flex flex-wrap flex-col gap-y-2'>

              <h3 className='text-xs font-medium group-hover:underline'>Mini Naomi Bag</h3>

              <p className='flex flex-wrap items-center gap-x-4'>
                <span className='text-xs text-gray-700 line-through'>$315.00 CAD</span>
                <span className='text-sm'>From $299.00 CAD</span>
              </p>

            </div>

          </div>

          {/* Product-5 */}
          <div className='flex flex-col gap-y-4 basis-[calc(50%-2px)] sm:basis-[calc(50%-4px)] lg:basis-[calc(25%-6px)] cursor-pointer group'>

            {/* Product Image */}
            <div className='relative aspect-[1/1] overflow-hidden'>

              <img src="bag5.jpg" alt="Bag" className='absolute inset-0 w-full h-full transition-opacity duration-300 group-hover:opacity-0' />

              <img src="bag5hover.webp" alt="Bag on Hover" className='absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105' />

            </div>

            {/* Product Text */}
            <div className='flex flex-wrap flex-col gap-y-2'>

              <h3 className='text-xs font-medium group-hover:underline'>Helix</h3>

              <span className='text-sm'>$470.00 CAD</span>

            </div>

          </div>

          {/* Product-6 */}
          <div className='flex flex-col gap-y-4 basis-[calc(50%-2px)] sm:basis-[calc(50%-4px)] lg:basis-[calc(25%-6px)] cursor-pointer group'>

            {/* Product Image */}
            <div className='relative aspect-[1/1] overflow-hidden'>

              <img src="bag6.webp" alt="Bag" className='absolute inset-0 w-full h-full transition-opacity duration-300 group-hover:opacity-0' />

              <img src="bag6hover.webp" alt="Bag on Hover" className='absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105' />

            </div>

            {/* Product Text */}
            <div className='flex flex-wrap flex-col gap-y-2'>

              <h3 className='text-xs font-medium group-hover:underline'>Bo Ivy</h3>

              <span className='text-sm'>$390.00 CAD</span>

            </div>

          </div>

          {/* Product-7 */}
          <div className='flex flex-col gap-y-4 basis-[calc(50%-2px)] sm:basis-[calc(50%-4px)] lg:basis-[calc(25%-6px)] cursor-pointer group'>

            {/* Product Image */}
            <div className='relative aspect-[1/1] overflow-hidden group'>

              <img src="sandal7.webp" alt="Sandal" className='absolute inset-0 w-full h-full transition-opacity duration-300 group-hover:opacity-0' />

              <img src="sandal7hover.webp" alt="Sandal on Hover" className='absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105' />

            </div>

            {/* Product Text */}
            <div className='flex flex-wrap flex-col gap-y-2'>

              <h3 className='text-xs font-medium group-hover:underline'>Pleated Heel Mule</h3>

              <span className='text-sm'>$495.00 CAD</span>

            </div>

          </div>

          {/* Product-8 */}
          <div className='flex flex-col gap-y-4 basis-[calc(50%-2px)] sm:basis-[calc(50%-4px)] lg:basis-[calc(25%-6px)] cursor-pointer group'>

            {/* Product Image */}
            <div className='relative aspect-[1/1] overflow-hidden group'>

              <img src="bag8.webp" alt="Bag" className='absolute inset-0 w-full h-full transition-opacity duration-300 group-hover:opacity-0' />

              <img src="bag8hover.webp" alt="Bag on Hover" className='inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105' />

            </div>

            {/* Product Text */}
            <div className='flex flex-wrap flex-col gap-y-2'>

              <h3 className='text-xs font-medium group-hover:underline'>Brick</h3>

              <span className='text-sm'>$385.00 CAD</span>

            </div>
          </div>
        </div>

        <div className='flex flex-col bg-white tracking-wider px-4 py-5 md:px-13 xl:px-40 2xl:px-180 md:py-10'>

          <h2 className='mb-7.5 text-[1.15rem] md:text-[1.35rem] tracking-wide'>Back in stock!</h2>

          <div className='flex flex-wrap md:flex-nowrap gap-4 md:gap-2 md:h-[35rem] lg:h-[53rem] xl:h-[55rem]'>

            {/* Left Side */}
            <div className='w-full h-full md:w-[66.666%]'>

              <div className='flex flex-col gap-3 cursor-pointer group h-full'>

                <div className='aspect-[1/1] md:aspect-square h-full overflow-hidden'>

                  <img src="Women Bag.jpg" alt="Bag" className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300' />

                </div>

                <div className='flex items-center gap-x-2'>

                  <h3>Bags</h3>
                  <svg className='w-3.5 h-auto origin-left group-hover:scale-x-120 transition-transform duration-300' viewBox="0 0 14 10" xmlns="http://www.w3.org/2000/svg"> <path d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0
                  11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z" /></svg>

                </div>

              </div>
              
            </div>

            {/* Right Side */}
            <div className='w-full h-full flex md:flex-col gap-2'>

              {/* Top Item */}
              <div className='flex flex-col flex-1 gap-y-4 cursor-pointer group h-1/2'>

                {/* Product Image */}
                <div className='overflow-hidden h-full'>

                  <img src="bag9.webp" alt="Bag" className='w-full h-full object-cover lg:object-cover group-hover:scale-105 transition-transform duration-300' />

                </div>

                {/* Product Text */}
                <div className='flex flex-col gap-y-3'>
                  
                  <h3 className='text-xs font-medium group-hover:underline underline-offset-3'>
                    Mini Eddy</h3>
                  <span className='text-sm'>$375.00 CAD</span>

                </div>

              </div>

              {/* Bottom Item */}
              <div className='flex flex-col flex-1 gap-y-3 cursor-pointer group h-1/2'>

                {/* Product Image */}
                <div className='overflow-hidden h-full'>

                  <img src="shoe10.webp" alt="Shoe" className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300' />

                </div>

                {/* Product Text */}
                <div className='flex items-center gap-x-2'>

                  <h3 className='font-medium'>Shoes</h3>
                  <svg className='w-3.5 h-auto origin-left group-hover:scale-x-120 transition-transform duration-300' viewBox="0 0 14 10" xmlns="http://www.w3.org/2000/svg"> <path d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z" /></svg>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Video */}
        <div className='bg-white px-4 py-5 md:px-13 xl:px-40 2xl:px-180 lg:py-10'>

          <img className='h-auto w-full object-cover cursor-pointer' src="bagvideo.jpg" alt="Video" />

        </div>

        {/* Quotes */}
        <div className='bg-white px-4 py-5 md:px-13 xl:px-40 2xl:px-180 lg:py-10 flex flex-wrap lg:flex-nowrap gap-1 lg:gap-0 lg:justify-between justify-center'>
          {/* Quote-1 */}
          <div className='flex flex-wrap flex-col items-center lg:gap-7 text-center'>

            <div>

              <img src="Mlouye_Refinery_logo.png" alt="" className='w-30 lg:w-45 h-auto' />
              
            </div>

            <div>

              <p className='px-7 py-5'>

                <span className='text-sm text-gray-600 font-medium leading-8 tracking-wider'>
                  &quot;The leather is sourced from environmentally friendly tanneries in Italy, France, and Turkey, where Rure is based and everything is assembled by hand.&quot;
                </span>

              </p>

            </div>

          </div>

          {/* Quote-2 */}
          <div className='flex flex-col items-center lg:gap-8 text-center'>

            <div>

              <img src="the-cut-logo2_180x_eb657194-39db-4604-852b-1c97f84255ce.png" alt="" className='w-15 lg:w-25 h-auto' />

            </div>

            <div>

              <p className='px-6 py-5'>
                <span className='text-sm text-gray-600 font-medium leading-8 tracking-wider'>
                  &quot;All too often, we're forced to pick: style, or sustainability. Recently, more designers have been making environmental impact a top priority&quot;
                </span>
              </p>

            </div>

          </div>
          
        </div>

      </main >

      {/* Footer */}
      <footer className='relative px-10 lg:py-10 md:px-13 xl:px-40 2xl:px-180 bg-white'>

        <div className='py-15 flex flex-wrap md:flex-nowrap flex-col md:flex-row gap-12 justify-between sm:gap-10 md:gap-0'>

          {/* Quick Links */}
          <div className='flex flex-col lg:items-center tracking-wider gap-8'>

            <h3 className=''>Quick links</h3>

            <div className='flex gap-6 flex-col'>

              <a className='text-xs text-gray-600 hover:text-black hover:underline underline-offset-3 decoration-1' href="#">Bags</a>

              <a className='text-xs text-gray-600 hover:text-black hover:underline underline-offset-3 decoration-1' href="#">Shoes</a>

              <a className='text-xs text-gray-600 hover:text-black hover:underline underline-offset-3 decoration-1' href="#">Lookbook</a>

            </div>

          </div>
          
          {/* Info */}
          <div className='flex flex-col tracking-wider gap-8'>

            <h3>Info</h3>

            <div className='flex gap-6 flex-col'>

              <a className='text-xs text-gray-600 hover:text-black hover:underline underline-offset-3 decoration-1' href="#">About</a>

              <a className='text-xs text-gray-600 hover:text-black hover:underline underline-offset-3 decoration-1' href="#">Contact us</a>

              <a className='text-xs text-gray-600 hover:text-black hover:underline underline-offset-3 decoration-1' href="#">Shopping policy</a>

              <a className='text-xs text-gray-600 hover:text-black hover:underline underline-offset-3 decoration-1' href="#">Blog</a>

            </div>

          </div>
          
          {/* Our Mission */}
          <div className='flex md:w-[33%] flex-col tracking-wider gap-5'>

            <h3>Our mission</h3>
            
            <p>
              <span className='text-gray-600 text-sm'>
                Quality materials, good designs, craftsmanship and sustainability.
              </span>
            </p>

          </div>
          
        </div>
 
        {/* Subscribe */}
        <div className='flex flex-wrap justify-center md:justify-start'>

          <h2>Subscribe to our emails</h2>

        </div>

        <div className='py-5 flex flex-wrap md:flex-nowrap gap-10 justify-center md:justify-between items-center tracking-wider'>

          <div className='relative flex justify-center md:justify-between w-full sm:max-w-md'>

            <svg className='absolute w-5 h-auto right-[8%] sm:right-[20%] md:right-[30%] lg:right-[35%] top-1/2 -translate-y-1/2' viewBox="0 0 14 10" fill='#4a5565' xmlns="http://www.w3.org/2000/svg"> <path d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z" /></svg>

            <input className='outline-[1.5px] min-w-0 flex-1 max-w-[19rem] outline-gray-400 py-2 pl-4 pr-10 placeholder-gray-600 hover:outline-2 hover:outline-gray-600' type="email" placeholder='Email' />

          </div>

          {/* Social Media Icons */}
          <div className='flex flex-wrap items-end'>

            <ul className='flex flex-wrap md:flex-nowrap justify-center md:justify-end gap-6'>
              
              {/* Facebook */}
              <li>
                <a href="#">
                  <svg className='w-6 h-auto' viewBox="0 0 20 20"><path d="M18 10.049C18 5.603 14.419 2 10 2c-4.419 0-8 3.603-8 8.049C2 14.067 4.925 17.396 8.75 18v-5.624H6.719v-2.328h2.03V8.275c0-2.017 1.195-3.132 3.023-3.132.874 0 1.79.158 1.79.158v1.98h-1.009c-.994 0-1.303.621-1.303 1.258v1.51h2.219l-.355 2.326H11.25V18c3.825-.604 6.75-3.933 6.75-7.951Z" /></svg>
                </a>
              </li>

              {/* Instagram */}
              <li>
                <a href="#">
                  <svg className='w-6 h-auto' viewBox="0 0 20 20"><path d="M13.23 3.492c-.84-.037-1.096-.046-3.23-.046-2.144 0-2.39.01-3.238.055-.776.027-1.195.164-1.487.273a2.43 2.43 0 0 0-.912.593 2.486 2.486 0 0 0-.602.922c-.11.282-.238.702-.274 1.486-.046.84-.046 1.095-.046 3.23 0 2.134.01 2.39.046 3.229.004.51.097 1.016.274 1.495.145.365.319.639.602.913.282.282.538.456.92.602.474.176.974.268 1.479.273.848.046 1.103.046 3.238.046 2.134 0 2.39-.01 3.23-.046.784-.036 1.203-.164 1.486-.273.374-.146.648-.329.921-.602.283-.283.447-.548.602-.922.177-.476.27-.979.274-1.486.037-.84.046-1.095.046-3.23 0-2.134-.01-2.39-.055-3.229-.027-.784-.164-1.204-.274-1.495a2.43 2.43 0 0 0-.593-.913 2.604 2.604 0 0 0-.92-.602c-.284-.11-.703-.237-1.488-.273ZM6.697 2.05c.857-.036 1.131-.045 3.302-.045 1.1-.014 2.202.001 3.302.045.664.014 1.321.14 1.943.374a3.968 3.968 0 0 1 1.414.922c.41.397.728.88.93 1.414.23.622.354 1.279.365 1.942C18 7.56 18 7.824 18 10.005c0 2.17-.01 2.444-.046 3.292-.036.858-.173 1.442-.374 1.943-.2.53-.474.976-.92 1.423a3.896 3.896 0 0 1-1.415.922c-.51.191-1.095.337-1.943.374-.857.036-1.122.045-3.302.045-2.171 0-2.445-.009-3.302-.055-.849-.027-1.432-.164-1.943-.364a4.152 4.152 0 0 1-1.414-.922 4.128 4.128 0 0 1-.93-1.423c-.183-.51-.329-1.085-.365-1.943C2.009 12.45 2 12.167 2 10.004c0-2.161 0-2.435.055-3.302.027-.848.164-1.432.365-1.942a4.44 4.44 0 0 1 .92-1.414 4.18 4.18 0 0 1 1.415-.93c.51-.183 1.094-.33 1.943-.366Zm.427 4.806a4.105 4.105 0 1 1 5.805 5.805 4.105 4.105 0 0 1-5.805-5.805Zm1.882 5.371a2.668 2.668 0 1 0 2.042-4.93 2.668 2.668 0 0 0-2.042 4.93Zm5.922-5.942a.958.958 0 1 1-1.355-1.355.958.958 0 0 1 1.355 1.355Z" /></svg>
                </a>
              </li>

              {/* Youtube */}
              <li>
                <a href="#">
                  <svg className='w-6 h-auto' viewBox="0 0 20 20"><path d="M18.16 5.87c.34 1.309.34 4.08.34 4.08s0 2.771-.34 4.08a2.125 2.125 0 0 1-1.53 1.53c-1.309.34-6.63.34-6.63.34s-5.321 0-6.63-.34a2.125 2.125 0 0 1-1.53-1.53c-.34-1.309-.34-4.08-.34-4.08s0-2.771.34-4.08a2.173 2.173 0 0 1 1.53-1.53C4.679 4 10 4 10 4s5.321 0 6.63.34a2.173 2.173 0 0 1 1.53 1.53ZM8.3 12.5l4.42-2.55L8.3 7.4v5.1Z" /></svg>
                </a>
              </li>

              {/* Tiktok */}
              <li>
                <a href="#">
                  <svg className='w-6 h-auto' viewBox="0 0 20 20"><path d="M10.511 1.705h2.74s-.157 3.51 3.795 3.768v2.711s-2.114.129-3.796-1.158l.028 5.606A5.073 5.073 0 1 1 8.213 7.56h.708v2.785a2.298 2.298 0 1 0 1.618 2.205L10.51 1.705Z" /></svg>
                </a>
              </li>

              {/* Twitter */}
              <li>
                <a href="#">
                  <svg className='w-6 h-auto' viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.27274 2.8L10.8009 7.82176L15.2183 2.8H16.986L11.5861 8.93887L17.3849 17.1928H12.7272L8.99645 11.8828L4.32555 17.1928H2.55769L8.21157 10.7657L2.61506 2.8H7.27274ZM13.5151 15.9248L5.06895 4.10931H6.4743L14.9204 15.9248H13.5151Z" fill="currentColor" /></svg>
                </a>
              </li>

            </ul>

          </div>

        </div>

        <hr className='absolute left-0 sm:bottom-48 md:bottom-35 lg:bottom-45 w-full border-gray-200' />

        <div className='py-7 flex flex-wrap flex-col md:flex-row gap-5 justify-center md:justify-between items-center md:items-end'>

          {/* Country/region */}
          <div className='flex flex-col flex-wrap gap-4'>

            <p>
              <span className='text-gray-600 text-xs tracking-wider'>Country/region</span>
            </p>

            <div className='relative flex w-full items-center'>

              <a className='outline-[1.5px] flex-1 outline-gray-400 text-xs px-5 pr-10 py-3 max-w-[10rem] tracking-wider text-gray-800 hover:outline-2 hover:outline-gray-500' href="#">Canada | CAD $</a>

              <svg className='absolute w-2.5 h-auto right-3 md:left-35' viewBox="0 0 10 6"><path d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" /></svg>

            </div>

          </div>

          {/* Cards */}
          <div>

            <ul className='flex flex-wrap justify-center gap-3 items-center'>

              {/* Visa */}
              <li>
                <svg className='w-9 h-auto' viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" ><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><path d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4 2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z" fill="#142688" /></svg>
              </li>

              {/* Master Card */}
              <li>
                <svg className='w-9 h-auto' viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" ><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" /><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32" /><circle fill="#EB001B" cx="15" cy="12" r="7" /><circle fill="#F79E1B" cx="23" cy="12" r="7" /><path fill="#FF5F00" d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z" /></svg>
              </li>

              {/* AMEX */}
              <li>
                <svg className='w-9 h-auto' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 24" ><path fill="#000" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3Z" opacity=".07" /><path fill="#006FCF" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32Z" /><path fill="#FFF" d="M22.012 19.936v-8.421L37 11.528v2.326l-1.732 1.852L37 17.573v2.375h-2.766l-1.47-1.622-1.46 1.628-9.292-.02Z" /><path fill="#006FCF" d="M23.013 19.012v-6.57h5.572v1.513h-3.768v1.028h3.678v1.488h-3.678v1.01h3.768v1.531h-5.572Z" /><path fill="#006FCF" d="m28.557 19.012 3.083-3.289-3.083-3.282h2.386l1.884 2.083 1.89-2.082H37v.051l-3.017 3.23L37 18.92v.093h-2.307l-1.917-2.103-1.898 2.104h-2.321Z" /><path fill="#FFF" d="M22.71 4.04h3.614l1.269 2.881V4.04h4.46l.77 2.159.771-2.159H37v8.421H19l3.71-8.421Z" /><path fill="#006FCF" d="m23.395 4.955-2.916 6.566h2l.55-1.315h2.98l.55 1.315h2.05l-2.904-6.566h-2.31Zm.25 3.777.875-2.09.873 2.09h-1.748Z" /><path fill="#006FCF" d="M28.581 11.52V4.953l2.811.01L32.84 9l1.456-4.046H37v6.565l-1.74.016v-4.51l-1.644 4.494h-1.59L30.35 7.01v4.51h-1.768Z" /></svg>
              </li>

              {/* PayPal */}
              <li>
                <svg className='w-9 h-auto' viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" ><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" /><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32" /><path fill="#003087" d="M23.9 8.3c.2-1 0-1.7-.6-2.3-.6-.7-1.7-1-3.1-1h-4.1c-.3 0-.5.2-.6.5L14 15.6c0 .2.1.4.3.4H17l.4-3.4 1.8-2.2 4.7-2.1z" /><path fill="#3086C8" d="M23.9 8.3l-.2.2c-.5 2.8-2.2 3.8-4.6 3.8H18c-.3 0-.5.2-.6.5l-.6 3.9-.2 1c0 .2.1.4.3.4H19c.3 0 .5-.2.5-.4v-.1l.4-2.4v-.1c0-.2.3-.4.5-.4h.3c2.1 0 3.7-.8 4.1-3.2.2-1 .1-1.8-.4-2.4-.1-.5-.3-.7-.5-.8z" /><path fill="#012169" d="M23.3 8.1c-.1-.1-.2-.1-.3-.1-.1 0-.2 0-.3-.1-.3-.1-.7-.1-1.1-.1h-3c-.1 0-.2 0-.2.1-.2.1-.3.2-.3.4l-.7 4.4v.1c0-.3.3-.5.6-.5h1.3c2.5 0 4.1-1 4.6-3.8v-.2c-.1-.1-.3-.2-.5-.2h-.1z" /></svg>
              </li>

              {/* 5th Card */}
              <li>
                <svg className='w-9 h-auto' viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" ><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" /><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32" /><path d="M12 12v3.7c0 .3-.2.3-.5.2-1.9-.8-3-3.3-2.3-5.4.4-1.1 1.2-2 2.3-2.4.4-.2.5-.1.5.2V12zm2 0V8.3c0-.3 0-.3.3-.2 2.1.8 3.2 3.3 2.4 5.4-.4 1.1-1.2 2-2.3 2.4-.4.2-.4.1-.4-.2V12zm7.2-7H13c3.8 0 6.8 3.1 6.8 7s-3 7-6.8 7h8.2c3.8 0 6.8-3.1 6.8-7s-3-7-6.8-7z" fill="#3086C8" /></svg>
              </li>

              {/* Discover */}
              <li>
                <svg className='w-9 h-auto' viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg"><path fill="#000" opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" /><path d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32z" fill="#fff" /><path d="M3.57 7.16H2v5.5h1.57c.83 0 1.43-.2 1.96-.63.63-.52 1-1.3 1-2.11-.01-1.63-1.22-2.76-2.96-2.76zm1.26 4.14c-.34.3-.77.44-1.47.44h-.29V8.1h.29c.69 0 1.11.12 1.47.44.37.33.59.84.59 1.37 0 .53-.22 1.06-.59 1.39zm2.19-4.14h1.07v5.5H7.02v-5.5zm3.69 2.11c-.64-.24-.83-.4-.83-.69 0-.35.34-.61.8-.61.32 0 .59.13.86.45l.56-.73c-.46-.4-1.01-.61-1.62-.61-.97 0-1.72.68-1.72 1.58 0 .76.35 1.15 1.35 1.51.42.15.63.25.74.31.21.14.32.34.32.57 0 .45-.35.78-.83.78-.51 0-.92-.26-1.17-.73l-.69.67c.49.73 1.09 1.05 1.9 1.05 1.11 0 1.9-.74 1.9-1.81.02-.89-.35-1.29-1.57-1.74zm1.92.65c0 1.62 1.27 2.87 2.9 2.87.46 0 .86-.09 1.34-.32v-1.26c-.43.43-.81.6-1.29.6-1.08 0-1.85-.78-1.85-1.9 0-1.06.79-1.89 1.8-1.89.51 0 .9.18 1.34.62V7.38c-.47-.24-.86-.34-1.32-.34-1.61 0-2.92 1.28-2.92 2.88zm12.76.94l-1.47-3.7h-1.17l2.33 5.64h.58l2.37-5.64h-1.16l-1.48 3.7zm3.13 1.8h3.04v-.93h-1.97v-1.48h1.9v-.93h-1.9V8.1h1.97v-.94h-3.04v5.5zm7.29-3.87c0-1.03-.71-1.62-1.95-1.62h-1.59v5.5h1.07v-2.21h.14l1.48 2.21h1.32l-1.73-2.32c.81-.17 1.26-.72 1.26-1.56zm-2.16.91h-.31V8.03h.33c.67 0 1.03.28 1.03.82 0 .55-.36.85-1.05.85z" fill="#231F20" /><path d="M20.16 12.86a2.931 2.931 0 100-5.862 2.931 2.931 0 000 5.862z" fill="url(#pi-paint0_linear)" /><path opacity=".65" d="M20.16 12.86a2.931 2.931 0 100-5.862 2.931 2.931 0 000 5.862z" fill="url(#pi-paint1_linear)" /><path d="M36.57 7.506c0-.1-.07-.15-.18-.15h-.16v.48h.12v-.19l.14.19h.14l-.16-.2c.06-.01.1-.06.1-.13zm-.2.07h-.02v-.13h.02c.06 0 .09.02.09.06 0 .05-.03.07-.09.07z" fill="#231F20" /><path d="M36.41 7.176c-.23 0-.42.19-.42.42 0 .23.19.42.42.42.23 0 .42-.19.42-.42 0-.23-.19-.42-.42-.42zm0 .77c-.18 0-.34-.15-.34-.35 0-.19.15-.35.34-.35.18 0 .33.16.33.35 0 .19-.15.35-.33.35z" fill="#231F20" /><path d="M37 12.984S27.09 19.873 8.976 23h26.023a2 2 0 002-1.984l.024-3.02L37 12.985z" fill="#F48120" /><defs><linearGradient id="pi-paint0_linear" x1="21.657" y1="12.275" x2="19.632" y2="9.104" gradientUnits="userSpaceOnUse"><stop stop-color="#F89F20"></stop><stop offset=".25" stop-color="#F79A20"></stop><stop offset=".533" stop-color="#F68D20"></stop><stop offset=".62" stop-color="#F58720"></stop><stop offset=".723" stop-color="#F48120"></stop><stop offset="1" stop-color="#F37521"></stop></linearGradient><linearGradient id="pi-paint1_linear" x1="21.338" y1="12.232" x2="18.378" y2="6.446" gradientUnits="userSpaceOnUse"><stop stop-color="#F58720"></stop><stop offset=".359" stop-color="#E16F27"></stop><stop offset=".703" stop-color="#D4602C"></stop><stop offset=".982" stop-color="#D05B2E"></stop></linearGradient></defs></svg>
              </li>

            </ul>

          </div>

        </div>

        <span className='flex text-[10px] justify-center md:justify-start text-gray-500 tracking-wider '>&copy; 2025, theme-dawn-demo Powered by Shopify</span>
        
      </footer>
    </>
  )
}

export default App
