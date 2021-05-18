import React, {useState, useEffect} from 'react';
import axios from 'axios';

const SellerAddProduct = () => {
    const [addProductsForm, setAddProductsForm] = useState({
        productName : '',
        category : [],
        price : 0,
        images : [],
        status : '',
        description : '',
        sampleImages : [],
    });

    useEffect(() => {
        console.log(addProductsForm)
    }, [addProductsForm])

    const addProduct = async(e) => {
        e.preventDefault();
        console.log(addProductsForm);
        try {
            if(addProductsForm.images.length > 0){
                const preset = 'dtylx85a';
                const url = 'https://api.cloudinary.com/v1_1/yutakaki/image/upload';
                let imagesUrl = [];
                await addProductsForm.images.forEach(async(img) => {
                    const formData = new FormData();
                    formData.append('file', img);
                    formData.append('upload_preset', preset);
                    const uploadImg = await axios.post(url, formData);
                    imagesUrl.push(uploadImg.data.secure_url)
                });
                const {
                    productName,
                    category,
                    price,
                    status,
                    description

                } = addProductsForm;
                await axios.post('/sell-ushop/add-product', 
                {
                    productName,
                    category,
                    price,
                    status,
                    description,
                    images : imagesUrl
                }, 
                {headers : {token : JSON.parse(localStorage.getItem('UShop')).token}})
            }else{
                await axios.post('/sell-ushop/add-product', addProductsForm, {headers : {token : JSON.parse(localStorage.getItem('UShop')).token}})
            }
            
            
            
        } catch (error) {
            console.log(error)
            
        }
    }

    const setAddProductsFormMethod = (e) => {
        const specialKeys = ['category', 'images'];
        const key = e.target.name;
        const value = e.target.value;
        if(key === 'category'){
            setAddProductsForm({
                ...addProductsForm,
                [key] : [ ...addProductsForm[key] , value]
            });

        }else if(key === 'images'){
            if(e.target.files.length !== 0){
                setAddProductsForm({
                    ...addProductsForm,
                    [key] : [ ...addProductsForm[key] , e.target.files[0]],
                    sampleImages : [...addProductsForm.sampleImages, URL.createObjectURL(e.target.files[0])]
                });

            }
            

        }else{
            setAddProductsForm({
                ...addProductsForm,
                [key] : value
            });

        }
        
    }


    return (
        <div className='addProducts'>
            <form className='addProductsForm' onSubmit={addProduct}>
                <h1>Add Products</h1>
                <div className='inputContainer'>
                    <p>Product name</p>
                    <input onChange={setAddProductsFormMethod} name='productName' id='productName' type='text' />
                </div>
                <div className='inputContainer'>
                    <p>Category</p>
                    <select id='category' name='category' onChange={setAddProductsFormMethod}>
                        <option disabled selected value> -- select category-- </option>
                        
                    </select>
                </div>
                <div className='inputContainer'>
                    <p>Price</p>
                    <input name ='price' id='price' type='number' onChange={setAddProductsFormMethod} />
                </div>
                <div className='inputContainer'>
                    <p>Status</p>
                    <select id='productStatus' name='status' onChange={setAddProductsFormMethod}>
                        <option disabled selected value> -- select status-- </option>
                        <option value='available'>Available</option>
                        <option value='unavailable'>Unavailable</option>
                    </select>
                </div>
                <div className='inputContainer'>
                    <p>Images</p>
                    <label htmlFor='productNameImage'>
                        <i className='fa fa-plus'></i>
                    </label>
                    <input name='images' type='file' id='productNameImage' onChange={setAddProductsFormMethod}/>
                    <div className='sampleImages'>
                        {addProductsForm.sampleImages.map(img => (
                            <img src={img} />
                        ))}

                    </div>
                </div>
                <div className='inputContainer'>
                    <p >Product name</p>
                    <textarea name='description' id='productDescription' onChange={setAddProductsFormMethod}>
                    </textarea>
                </div>
                <div className='inputContainer'>
                    <p></p>
                    <input type='submit' id='submitAddProduct' />
                </div>
                
            </form>
            
        </div>
    )
}

export default SellerAddProduct
