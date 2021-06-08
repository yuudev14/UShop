import React from 'react'

const HomeProductList = () => {
    return (
        <div className='forYou'>
            <h1>For You</h1>
            <div className='productContainer'>
                <div className='product'>
                    <div className='prev-img'>
                        <img src='https://res.cloudinary.com/yutakaki/image/upload/v1622623223/blog/fpuxomywjeblrydmbtdz.jpg' />
                    </div>
                    <div className='productInfo'>
                        <h3>product Name</h3>
                        <div className='priceNstock'>
                            <p className='price'>price: $8.00</p>
                            <p className='stock'>Stock: 900</p>

                        </div>
                    </div>
                </div>

                <div className='product'>
                    <div className='prev-img'>
                        <img src='https://res.cloudinary.com/yutakaki/image/upload/v1622623223/blog/fpuxomywjeblrydmbtdz.jpg' />
                    </div>
                    <div className='productInfo'>
                        <h3>product Name</h3>
                        <div className='priceNstock'>
                            <p className='price'>price: $8.00</p>
                            <p className='stock'>Stock: 900</p>

                        </div>
                    </div>
                </div>

                <div className='product'>
                    <div className='prev-img'>
                        <img src='https://res.cloudinary.com/yutakaki/image/upload/v1622623223/blog/fpuxomywjeblrydmbtdz.jpg' />
                    </div>
                    <div className='productInfo'>
                        <h3>product Name</h3>
                        <div className='priceNstock'>
                            <p className='price'>price: $8.00</p>
                            <p className='stock'>Stock: 900</p>

                        </div>
                    </div>
                </div>
            </div>     
        </div>
    )
}

export default HomeProductList
