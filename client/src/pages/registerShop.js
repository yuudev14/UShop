import React, {useState} from 'react';
import '../styles/registerShop.scss';
import { useDispatch } from 'react-redux';
import { registerShopAction } from '../reduxStore/actions/sellerAction';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const RegisterShop = () => {

    const dispatch = useDispatch()

    const [shopInfo, setShopInfo] = useState({
        email : '',
        shop_name : '',
        images : '',
        sampleImages : '',
        aboutShop : ''
    });
    const errorsObject = {
        emailError: '',
        shop_name_error : '',
        blanksError : '',
    }

    const [errors, setErrors] = useState(errorsObject)

    const history = useHistory();

    const setShopInfoMethod = (e) => {
        if(e.target.name !== 'images'){
            setShopInfo({
                ...shopInfo,
                [e.target.name] : e.target.value
        
            })
        }else{
            if(e.target.files.length !== 0){
                const reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onload = () => {
                    setShopInfo({
                        ...shopInfo,
                        [e.target.name] : reader.result,
                        sampleImages : URL.createObjectURL(e.target.files[0])
                    });
                }
            }
        }
    }

    const checkForm = () => {
        const importantFields = ['shop_name', 'email', 'images'];
        const errors = importantFields.filter(field => shopInfo[field] === '');
        return errors
    }

    const putErrorBorder = (fields) => {
        document.querySelectorAll('.registerShop input').forEach(inp => {
            if(fields.includes(inp.name)){
                inp.classList.add('error')
            }else{
                inp.classList.remove('error')

            }
        });

        const label = document.querySelector('.registerShop label');

        if(shopInfo.images === ''){
            label.classList.add('error');

        }else{
            if(label){
                label.classList.remove('error')
            }
        }

        



    }

    const registerShop = async(e) => {
        e.preventDefault();
        
        if(checkForm().length === 0){
            
            const preset = 'kopfy1vm';
            const url = 'https://api.cloudinary.com/v1_1/yutakaki/image/upload';
            try {
                const formData = new FormData();
                formData.append('file', shopInfo.images);
                formData.append('upload_preset', preset);
                const uploadImg = await axios.post(url, formData);
                await dispatch(registerShopAction({...shopInfo, images: uploadImg.data.secure_url}));
                history.push('/sell-UShop') 
                
            } catch (error) {
                setErrors({
                    ...errorsObject,
                    ...error.data
                });
                
            }

        }else{
            setErrors({
                ...errorsObject,
                blanksError : 'fill up the fields'
            });
        

        }
        putErrorBorder(checkForm());
        
        
    }
    return (
        <div className='registerShop'>
            <form onSubmit={registerShop}>
                <h1>Register Shop</h1>
                <p className='errorInfo'>{errors.blanksError}</p>
                <div className='inputContainer'>
                    <p>Email</p>
                    <div className='inputAndError'>
                        <input 
                            type='email' 
                            name='email'
                            placeholder='Email'
                            value={shopInfo.email}
                            onChange={setShopInfoMethod}
                            className={errors.emailError !== '' && 'error2'}
                            />
                        <p className='errorInfo'>{errors.emailError}</p>

                    </div>
                    
                    
                </div>
                

                <div className='inputContainer'>
                    <p>Shop name</p>
                    <div className='inputAndError'>
                        <input 
                            type='text' 
                            name='shop_name'
                            placeholder='shop name'
                            value={shopInfo.shop_name}
                            onChange={setShopInfoMethod}
                            className={errors.shop_name_error !== '' && 'error2'}
                            />
                        <p className='errorInfo'>{errors.shop_name_error}</p>

                    </div>
                    

                </div>
                <div className='inputContainer'>
                    <p>Logo</p>
                    <label htmlFor='productNameImage' >
                        <i className='fa fa-plus'></i>
                    </label>
                    <input name='images' type='file' id='productNameImage' onChange={setShopInfoMethod}/>
                    <div className='sampleImages'>
                        {shopInfo.sampleImages !== '' && (
                            <img src={shopInfo.sampleImages} />
                        )}
                    </div>
                </div>

                <div className='inputContainer'>
                    <p>About shop</p>
                    <textarea name='aboutShop' id='aboutShop' onChange={setShopInfoMethod}>
                    </textarea>
                </div>
                
                
                <input type='submit' />
                
            </form>
            
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        registerShopDispatch : (data) => dispatch(registerShopAction(data))
    }
}
export default RegisterShop;
