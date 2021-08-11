const db = require('../../db');
const bcrypt = require('bcrypt');
const generateToken = require('../../utils/generateToken');

const verifyAccount = (req, res) => {
    res.send(true);
}


const login = async(req, res) => {
    const {
        email,
        password
    } = req.body;

    try {
        const account = await db.query(`
                SELECT * FROM account
                WHERE email = $1
            `, [
                email
            ]
        )
        if(account.rowCount){
            bcrypt.compare(password, account.rows[0].password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch){
                    const token = generateToken(account.rows[0].user_id);
                    res.send({
                        token,
                    })
                }else{
                    res.status(404).send({passwordError : 'Password is incorrect'});
                }
            })

        }else{
            res.status(402).send({emailError : 'email does not exist'});
        }

        
        
    } catch (error) {
        console.log(error);
        
    }
}

const register = async(req, res) => {
    
        const {
            firstName,
            lastName,
            phoneNumber,
            email,
            password,
            retryPassword
        } = req.body;

        let errors = {
            emailError: '',
            phone_number_error : '',
            passwordError : '',
            retryPasswordError : '',
        }

        try {
            const checkPhoneNumber = await db.query(
                `SELECT * FROM account
                WHERE phone_number = $1
                `, [phoneNumber]
            )

            const checkEmail = await db.query(
                `SELECT * FROM account
                WHERE email = $1
                `, [email]
            )

            if(password.length < 7){
                errors.passwordError = 'password should be longer than 7'

            }
            if(password !== retryPassword){
                errors.retryPasswordError = 'password does not match'

            }
            if(checkEmail.rowCount > 0){
                errors.emailError = 'email already exist'

            }
            if(checkPhoneNumber.rowCount > 0){
                errors.phone_number_error = 'number already exist'

            }
            if(Object.values(errors).every(err => err === '')){
                bcrypt.genSalt(10, (err, salt) => {
                    if(err) throw err;
                    bcrypt.hash(password, salt, async(err, encrypted) => {
                        if(err) throw err;
                        try {
                            const registerQuery = await db.query(`
                                    INSERT INTO account (
                                        first_name,
                                        last_name,
                                        phone_number,
                                        email,
                                        password
                                    ) VALUES (
                                        $1, $2, $3, $4, $5
        
                                    ) RETURNING user_id
                            
                            `, [
                                firstName,
                                lastName,
                                phoneNumber,
                                email,
                                encrypted,
                            ]);
                            const token = generateToken(registerQuery.rows[0].user_id);
                            res.send({
                                token,
                            })
                            
                        } catch (error) {
                            console.log(error);
                        }
                    })
                })

            }else{
                res.status(403).send(errors)
            }
            
        } catch (error) {
            
        }

        
        
        
        
    
}

module.exports = {
    register,
    verifyAccount,
    login,
}