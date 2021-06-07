import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams, useHistory, Link} from 'react-router-dom';

const SellerProductDetails = () => {

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

    const [preview_img, setPreviewImage] = useState(0);


    const getProductInfo = async() => {
        const productDetails = await axios.get(`/sell-ushop/getProduct/${product_id}`,{headers : {token : JSON.parse(localStorage.getItem('UShop')).token}});
        const data = productDetails.data;
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
    }
    useEffect(() => {
        getProductInfo();
    }, []);

    const deleteProduct = async() => {
        try {
            const requestDeleteProduct = await axios.delete(`/sell-ushop/delete-product/${product_id}`, {headers : {token : JSON.parse(localStorage.getItem('UShop')).token}});
            if(requestDeleteProduct.data === true){
                history.push('/sell-UShop/view-product'); 
            }
        } catch (error) {
            console.log(error);
            
        }
        
    }


    return (
        <div className='productDetails'>
            <div className='productContainer'>
                <div className='productImages'>
                    <h1>{productInfo.productName}</h1>
                    <div className='preview_img'>
                        <img src={productInfo.images[preview_img]} />
                    </div>
                    
                    <div className='list_img'>
                        {productInfo.images.map((img, i) => (
                            <img src={img} onClick={() => setPreviewImage(i)}/>

                        ))}

                    </div>
                    <Link to={`/sell-UShop/manage-product/${product_id}`}><button className='fa fa-edit'></button></Link>
                    <button onClick={deleteProduct} className='fa fa-trash'></button>

                </div>
                <div className='productInfo'>
                    <h1>{productInfo.productName}</h1>
                    <div className='subInfo'>
                        <p>sold: <span>19</span></p>
                        <p>rating: <span>4.5</span></p>

                    </div>
                    <h3>${productInfo.price}</h3>
                    <p>{productInfo.description}</p>

                </div>

            </div>
            
        </div>
    )
}

export default SellerProductDetails
