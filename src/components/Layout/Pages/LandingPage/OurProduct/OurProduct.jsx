import './OurProduct.css';
//
import { useEffect, useState } from 'react';
//
import { fetchProductApi } from '../../../../../data/axiosAPI/productData';
//
import SectionTitle from '../../../UI/SectionTitle/SectionTitle';
import Product from '../../../UI/Product/Product';
import ProductSkeleton from '../../../UI/Skeleton/ProductSkeleton';
import animationCheck from '../../../../../data/animationCheck';
//

const OurProduct = ({ title }) => {
    const [productApi, setProductApi] = useState([]);
    const [load, setLoad] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadmore = () => {
        if (load.length < productApi.length) {
            setLoad(productApi);
        } else {
            setLoad(productApi.slice(0, Math.ceil(productApi.length / 2)));
        }
    };

    const getProducts = async () => {
        let result = await fetchProductApi();

        if (result) {
            setProductApi(result);
            setLoad(result.slice(0, Math.ceil(result.length / 2)));
        }
    };

    useEffect(() => {
        const sectCheck = document.querySelectorAll('.OurProduct');

        let observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    getProducts();
                    observer.unobserve(entry.target);
                }
            });
        });

        sectCheck.forEach((item) => {
            observer.observe(item);
        });

        setTimeout(() => {
            setIsLoading(false);
        }, 5000);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        animationCheck(
            '.OurProduct * .ProductItem',
            'animated-zoom-in',
            '0px',
            0.6
        );
    }, [productApi, load]);

    return (
        <section className="OurProduct Container">
            <SectionTitle content={title} />
            <div className="ProductContainer">
                {load.length === 0 ? (
                    <ProductSkeleton />
                ) : (
                    load.map((product, index) => (
                        <div
                            className="ProductItem"
                            key={product._id}
                            style={{
                                animationDelay: `${
                                    index < 4 ? index * 0.1 : (index - 4) * 0.1
                                }s`,
                            }}
                        >
                            <Product
                                id={product._id}
                                url={product.img}
                                name={product.name}
                                sale={product.sale}
                                prices={product.discouter}
                                saleprices={product.price}
                                style={{
                                    fontSize: '14px',
                                    lineHeight: '20px',
                                }}
                            />
                        </div>
                    ))
                )}
            </div>
            {load.length !== 0 && (
                <button
                    className="LoadMore"
                    onClick={loadmore}
                    disabled={isLoading}
                >
                    {isLoading
                        ? 'Loading'
                        : !isLoading && load.length === 4
                          ? 'VIEW ALL PRODUCTS'
                          : 'VIEW LESS PRODUCTS'}
                </button>
            )}
        </section>
    );
};

export default OurProduct;
