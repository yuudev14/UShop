import axios from 'axios';
import React, {useEffect, useState }from 'react';

const BusinessInsights = () => {
    const [businessInsights, setBusinessInsights] = useState({
        orders : '0',
        products : '0',
        views : '0',
        followers: '0',
        rating: '0'
    })

    useEffect(() => {
        (async() => {
                try {
                    const insightsData = await axios.get('/sell-ushop/business-insights', {headers : {token : JSON.parse(localStorage.getItem('UShop')).token}});
                    setBusinessInsights({
                        ...businessInsights,
                        ...insightsData.data
                    });
                    
                } catch (error) {
                    console.log(error)
                    
                }

        })()
    }, [])
    return (
        <div className='businessInsights'>
            <h2>Business Insights</h2>
            <div className='businessInfo'>
                <div className='panel'>
                    <p>{businessInsights.orders}</p>
                    <h4>Orders</h4>
                </div>

                <div className='panel'>
                    <p>{businessInsights.products}</p>
                    <h4>Products</h4>
                </div>

                <div className='panel'>
                    <p>{businessInsights.views}</p>
                    <h4>views</h4>
                </div>

                <div className='panel'>
                    <p>{businessInsights.followers}</p>
                    <h4>folowers</h4>
                </div>

                <div className='panel'>
                    <p>{businessInsights.rating}</p>
                    <h4>rating</h4>
                </div>

            </div>

        </div>
    )
}

export default BusinessInsights
