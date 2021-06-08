import React, {useEffect} from 'react';

const MostPopular = () => {
    return (
        <div className='mostPopular previewContainer'>
            <h1>Most Popular</h1>
            <div className='productList'>
                <div className='product'>
                    <div className='productImg'>
                        <img src='https://res.cloudinary.com/yutakaki/image/upload/v1622623223/blog/fpuxomywjeblrydmbtdz.jpg' />
                    </div>
                    <h3>product name</h3>
                </div>
            </div>
        </div>
    )
}

export default MostPopular
