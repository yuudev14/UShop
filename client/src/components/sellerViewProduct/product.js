import React from 'react'

const SellerProduct = (props) => {
    const {
        data
    } = props;
    console.log(data)

    return (
        <div className='productContainer'>
            <div className='prev-img'>
                <img src={data.images[0]} />
            </div>
            <div className='productInfo'>
                <h3>{data.product_name}</h3>
                <div className='priceNstock'>
                    <p className='price'>price: ${data.price}</p>
                    <p className='stock'>Stock: {data.stock}</p>

                </div>
                <div className='viewHeartSales'>
                    <i className='fa fa-eye'> {data.seen}</i>
                    <i className='fa fa-heart'> {data.heart}</i>
                    <p> Sales 0</p>

                </div>

            </div>
            <div className='productOption'>
                <button className='fa fa-edit'></button>
                <div></div>
                <button className='fa fa-trash'></button>

            </div>

        </div>
    )
}

export default SellerProduct
