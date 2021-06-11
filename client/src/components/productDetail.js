import React, {useState} from 'react';

const ProductDetails = ({productInfo, Option}) => {

    const [preview_img, setPreviewImage] = useState(0);
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
                    <Option product_id={productInfo.product_id}/>

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

export default ProductDetails
