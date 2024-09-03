import Cards from "../components/cards";
import CatSlider from "../components/catSlider";
import ImageSlider from "../components/imageSlider";
import { useEffect } from "react";
import AOS from "aos";

export default function Home() {
  useEffect(() => {
    // console.log("hello Wolrd!!")
    // if (localStorage.getItem("authToken") == null) {
    //   window.location.href = `https://meghainfocom.up.railway.app/login`;
    // } else {
      AOS.init({
        easing: "ease-in-out",
        duration: 500,
      });
      AOS.refresh();
    // }
  }, []);

  return (
    <>
      <ImageSlider />
      <div data-aos="fade-up">
        <CatSlider />
      </div>
      <div data-aos="zoom-in-up">
        <Cards name={"admin"} />
      </div>
      <div data-aos="zoom-in-up">
        <Cards name={"new"} />
      </div>
    </>
  );
}
