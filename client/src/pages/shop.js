import React, {useRef, useEffect, useState} from 'react';
import '../styles/buyPage/shop.scss';
import HomeProductList from '../components/home/homeProductList';
import { connect } from 'react-redux';
import { getShopProductsAction, resetProductListAction } from '../reduxStore/actions/ushopAction';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Shop = (props) => {
    const {
        resetProductListDispatch,
        getShopProductsDispatch,
        auth

    } = props;

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
            console.log(shopDetails.data)
            setShopDetails(shopDetails.data);
        })()
        getShopProductsDispatch('popular', shop_name);

        return() => {
            resetProductListDispatch()

        }
    }, []);

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
                        <p className='value'>{shopDetails.date}</p>
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

const mapStateToProps = state => {
    return {
        auth : state.auth
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getShopProductsDispatch : (filter, shop_name) => dispatch(getShopProductsAction(filter, shop_name)),
        resetProductListDispatch : () => dispatch(resetProductListAction())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Shop)
