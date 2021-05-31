import React from 'react'

const SellerProduct = () => {
    return (
        <div className='productContainer'>
            <div className='prev-img'>

            </div>
            <div className='productInfo'>
                <h3>Intel 1 core</h3>
                <div className='priceNstock'>
                    <p className='price'>$100</p>
                    <p className='stock'>Stock: 100</p>

                </div>
                <div className='viewHeartSales'>
                    <i className='fa fa-eye'> 0</i>
                    <i className='fa fa-heart'> 0</i>
                    <p> Sales 0</p>

                </div>

            </div>
            <div className='productOption'>
                <button className='fa fa-edit'></button>
                <div></div>
                <button className='fa fa-ellipsis-h'></button>

            </div>

        </div>
    )
}

export default SellerProduct
