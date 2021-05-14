const db = require('../../db');
const bcrypt = require('bcrypt');
const generateToken = require('../../utils/generateToken');

const verifySeller = (req, res) => {
    res.send(true);
}

const register = async(req, res) => {
    
        const {
            firstName,
            lastName,
            shopName,
            phoneNumber,
            email,
            password,
            shop_category
        } = req.body;

        bcrypt.genSalt(10, (err, salt) => {
            if(err) throw err;
            bcrypt.hash(password, salt, async(err, encrypted) => {
                if(err) throw err;
                try {
                    const registerQuery = await db.query(`
                            INSERT INTO seller_account (
                                first_name,
                                last_name,
                                shop_name,
                                phone_number,
                                email,
                                password,
                                shop_category
                            ) VALUES (
                                $1, $2, $3, $4, $5, $6, $7

                            ) RETURNING seller_id
                    
                    `, [
                        firstName,
                        lastName,
                        shopName,
                        phoneNumber,
                        email,
                        encrypted,
                        shop_category
                    ]);
                    const token = generateToken(registerQuery.rows[0].seller_id);
                    res.send({
                        token,
                        account_type : 'seller'
                    })
                    
                } catch (error) {
                    // res.status(403).send(error.constraint);
                    console.log(error);
                    
                }
            })
        })
        
        
        
    
}

module.exports = {
    register,
    verifySeller
}