import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';

const FollowedShops = () => {

    const [followedShops, setFollowedShops] = useState([]);

    useEffect(() => {
        (async() => {
            try {
                const followedShops = await axios.get('/profile/followed-shops',{headers : {token : JSON.parse(localStorage.getItem('UShop')).token}});
                setFollowedShops(followedShops.data);
                
            } catch (error) {
                console.log(error); 
            }

        })()
    }, [])


    return (
        <div className='followedShops'>
            <div className='buyerProfileOrderHeader profileHeaders'>
                <h1>Followed Shops</h1>
                <p>View All</p>
            </div>
            <div className='shopsLists'>
                {followedShops.map(shop => (
                    <Link to={`/shop/${shop.shop_name}`}className='shop'>
                        <div className='shop_logo'>
                            <img src={shop.logo} />
                        </div>
                        <h2>{shop.shop_name}</h2>
                    </Link>

                ))}
                
            </div>

        </div>
    )
}

export default FollowedShops
