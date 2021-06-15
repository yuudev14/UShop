import React from 'react'

const OrderForm = ({cartProducts}) => {

    const itemsChecked = cartProducts.filter(prod => prod.checked);
    const total = itemsChecked.reduce((total, current) => {
        return total + current.totalPrice
    }, 0)
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
            <button>Proceed to checkout</button>
        </div>
    )
}

export default OrderForm
