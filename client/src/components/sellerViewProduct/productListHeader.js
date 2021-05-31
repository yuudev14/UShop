import React from 'react';
import {Link} from 'react-router-dom';

const SellerProductListHeader = () => {
    return (
        <div className='productListHeader'>
            <div className='viewProductsHeader1'>
                <div className='viewTotalProductList'>
                    <h3>47 Products</h3>
                    <h4>47 / 1000</h4>
                </div>
                <div className='viewTotalProductools'>
                    <Link>
                        <button>Add a New Product</button>
                    </Link>

                </div>

            </div>
            <div className='viewProductsHeader2'>
                <ul>
                    <li>price</li>
                    <li>stock</li>
                    <li>top seller</li>
                </ul>

            </div>
        </div>
    )
}

export default SellerProductListHeader
