import React from 'react';
import axios from 'axios';

const OrderForm = ({cartProducts, deleteSomeCart}) => {

    const itemsChecked = cartProducts.filter(prod => prod.checked);
    const total = itemsChecked.reduce((total, current) => {
        return total + current.totalPrice
    }, 0);

    const checkout = async() => {
        try {
            if(itemsChecked.length){
                console.log(itemsChecked);
                const checkoutRequest = await axios.post('/ushop/checkout', itemsChecked, {headers : {token : JSON.parse(localStorage.getItem('UShop')).token}});
                if(checkoutRequest.data === true){
                    
                    const filterCart = cartProducts.filter(prod => !prod.checked)
                                                    .map(prod => prod.product_id);
                    deleteSomeCart(filterCart);
                    
                };
                
            }
            
        } catch (error) {
            console.log(error);
        }
        
    }
    return (
        <div className='orderForm'>
            <h1>Order Summary</h1>
            {itemsChecked.map(prod => (
                <div className='orderInfo'>
                    <h5>{prod.product_name} ({prod.item}) </h5>
                    <p>${prod.totalPrice}</p>
                </div>
            ))}
            
            <div className='orderInfo total'>
                <h5>total ({itemsChecked.length} items)</h5>
                <p>${total}</p>
            </div>
            <button onClick={checkout}>Proceed to checkout</button>
        </div>
    )
}

export default (OrderForm)
