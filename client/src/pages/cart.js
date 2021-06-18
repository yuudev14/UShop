import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import '../styles/buyPage/cart.scss';
import HomeProductList from '../components/home/homeProductList';
import axios from 'axios';
import CartProduct from '../components/cart/cartProduct';
import OrderForm from '../components/cart/orderForm';
import { setCartAction } from '../reduxStore/actions/cartAction';

const Cart = ({setCartDispatch}) => {

    const [cartProducts, setCartProducts] = useState([]);

    useEffect(()=> {
        (async() => {
            try {
                const products = await axios.post('/ushop/cart-product', {cart : JSON.parse(localStorage.getItem('UShop')).cart});
                const prod = products.data.map(prod => {
                    prod.item = 1;
                    prod.totalPrice = prod.price
                    prod.checked = false
                    return prod
                })
                setCartProducts(prod);
            } catch (error) {
                console.log(error);
            }
        })()

    }, [])

    const setItemsMethod = (id, value) => {
        const updatedProduct = cartProducts.map(prod => {
            if (prod.product_id === id){
                prod.item = value > prod.stock ? prod.stock : value;
                prod.totalPrice = prod.price * value
            }
            return prod;
        });

        setCartProducts(updatedProduct)

    }

    const setSelectedItems = (id, e) => {
        const updatedProduct = cartProducts.map(prod => {
            if (prod.product_id === id){
                prod.checked = e.target.checked
            }
            return prod;
        });
        setCartProducts(updatedProduct);

    }

    const deleteCart = (id) => {
        const ushop = JSON.parse(localStorage.getItem('UShop'));
        ushop.cart = ushop.cart.filter(cart => cart !== id);
        localStorage.setItem('UShop', JSON.stringify(ushop));
        const filterProduct = cartProducts.filter(prod => prod.product_id !== id)
        setCartProducts(filterProduct);
        setCartDispatch()
        

    }

    const deleteSomeCart = (cart) => {
        const ushop = JSON.parse(localStorage.getItem('UShop'));
        const data = {...ushop, cart}
        localStorage.setItem('UShop', JSON.stringify(data));
        const filterProduct = cartProducts.filter(prod => !cart.indexOf(prod.product_id))
        setCartProducts(filterProduct);
        setCartDispatch()

    }

    const checkAllProducts = (e) => {
        const updatedProduct = cartProducts.map(prod => {
            prod.checked = e.target.checked
            return prod;
        });
        setCartProducts(updatedProduct);

    }

    
    return (
        <div className='cart'>
            <div className='cartContainer'>
                <div className='cartList'>
                    <div className='cartHeader'>
                        <label>
                            <input type='checkBox' onChange={checkAllProducts} checked={cartProducts.every(prod => prod.checked)}/>  select all {cartProducts.length} items
                        </label>

                        <button className='fa fa-trash'>Delete</button>
                        

                    </div>
                    <div className='cartProducts'>
                        {cartProducts.map(prod => (
                            <CartProduct data={prod} 
                            method ={
                                {deleteCart,
                                setItemsMethod,
                                setSelectedItems}
                            }
                            deleteCart={deleteCart} setItemsMethod={setItemsMethod} setSelectedItems={setSelectedItems}/>
                        ))}
                    </div>
                </div>
                <OrderForm cartProducts={cartProducts} deleteSomeCart={deleteSomeCart}/>
            </div>
            <HomeProductList />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        productLists : state.ushopProductLists
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setCartDispatch : () => dispatch(setCartAction())
    }
}
export default  connect(mapStateToProps, mapDispatchToProps)(Cart)
