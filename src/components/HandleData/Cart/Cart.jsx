import emptyCart from '../../../assets/img/emptycart.png';
//
import { useDispatch, useSelector } from 'react-redux';
import { myCartSelector } from '../../../redux/Selectors/Selector';
import {
    newDecAmount,
    newIncAmount,
    removeInCart,
} from '../../../redux/Actions/Action';
//
// import { useState } from 'react';
//
import CartLayout from './CartLayout';
//
import ErrorBoundary from '../../Support/Error/ErrorBoundary';

const Cart = () => {
    const dispatch = useDispatch();
    const myCart = useSelector(myCartSelector);
    // eslint-disable-next-line
    // const [quantity, setQuantity] = useState(1);

    const totalItem = myCart.length;

    const totalPrice =
        myCart &&
        myCart.reduce((sum, item) => sum + item.price * item.amount, 0);

    const saving =
        myCart &&
        myCart.reduce(
            (sum, item) => +(sum + item.discount * item.amount).toFixed(2),
            0,
        );

    const handleInc = (product) => {
        dispatch(newIncAmount(product));
    };

    const handleDec = (product) => {
        dispatch(newDecAmount(product));
    };

    function handleSubmit(event) {
        event.preventDefault();
    }

    function handleRemove(product) {
        dispatch(removeInCart(product));
    }

    return (
        <div className='CartPage'>
            <ErrorBoundary>
                <CartLayout
                    myCart={myCart}
                    totalItem={totalItem}
                    totalPrice={totalPrice}
                    saving={saving}
                    // quantity={quantity}
                    // setQuantity={setQuantity}
                    handleInc={handleInc}
                    handleDec={handleDec}
                    handleRemove={handleRemove}
                    handleSubmit={handleSubmit}
                    emptyCart={emptyCart}
                />
            </ErrorBoundary>
        </div>
    );
};

export default Cart;
