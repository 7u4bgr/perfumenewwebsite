import React, { useMemo, useState } from "react";
import styles from "./index.module.css";
import Collections from "../../assets/images/collections.webp";
import { Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import Wrapper from '../UI/wrapper'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ShaghafCollection from '../../assets/images/SHAGHAF_COLLECTION.webp.png'
import LoveCollection from '../../assets/images/LOVE_COLLECTION.webp.png'
import HeritageCollection from '../../assets/images/HERITAGE_COLLECTION.webp.png'
import { useTranslation } from "react-i18next";

const CollectionsPerfume = () => {
  
  const data=useMemo(()=>[
    {
      image: `${Collections}`,
    },
    {
      image: `${ShaghafCollection}`,
    },
    {
      image: `${LoveCollection}`,
    },
    {
      image: `${HeritageCollection}`,
    },
    {
      image: `${Collections}`,
    },
    {
      image: `${Collections}`,
    },
    {
      image: `${Collections}`,
    },
  ],[])
  const {t}=useTranslation()
  return (
    <Wrapper>

    <div className={styles.background}>
      <div className={styles.headers}>
        <h2>{t("discover")}</h2>
      </div>
      <div className={styles.boxs}>
      <Swiper
      modules={[ Pagination]} 
      className={styles.price}
      spaceBetween={50}
      slidesPerView={3}

      pagination={{ clickable: true }} 
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
          slidesPerView: 4,
        },
      }}
    >
 
          {data.map((item,index) => (
            <SwiperSlide key={index}>
              <div className={styles.border}>
                <img src={item.image} alt="" loading="lazy"/>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      
    </div>
    </Wrapper>

  );
};

export default React.memo(CollectionsPerfume);
