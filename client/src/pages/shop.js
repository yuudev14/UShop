import React, {useRef, useEffect} from 'react';
import '../styles/buyPage/shop.scss';
import HomeProductList from '../components/home/homeProductList';
import { connect } from 'react-redux';
import { getShopProductsAction, resetProductListAction } from '../reduxStore/actions/ushopAction';
import { useParams } from 'react-router-dom';

const Shop = (props) => {
    const {
        resetProductListDispatch,
        getShopProductsDispatch

    } = props;
    const shopAndImage = useRef();
    const {shop_name} = useParams();

    useEffect(() => {
        shopAndImage.current.style = `
        background : url(${'https://res.cloudinary.com/yutakaki/image/upload/v1623512442/blog/tk9wlaqmiorxjuw4rjrm.jpg'}) no-repeat center center;
        background-size : cover;
        opacity: 0.5

        `
        getShopProductsDispatch('popular', shop_name)

        return() => {
            resetProductListDispatch()

        }
    }, [])
    return (
        <div className='shop'>
            
            <div className='product_shop'>
                <div className='shopNameAndImg' >
                    <div className='background' ref={shopAndImage}>

                    </div>
                    
                    
                    <div className='shopName'>
                        
                        <img src='https://res.cloudinary.com/yutakaki/image/upload/v1623512442/blog/tk9wlaqmiorxjuw4rjrm.jpg' />
                        <h3>isicjcisud</h3>
                    </div>
                    <button>Follow</button>

                </div>
                <div className='shopInfoSummary'>
                    <div className='info'>
                        <p>products</p>
                        <p className='value'>197</p>
                    </div>
                    <div className='info'>
                        <p>followers</p>
                        <p className='value'>197</p>
                    </div>
                    <div className='info'>
                        <p>Rating</p>
                        <p className='value'>197</p>
                    </div>
                    <div className='info'>
                        <p>joined</p>
                        <p className='value'>197</p>
                    </div>

                </div>
            </div>
            <div className='aboutShop'>
                <h3>About Shop</h3>
                <p>Occaecat ipsum laboris do pariatur eiusmod minim in do minim ex veniam reprehenderit. Nulla quis est laborum occaecat velit laborum. Eu aliquip duis exercitation elit consequat ea adipisicing.</p>

            </div>
            <h1>Products</h1>
            <HomeProductList />
            
            
            
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        getShopProductsDispatch : (filter, shop_name) => dispatch(getShopProductsAction(filter, shop_name)),
        resetProductListDispatch : () => dispatch(resetProductListAction())
    }
}

export default connect(null, mapDispatchToProps)(Shop)
