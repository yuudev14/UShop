import React from 'react';

import SellerViewForm from '../components/sellerViewProduct/form';
import SellerProduct from '../components/sellerViewProduct/product';
import SellerProductListHeader from '../components/sellerViewProduct/productListHeader';

const ViewProducts = () => {
    return (
        <div className='viewSellerProducts'>
            <SellerViewForm />
            <div className='productList'>
                <SellerProductListHeader /> 
                <div className='ProductListContainer'>
                    <SellerProduct />
                </div>
            </div>  
        </div>
    )
}

export default ViewProducts
