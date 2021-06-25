import React from 'react'
import Todos from '../components/sellerHome/todos';
import '../styles/sellerPage/sellerHome.scss';


const SellerHome = () => {
    



    return (
        <div className='sellerHome'>
            <Todos />
            
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
