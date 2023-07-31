import './Wholesale.css';
//
import { useEffect, useState } from 'react';
//
import { fetchHektoApi } from '../../../../data/axiosAPI/hektoData';
import { fetchFurnitureApi } from '../../../../data/axiosAPI/furnitureData';
import noItem from '../../../../assets/img/noitem.webp';
//
import WholesaleProduct from '../../UI/WholesaleProduct/WholesaleProduct';
import ProductSkeleton from '../../UI/Skeleton/ProductSkeleton';
import WholesaleFilter from './ToggleFilter';
import SectionTitle from '../../UI/SectionTitle/SectionTitle';
import { fetchProductApi } from '../../../../data/axiosAPI/productData';
//

const WholesaleLayout = ({ title, productApi }) => {
    const [curCategory, setCurCategory] = useState('All');
    const [curBrand, setCurBrand] = useState('All');
    //lọc và trả về tất cả value có key categories
    //check trước xem có key ko để tránh error
    //ép kiểu để đồng nhất data
    const getAllCategories = productApi
        .filter((item) => item.categories)
        .map((item) => {
            if (item.categories) {
                return item.categories.toString().toLowerCase();
            }
            return item.categories.toString().toLowerCase();
        });
    //tạo obj để chứa cộng dồn các key trùng lặp
    //cú pháp obj[key]
    const filteredCategories = {};
    getAllCategories.forEach((item) => {
        if (!filteredCategories[item]) {
            filteredCategories[item] = 1;
        }
    });
    //truy xuất key
    const categoriesList = Object.keys(filteredCategories);
    //sau khi load được data mới đẩy key 'All' vào
    if (productApi.length > 0) {
        categoriesList.unshift('All');
    }
    //tương tự cho key brand
    const getAllBrands = productApi
        .filter((item) => item.brand)
        .map((item) => {
            if (item.brand) {
                return item.brand.toString().toLowerCase();
            }
            return item.brand.toString().toLowerCase();
        });
    const filteredBrands = {};
    getAllBrands.forEach((item) => {
        if (!filteredBrands[item]) {
            filteredBrands[item] = 1;
        }
    });
    const brandsList = Object.keys(filteredBrands);
    if (productApi.length > 0 && brandsList.length > 0) {
        brandsList.unshift('All');
    }
    //

    function getFilterItems(productApi, curCategory, curBrand) {
        const categoryOnly = productApi.filter(
            (product) =>
                product.categories &&
                product.categories.toString().toLowerCase() === curCategory,
        );
        const brandOnly = productApi.filter(
            (product) =>
                product.brand &&
                product.brand.toString().toLowerCase() === curBrand,
        );
        const mutipleFilter = productApi.filter(
            (product) =>
                product.categories &&
                product.categories.toString().toLowerCase() === curCategory &&
                product.brand &&
                product.brand.toString().toLowerCase() === curBrand,
        );
        if (curCategory !== 'All' && curBrand === 'All') {
            return categoryOnly;
        }
        if (curCategory === 'All' && curBrand !== 'All') {
            return brandOnly;
        }
        if (curCategory !== 'All' && curBrand !== 'All') {
            return mutipleFilter;
        }
        return productApi;
    }

    const filtered = getFilterItems(productApi, curCategory, curBrand);

    return (
        <div className='WholesaleLayout'>
            <SectionTitle content={title} />
            {productApi.length > 0 && (
                <WholesaleFilter
                    productApi={productApi}
                    filtered={filtered}
                    categoriesList={categoriesList}
                    brandsList={brandsList}
                    curCategory={curCategory}
                    setCurCategory={setCurCategory}
                    curBrand={curBrand}
                    setCurBrand={setCurBrand}
                />
            )}
            <div className='Wholesale__Product-Container'>
                {filtered.length === 0 &&
                curBrand === 'All' &&
                curCategory === 'All' ? (
                    <>
                        <ProductSkeleton imgWidth={200} />
                        <ProductSkeleton imgWidth={200} />
                    </>
                ) : filtered.length === 0 ? (
                    <img
                        src={noItem}
                        alt='noProduct'
                        className='Wholesale__NoItem'
                    />
                ) : (
                    filtered.map((item) => (
                        <WholesaleProduct
                            key={item._id}
                            props={item}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

const Wholesale = () => {
    const [hektoApi, setHektoApi] = useState([]);
    const [furApi, setFurApi] = useState([]);
    const getWholesaleApi = async () => {
        let result = await fetchHektoApi();
        let result1 = await fetchFurnitureApi();
        let altRes = await fetchProductApi();

        // if (result || result1) {
        //     setHektoApi(result);
        //     setFurApi(result1);
        // }
        if (altRes) {
            setHektoApi(altRes);
            setFurApi(altRes);
        }
    };

    useEffect(() => {
        getWholesaleApi();
    }, []);

    return (
        <div className='Wholesale Container'>
            <WholesaleLayout
                title={'Hekto'}
                productApi={hektoApi}
            />
            <br />
            <WholesaleLayout
                title={'Furniture'}
                productApi={furApi}
            />
        </div>
    );
};

export default Wholesale;
