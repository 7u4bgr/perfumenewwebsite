import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import DB from "../../db.json";
import brands from "../../brends.json";
import RUD from "../../rudb.json";
import RUDBRANDS from "../../rubrend.json";
import { Link } from "react-router-dom";
import Wrapper from "../../components/UI/wrapper";
import Azzaro from "../../assets/images/ajmal.jpg";
import useIntersectionObserver from "../home/useIntersectionObserver";
import { useTranslation } from "react-i18next";

const BrendLogo = () => {
  const [brandsData, setBrandsData] = useState({});
  const [products, setProducts] = useState([]);
  const [uniqueBrands, setUniqueBrands] = useState([]);
  const [groupedBrands, setGroupedBrands] = useState({});
  const [brandKeys, setBrandKeys] = useState({});
  const [brandDetails, setBrandDetails] = useState({});
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  // Dil seçimine göre verileri seçme
  useEffect(() => {
    const products1 = DB;
    const brandsData1 = language === "ru" ? RUDBRANDS : brands;
    setBrandsData(brandsData1);
    setProducts(products1);
  }, [language]);

  // Benzersiz markaları elde etme
  useEffect(() => {
    if (products.length > 0) {
      const uniqueBrandsList = [...new Set(products.map((product) => product.brands))].sort();
      setUniqueBrands(uniqueBrandsList);
    }
  }, [products]);

  // Markaları baş harflerine göre gruplama ve brandKey ile brandData'yı ayarlama
  useEffect(() => {
    if (uniqueBrands.length > 0) {
      const groupedBrandsData = uniqueBrands.reduce((acc, brand) => {
        const firstLetter = brand.charAt(0).toUpperCase();
        if (!acc[firstLetter]) {
          acc[firstLetter] = [];
        }
        acc[firstLetter].push(brand);
        return acc;
      }, {});
      setGroupedBrands(groupedBrandsData);

      // brandKeys ve brandDetails state'lerini ayarlama
      const keys = {};
      const details = {};
      uniqueBrands.forEach((brand) => {
        const brandKey = brand.replace(/\s+/g, "").toLowerCase();
        keys[brand] = brandKey;
        details[brandKey] = brandsData[brandKey];
      });
      setBrandKeys(keys);
      setBrandDetails(details);
    }
  }, [uniqueBrands, brandsData]);

  const [observe, unobserve, entries] = useIntersectionObserver({
    threshold: 0.1,
  });

  const sections = useRef([]);

  useEffect(() => {
    sections.current.forEach((section) => {
      observe(section);
    });

    return () => {
      sections.current.forEach((section) => {
        unobserve(section);
      });
    };
  }, [observe, unobserve]);

  return (
    <Wrapper>
      <div className={styles.background}>
        <div className={styles.headers}>
          <div className={styles.hr}>
            <hr />
          </div>
          <div className={styles.headersh2}>
            <h2>{t("allbrends")}</h2>
          </div>
          <div className={styles.hr}>
            <hr />
          </div>
        </div>

        {Object.keys(groupedBrands).map((letter, index) => (
          <div
            ref={(el) => (sections.current[index] = el)}
            className={`${styles.control} ${styles.hidden} ${
              entries[index]?.isIntersecting ? styles.visible : ""
            }`}
            key={index}
          >
            <div className={styles.brendheaders}>
              <hr />
              <h2>{letter}</h2>
              <hr />
            </div>
            <div className={styles.controlbox}>
              {groupedBrands[letter].map((brand, brandIndex) => {
                const brandKey = brandKeys[brand];
                const brandData = brandDetails[brandKey];

                return (
                  <Link
                    to={
                      brandData && brandData.imageurl
                        ? `/brend-perfume/${brandKey}`
                        : "#"
                    }
                    key={brandIndex}
                    className={styles.controlclass}
                  >
                    <div className={styles.border}>
                      {brandData && brandData.imageurl ? (
                        <>
                          <img
                            src={brandData.imageurl}
                            alt={brandData.title || brand}
                            loading="lazy"
                          />
             
                        </>
                      ) : (
                        <img src={Azzaro} alt="Default" />
                      )}
                    </div>
                    <h2>{brandData ? brandData.title : brand}</h2>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default React.memo(BrendLogo);
