const db = require('../../db');
const cloudinary = require('../../utils/cloudinarySetup');

const addProducts = (req, res) => {
        let {
            productName,
            category,
            price,
            images,
            status,
            description,
            stock
        } = req.body;
        if(images.length > 0){
            images.forEach(async(img, i) => {
                const uploadResponse = await cloudinary.uploader.upload(img, {
                    upload_preset : 'dtylx85a'
                });

                images[i] = uploadResponse.secure_url;
                if(i === images.length - 1){
                    try {
                        const addProductQuery = await db.query(
                            `INSERT INTO products
                            (
                                user_id,
                                product_name,
                                category,
                                price,
                                images,
                                status,
                                description,
                                stock
                            )
                            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) `,
                            [
                                req.user,
                                productName,
                                category,
                                Number(price),
                                images,
                                status,
                                description,
                                stock
                            ]
                        )
                        res.send(true);
                    }catch (error) {
                        console.log(error);
                        
                    }
                
                    
                }
            })
        }
        
}

module.exports = {
    addProducts,
}