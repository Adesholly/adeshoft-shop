import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper"

import "swiper/css"

const HeroSlider = () => {
  return (
    <div className='px-16 lg:px-32 -mt-4'>
      <Swiper
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
      >
        <SwiperSlide>
          <div className='relative text-gray-600/70'>
            <img
              className='-mt-16'
              src='/images/slider00.webp'
              alt='Herosection 1'
            />
            <span className='absolute top-20 left-16 text-xl sm:left-32  md:left-64 md:text-2xl md:top-32 lg:left-80 lg:text-3xl lg:p-8 font-semibold'>20% Off Each Purchase</span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='relative text-gray-600/70'>
            <img className='' src='images/slider01.webp' alt='Herosection 2' />
            <span className='absolute top-4 left-32 sm:left-48 sm:text-lg md:left-64 md:text-xl md:top-8 lg:left-80 lg:text-3xl lg:p-8 font-semibold text-md'>GET 100%<br/>Free Shipping of Product</span>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default HeroSlider
