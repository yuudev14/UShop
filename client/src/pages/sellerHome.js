import React from 'react'
import Todos from '../components/sellerHome/todos';
import '../styles/sellerPage/sellerHome.scss';
import BusinessInsights from '../components/sellerHome/businessInsights';


const SellerHome = () => {

    return (
        <div className='sellerHome'>
            <Todos />
            <BusinessInsights />
      
        </div>
    )
}

export default SellerHome
