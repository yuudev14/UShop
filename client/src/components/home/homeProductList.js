import React, {useState, useEffect, useRef} from 'react'
import {connect} from 'react-redux';
import {Link, useParams, useLocation} from 'react-router-dom';
import { getShopProductsAction, getUsersFollowProductsAction, getUshopProductListAction, seeMoreShopProductsAction, seeMoreUsersFollowProductsAction, seeMoreUshopProductListAction} from '../../reduxStore/actions/ushopAction';

const HomeProductList = (props) => {
    const {
        productLists,
        getUshopProductsDispatch,
        getShopProductsDispatch,
        getUsersFollowProductsDispatch,
        seeMoreUsersFollowProductsDispatch,
        seeMoreUShopProductsDispatch,
        seeMoreShopsProductDispatch,
    } = props;

    const [filterState, setFilterState] = useState('popular');
    const filterList = useRef();
    const {shop_name} = useParams();
    const location = useLocation();


    const seeMoreProducts = () => {
        if(shop_name){
            seeMoreShopsProductDispatch(filterState, shop_name, productLists.length)

        }else if(location.pathname === "/profile"){
            seeMoreUsersFollowProductsDispatch(filterState, productLists.length)

        }else{
            seeMoreUShopProductsDispatch(productLists.length, filterState);

        }
        

    }

    const setFilterStateMethod = (e) => {
        if(e.target.id !== filterState){
            setFilterState(e.target.id);
            if(shop_name){
                getShopProductsDispatch(e.target.id, shop_name);

            }else if(location.pathname === "/profile"){
                getUsersFollowProductsDispatch(e.target.id);

            }else{
                getUshopProductsDispatch(productLists.length, e.target.id);
            }
        }
        
    }

    useEffect(() => {
        [...filterList.current.children].forEach(li => {
            if(li.id === filterState){
                li.classList.add('active');
            }else{
                li.classList.remove('active');
            }
        })
        

    }, [filterState])

    return (
        <div className='forYou'>
            <div className='filter'>
                <h4>Sort by</h4>
                <ul ref={filterList}>
                    <li onClick={setFilterStateMethod} className='active' id='popular'>Popular</li>
                    <li onClick={setFilterStateMethod} id='latest'>Latest</li>
                    <li onClick={setFilterStateMethod} id='top-sales'>Top Sales</li>
                </ul>

            </div>
            
            <div className='productContainer'>
                {productLists.map(prod => (
                    <Link className='product' to={`/product/${prod.product_id}`}>
                        <div className='prev-img'>
                            <img src={prod.images} />
                        </div>
                        <div className='productInfo'>
                            <h3>{prod.product_name}</h3>
                            <div className='priceNstock'>
                                <p className='price'>price: ${prod.price}</p>
                                <p className='stock'>Sold: {prod.sold}</p>

                            </div>
                        </div>
                    </Link>

                ))}
                
                
            </div>
            <button onClick={seeMoreProducts}>see more</button>
            
        </div>
    )
}

const mapStateToProps = state => {
    return {
        productLists : state.ushopProductLists
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUshopProductsDispatch : (start, filter) => dispatch(getUshopProductListAction(start, filter)),
        getShopProductsDispatch : (filter, shop_name) => dispatch(getShopProductsAction(filter, shop_name)),
        getUsersFollowProductsDispatch : (filter) => dispatch(getUsersFollowProductsAction(filter)),
        seeMoreUsersFollowProductsDispatch : (filter, start) => dispatch(seeMoreUsersFollowProductsAction(filter, start)),
        seeMoreUShopProductsDispatch : (start, filter) => dispatch(seeMoreUshopProductListAction(start, filter)),
        seeMoreShopsProductDispatch : (filter, shop_name, start) => dispatch(seeMoreShopProductsAction(filter, shop_name, start))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)
                (HomeProductList)
