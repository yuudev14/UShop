import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams, useHistory, Link} from 'react-router-dom';
import ProductDetails from '../components/productDetail';
import BuyerProductDetailOptions from '../components/buyerProductDetailOptions';
import '../styles/buyPage/buyerProductDetail.scss';

const BuyerProductDetails = () => {

    const [productInfo, setProductInfo] = useState({
        product_id : '',
        productName : '',
        category : '',
        price : null,
        images : [],
        description : '',
        stock : null,
    });

    const {product_id} = useParams();
    const history = useHistory();

    


    const getProductInfo = async() => {
        try {
            const productDetails = await axios.get(`/ushop/get-product-info/${product_id}`);
            const data = productDetails.data;
            console.log(data);
            setProductInfo({
                ...productInfo,
                category: data.category,
                description: data.description,
                images: data.images,
                sampleImages: data.images,
                price: data.price,
                productName: data.product_name,
                seen: data.seen,
                stock: data.stock,
            });
            
        } catch (error) {
            console.log(error.response);
            history.push('/');
            
        }
        
    }
    useEffect(() => {
        getProductInfo();
    }, []);

    return (
        <>
            <ProductDetails productInfo={productInfo} Option={BuyerProductDetailOptions}/>
        </>
    )
}

export default BuyerProductDetails
