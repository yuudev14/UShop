import React, {useRef, useEffect, useState} from 'react';
import '../styles/buyPage/shop.scss';
import HomeProductList from '../components/home/homeProductList';
import { useDispatch, useSelector } from 'react-redux';
import { getShopProductsAction, resetProductListAction } from '../reduxStore/actions/ushopAction';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Shop = () => {

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [shopDetails, setShopDetails] = useState({});
    const shopAndImage = useRef();
    const {shop_name} = useParams();

    useEffect(() => {
        shopAndImage.current.style = `
        background : url(${shopDetails.logo}) no-repeat center center;
        background-size : cover;
        opacity: 0.5
        `;
        (async() => {
            const shopDetails = await axios.get(`/ushop/get-shop-info/${shop_name}`, {headers : {token : JSON.parse(localStorage.getItem('UShop')).token}});
            setShopDetails(shopDetails.data);
        })()
        dispatch(getShopProductsAction('popular', shop_name));

        return() => {
            dispatch(resetProductListAction())
            

        }
    }, []);

    useEffect(() => {
        shopAndImage.current.style = `
        background : url(${shopDetails.logo}) no-repeat center center;
        background-size : cover;
        opacity: 0.5
        `;
    }, [shopDetails]);

    const follow_unfollow = async() => {
        try {
            const follow = await axios.post(`/ushop/follow/${shopDetails.shop_id}`,{}, {headers : {token : JSON.parse(localStorage.getItem('UShop')).token}});
            setShopDetails({
                ...shopDetails,
                follows : follow.data
            })
            
        } catch (error) {
            console.log(error.response);    
        }
    }
    return (
        <div className='shop'>
            
            <div className='product_shop'>
                <div className='shopNameAndImg' >
                    <div className='background' ref={shopAndImage}>

                    </div>     
                    <div className='shopName'>    
                        <img src={shopDetails.logo} />
                        <h3>{shopDetails.shop_name}</h3>
                    </div>
                    {auth.isAuth === true && (
                        <button onClick={follow_unfollow}>{!shopDetails.follows ? 'Follow' : 'Unfollow'}</button>
                    )}
                </div>
                <div className='shopInfoSummary'>
                    <div className='info'>
                        <p>products</p>
                        <p className='value'>{shopDetails.products}</p>
                    </div>
                    <div className='info'>
                        <p>followers</p>
                        <p className='value'>{shopDetails.followers}</p>
                    </div>
                    <div className='info'>
                        <p>Email</p>
                        <p className='value'>{shopDetails.email}</p>
                    </div>
                    <div className='info'>
                        <p>joined</p>
                        <p className='value'>{new Date(shopDetails.date).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
            
            <div className='aboutShop'>
                <h3>About Shop</h3>
                <p>{shopDetails.about}</p>

            </div>
            <h1>Products</h1>
            <HomeProductList />
        </div>
    )
}

export default Shop;
