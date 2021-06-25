import React, {useState} from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

const ProductDetails = ({productInfo, Option}) => {

    const [preview_img, setPreviewImage] = useState(0);
    console.log(productInfo)

    const location = useLocation();
    console.log(location);
    return (
        <div className='productDetails'>
            <div className='productContainer'>
                <div className='productImages'>
                    <h1>{productInfo.productName}</h1>
                    <div className='preview_img'>
                        <img src={productInfo.images.length > 0 && productInfo.images[preview_img].image_link } />
                    </div>
                    
                    <div className='list_img'>
                        {productInfo.images.map((img, i) => (
                            <img src={img.image_link} onClick={() => setPreviewImage(i)}/>

                        ))}
                    </div>
                    <Option product_id={productInfo.product_id}/>

                </div>
                <div className='productInfo'>
                    <h1>{productInfo.productName}</h1>
                    <div className='subInfo'>
                        <p>sold: <span>{productInfo.sold}</span></p>
                        <p>rating: <span>{productInfo.rating}</span></p>

                    </div>
                    <h3>${productInfo.price}</h3>
                    <p>{productInfo.description}</p>

                </div>
                

            </div>
            {!location.pathname.includes('sell-UShop') && (
                <div className='product_shop'>
                    <div className='shopNameAndImg'>
                        <img src='https://res.cloudinary.com/yutakaki/image/upload/v1623512442/blog/tk9wlaqmiorxjuw4rjrm.jpg' />
                        <div className='shopName'>
                            <h4>{productInfo.shop_name}</h4>
                            <Link to={`/shop/${productInfo.shop_name}`}><button>View Shop</button></Link>
                        </div>

                    </div>
                </div>

            )}
            
            
        </div>
    )
}

export default ProductDetails
