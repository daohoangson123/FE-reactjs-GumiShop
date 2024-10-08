import './SliderBanner.css';
//
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
//
import { banner_1, banner_2 } from '../../../../../data/banner';
//
import banner1_1920 from '../../../../../assets/img/HeroBanner1920.webp';
import banner1_1024 from '../../../../../assets/img/HeroBanner1024.webp';
import banner1_425 from '../../../../../assets/img/HeroBanner425.webp';
import banner_2bg from '../../../../../assets/img/HeroBanner1.webp';
import banner3 from '../../../../../assets/img/HeroBanner2.webp';
//
import SliderItem from './SliderItem/SliderItem';
import { useState } from 'react';
//

const SliderBanner = () => {
    const [isBannerLoaded, setIsBannerLoaded] = useState(false);

    return (
        <section className="HeroBanner">
            <div
                style={{
                    opacity: isBannerLoaded ? 1 : 0,
                    transition: '0.3s linear',
                }}
            >
                <OwlCarousel
                    className="owl-theme"
                    responsiveRefreshRate={0}
                    items={1}
                    dots
                    loop
                >
                    <div className="SliderContainer">
                        <div
                            className="BannerContainer BannerContainer_1"
                            title="Drag or swip to see other banner"
                        >
                            <img
                                src={banner1_1920}
                                alt={banner_1.name}
                                srcSet={`${banner1_425} 1024w, ${banner1_1024} 1920w, ${banner1_1920} 2560w`}
                                fetchpriority="high"
                                onLoad={() => setIsBannerLoaded(true)}
                            />
                            <div className="SliderBanner_1">
                                <SliderItem
                                    title={banner_1.title}
                                    name={banner_1.name}
                                    descript={banner_1.des}
                                    btn="SHOP NOW"
                                />
                            </div>
                            <div className="BannerContainer_1-BG"></div>
                        </div>
                    </div>
                    <div className="SliderContainer">
                        <div
                            className="BannerContainer BannerContainer_2"
                            title="Drag or swip to see other banner"
                        >
                            <img src={banner_2bg} alt="" fetchpriority="low" />
                            <div className="SliderBanner_2">
                                <SliderItem
                                    title={banner_2.title}
                                    name={banner_2.name}
                                    descript={banner_2.des}
                                    btn="SHOP NOW"
                                />
                            </div>
                            <div className="BannerContainer_2-BG"></div>
                        </div>
                    </div>
                    <div className="SliderContainer">
                        <div
                            className="BannerContainer BannerContainer_3"
                            title="Drag or swip to see other banner"
                        >
                            <img
                                src={banner3}
                                alt={banner_1.name}
                                fetchpriority="low"
                            />
                            <div className="SliderBanner_3">
                                <SliderItem
                                    title={banner_1.title}
                                    name={banner_1.name}
                                    descript={banner_1.des}
                                    btn="SHOP NOW"
                                />
                            </div>
                        </div>
                    </div>
                </OwlCarousel>
            </div>
        </section>
    );
};

export default SliderBanner;
