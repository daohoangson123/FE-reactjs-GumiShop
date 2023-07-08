import emptyCart from '../../../assets/img/emptycart.png';
//
import { useDispatch, useSelector } from 'react-redux';
import {
    myCartSelector,
    signinSelector,
} from '../../../redux/Selectors/Selector';
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
//
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
    const dispatch = useDispatch();
    const myCart = useSelector(myCartSelector);
    const isSignIn = useSelector(signinSelector);
    // eslint-disable-next-line
    // const [quantity, setQuantity] = useState(1);

    const purchasedNotify = () =>
        toast.success(`Your purchase was successful`, {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });

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
        isSignIn && purchasedNotify();
    }

    function handleRemove(product) {
        dispatch(removeInCart(product));
    }

    return (
        <div className='CartPage'>
            <ErrorBoundary>
                <CartLayout
                    myCart={myCart}
                    isSignIn={isSignIn}
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
