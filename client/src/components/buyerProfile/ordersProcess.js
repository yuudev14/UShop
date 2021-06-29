import React from 'react';
import { Link } from 'react-router-dom';

const OrdersProcess = () => {
    return (
        <div className='buyerProfileOrder'>
            <div className='buyerProfileOrderHeader profileHeaders'>
                <h1>Orders</h1>
                <p>View All</p>
            </div>
            
            <ul className='orderProcess'>
                <li>
                    <Link>
                        <i className='fa fa-envelope'></i>
                        <h4>to ship</h4>
                        <p>3</p>
                    </Link>
                </li>
                <li>
                    <Link>
                        <i className='fa fa-truck'></i>
                        <h4>to ship</h4>
                        <p></p>
                    </Link>
                </li>
            </ul>

        </div>
    )
}

export default OrdersProcess
