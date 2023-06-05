import './ShopAll.css';
//
import Loading from '../../../UI/Loading/Loading';
import Product from '../../../UI/Product/Product';
import SectionTitle from '../../../UI/SectionTitle/SectionTitle';
//
import { fetchProductApi } from '../../../../../data/axiosAPI/productData';
//
import { useEffect, useState } from 'react';
//

const ShopAll = ({ title }) => {
    const [productApi, setProductApi] = useState([]);

    const [loadMore, setLoadMore] = useState(0);

    let productLength = productApi.length;

    const getProducts = async () => {
        let result = await fetchProductApi();

        if (result) {
            setProductApi(result);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <section className='ShopAll Container'>
            <SectionTitle content={title} />
            {productLength === 0 ? (
                <Loading />
            ) : (
                <>
                    <div className='ProductContainer'>
                        {productApi
                            .toSpliced(
                                productLength / 2 + loadMore,
                                productLength,
                            )
                            .map((product) => (
                                <div
                                    className='ProductItem'
                                    key={product._id}
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
                            ))}
                    </div>
                    <div
                        className='LoadMore'
                        onClick={() => {
                            if (loadMore < productLength / 2) {
                                setLoadMore((pre) => pre + 1);
                            } else {
                                setLoadMore(0);
                            }
                        }}
                    >
                        {loadMore < productLength / 2
                            ? 'SHOW MORE'
                            : 'SHOW LESS'}
                    </div>
                </>
            )}
        </section>
    );
};

export default ShopAll;
