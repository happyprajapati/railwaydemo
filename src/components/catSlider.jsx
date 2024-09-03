// import React, { useRef, useState } from 'react';
// Import Swiper React components
// import {useEffect} from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import { useEffect, useState } from "react";

export default function CatSlider() {

  const [cat, setCat] = useState([]);

  useEffect(()=>{
    fetch(`${import.meta.env.VITE_BASE_URL}/api/category/`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        setCat(res.data.content);
        console.log(res.data.content)
      });
  },[])

  return (
    <div className="items-center mx-7 my-10">
      <h2 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
        Browse by Category
      </h2>
      <p className="text-gray-500 dark:text-gray-400 pb-5">
        Discover products tailored to your interests.
      </p>{" "}
        <Swiper
          slidesPerView={2}
          mousewheel={true}
          keyboard={true}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          modules={[Pagination]}
          className="mySwiper catSwiper"
        >
          {cat.map((cats, key) => (
            <SwiperSlide
              key={key}
              className="flex flex-col justify-start gap-2 bg-cd-bg"
            >
              <a href={'/cat/' + cats.id}>
                <div className="relative w-full h-40 rounded-xl overflow-hidden">
                    <img src="slider.jpg" alt="category image" className="absolute object-cover"></img>
                    <p className="absolute inset-0 h-full bg-black/30 flex items-center justify-center text-white font-semibold text-xl transition-opacity group-hover:opacity-0">{cats.name}</p>
                </div>
              </a>
            </SwiperSlide>
          ))}
          {/* {cat.map((cat, key) => (
            <SwiperSlide
              key={key}
              className="flex flex-col justify-start gap-2 bg-cd-bg"
            >
              <a href={'/cat/' + cat.name}>
                <div className="relative w-full h-40 rounded-xl overflow-hidden">
                    <img src="slider.jpg" alt="category image" className="absolute object-cover"></img>
                    <p className="absolute inset-0 h-full bg-black/30 flex items-center justify-center text-white font-semibold text-xl transition-opacity group-hover:opacity-0">{cat.title}</p>
                </div>
              </a>
            </SwiperSlide>
          ))} */}
        </Swiper>
      </div>
  );
}
