import './Shop.css';
//
import noitem from '../../../Assets/img/noitem.webp';
//
import Product from '../../RepeatComponent/Product';
//
import { useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';
//

const Shop = () => {
    const [productApi, setProductApi] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const result = [...productApi];

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const handleChange = (event) => {
        setSearchValue(event.target.value);
    };

    const debounceChange = useMemo(() => debounce(handleChange, 500), []);

    const getFilterItems = (searchValue, result) => {
        const query = searchValue.replace(/\s+/g, '').toLocaleLowerCase();
        if (!searchValue) {
            return result;
        }
        return result.filter((product) => {
            const productName = product.name
                .replace(/\s+/g, '')
                .toLocaleLowerCase();

            return productName.includes(query);
        });
    };

    const filtered = getFilterItems(searchValue, result);

    useEffect(() => {
        async function getApi() {
            const fetchAPI = await fetch('https://fe21-db.vercel.app/gummi');
            const fetchedAPI = await fetchAPI.json();
            const results = fetchedAPI;
            setProductApi(results);
        }
        getApi();

        return () => {
            debounceChange.cancel();
        };
    }, [debounceChange]);

    return (
        <section className='Shop container'>
            <form
                className='SearchForm'
                action=''
                autoComplete='off'
                onSubmit={handleSubmit}
            >
                <input
                    type='text'
                    name='searchkw'
                    id='searchkw'
                    placeholder="Search by Product's name"
                    required
                    className='SearchInput '
                    onChange={debounceChange}
                />
            </form>
            {productApi.length === 0 && (
                <div className='WaitAPI'>
                    Loading Products... Please Wait A Second
                </div>
            )}
            {searchValue !== '' && (
                <div>
                    {filtered.length} product{filtered.length > 1 && "'s"} found
                </div>
            )}
            {filtered.length !== 0 && searchValue === '' ? (
                <div>{filtered.length} product's available</div>
            ) : null}
            <div className='ProductContainer ShopProductContainer'>
                {filtered.map((product) => (
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
            {filtered.length === 0 && searchValue !== '' && (
                <img
                    src={noitem}
                    alt='NoItemFound'
                    style={{ width: '300px', height: '300px' }}
                />
            )}
        </section>
    );
};

export default Shop;
