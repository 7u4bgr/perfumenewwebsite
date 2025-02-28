import React, { useMemo, useState } from "react";
import styles from "./index.module.css";
import Wrapper from "../UI/wrapper";
import BannerBackground from "../../assets/images/backgroundswiper.png";
import Banner from "../../assets/images/backgroundswiper1.png";
import Banner2 from "../../assets/images/backgroundswiper2.png";
import { Autoplay, Navigation } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { Link } from "react-router-dom";
const Hero = React.memo(() => {
  const data = useMemo(
    () => [
      { image: `${BannerBackground}` },
      { image: `${Banner}` },
      { image: `${Banner2}` },
    ],
    []
  );
  return (
    <div className={styles.background}>
      <Wrapper>
        <div className={styles.boxs}>
          <Swiper
            modules={[Autoplay]}
            className={styles.price}
            spaceBetween={50}
            slidesPerView={3}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
            breakpoints={{
              0: {
                spaceBetween: 24,
                slidesPerView: 1,
              },
              768: {
                spaceBetween: 24,
                slidesPerView: 1,
              },
              992: {
                spaceBetween: 50,
                slidesPerView: 1,
              },
            }}
          >
            {data.map((item) => (
              <SwiperSlide>
                <Link className={styles.border}>
                  <img src={item.image} alt="" loading="lazy" />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Wrapper>
    </div>
  );
});

export default Hero;
