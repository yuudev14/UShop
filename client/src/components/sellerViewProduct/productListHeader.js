import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'
import axios from 'axios';

const SellerProductListHeader = (props) => {

    const {
        sellerProducts
    } = props;

    const [sellerTotalProducts, setSellerTotalProducts] = useState(null);

    const requestTotalProduct = async() => {
        try {
            const data = await axios.get('/sell-ushop/total-products', {headers : {token : JSON.parse(localStorage.getItem('UShop')).token}})
            setSellerTotalProducts(data.data);
            
        } catch (error) {
            console.log(error);
            
        }
        

    }

    useEffect(() => {
        requestTotalProduct();
    }, [])


    return (
        <div className='productListHeader'>
            <div className='viewProductsHeader1'>
                <div className='viewTotalProductList'>
                    <h3>{sellerProducts.length} Products</h3>
                    <h4>{sellerProducts.length} / {sellerTotalProducts}</h4>
                </div>
                <div className='viewTotalProductools'>
                    <Link>
                        <button>Add a New Product</button>
                    </Link>

                </div>

            </div>
            <div className='viewProductsHeader2'>
                <ul>
                    <li>price</li>
                    <li>stock</li>
                    <li>top seller</li>
                </ul>

            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        sellerProducts : state.sellerProducts
    }
}

export default connect(mapStateToProps)
                (SellerProductListHeader)
