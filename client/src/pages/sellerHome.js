import React from 'react'
import '../styles/sellerPage/sellerHome.scss';

const SellerHome = () => {
    return (
        <div className='sellerHome'>
            <div className='todos'>
                <h2>Todos</h2>
                <div className='todoPanel'>
                    <div className='panel'>
                        <p>0</p>
                        <h4>Pending Orders</h4>
                    </div>

                    <div className='panel'>
                        <p>0</p>
                        <h4>Sold Out products</h4>
                    </div>

                </div>

            </div>
            <div className='businessInsights'>
                <h2>Business Insights</h2>
                <div className='businessInfo'>
                    <div className='panel'>
                        <p>0</p>
                        <h4>Orders</h4>
                    </div>

                    <div className='panel'>
                        <p>0</p>
                        <h4>Products</h4>
                    </div>

                    <div className='panel'>
                        <p>0</p>
                        <h4>views</h4>
                    </div>

                    <div className='panel'>
                        <p>0</p>
                        <h4>folowers</h4>
                    </div>

                    <div className='panel'>
                        <p>0</p>
                        <h4>rating</h4>
                    </div>

                </div>

            </div>
            
            
        </div>
    )
}

export default SellerHome
