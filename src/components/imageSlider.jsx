import { Carousel } from "@material-tailwind/react";
import { useEffect, useState } from "react";

// const img = [
//   {
//     src: "/slider1.jpg",
//   },
//   {
//     src: "/slider1.jpg",
//   },
//   {
//     src: "/slider1.jpg",
//   },
//   {
//     src: "/slider1.jpg",
//   },
//   {
//     src: "/slider1.jpg",
//   },
// ]

const ImageSilder = () => {

  const [sliderImg , setSliderImg] = useState([])

  useEffect(()=>{
    fetch(`${import.meta.env.VITE_BASE_URL}/api/slider/`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        setSliderImg(res.data);
        console.log(res.data)
      });
  },[])

    return (
        <div className="flex flex-col justify-center sm:h-full md:h-full lg:h-screen xl:lg:h-full items-center pt-6 bg-black/20 lg:mx-20 md:mx-8 sm:mx-2 rounded-xl">
        <Carousel className="mt-12" autoplay loop
          navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="absolute bottom-4 left-2/4 z-5 flex -translate-x-2/4 gap-2">
              {new Array(length).fill("").map((_, i) => (
                <span
                  key={i}
                  className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                    activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                  }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}
        >
          {/* {img.map((img, i) => (
            <img
              src={img.src}
              key={i}
              alt="slider image"
              className="h-fit w-[1000px] mx-auto object-contain"
            />
          ))} */}
          {sliderImg?.map((img, i) => (
            <img
              src={`${import.meta.env.VITE_BASE_URL}/api/products/image/${img.name}`}
              key={i}
              alt="slider image"
              className="h-fit w-[1000px] mx-auto object-contain"
            />
          ))}
        </Carousel>
      </div>
    )
}

export default ImageSilder
