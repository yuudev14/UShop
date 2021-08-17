import React from 'react';
import { Link } from 'react-router-dom';

const Orders = ({data}) => {
    return (
        <div className='order'>
            <div className='orderHeader'>
                <p>Date: {new Date(data.date).toLocaleDateString()}</p>
                <p>Order number: {data.order_number}</p>
            </div>
            {data.productOrders.map(prod => (
                <div className='orderProducts'>
                    <div className='product'>
                        <Link to={`/product/${prod.product_id}`}>
                            <img src={prod.images}/>
                        </Link>
                        
                        <div className='productOrderInfo'>
                            <h4>{prod.product_name}</h4>
                            <p>Shop: {prod.shop_name}</p>
                            <p>item: {prod.item}</p>
                            <p>price : ¥{prod.price}</p>
                        </div>
                    </div>
                </div>

            ))}

            


        </div>
    )
}

export default Orders
