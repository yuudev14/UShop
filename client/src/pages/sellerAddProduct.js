import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const SellerAddProduct = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [addProductsForm, setAddProductsForm] = useState({
        productName : '',
        category : '',
        price : null,
        images : [],
        description : '',
        stock : null,
        sampleImages : [],
    });

    const addImageLogo = useRef();

    const history = useHistory();

    const categoryList = [
        'Appliances',
        'Apps & Games',
        'Arts, Crafts, & Sewing',
        'Automotive Parts & Accessories',
        'Baby',
        'Beauty & Personal Care',
        'Books',
        'CDs & Vinyl',
        'Cell Phones & Accessories',
        'Clothing, Shoes and Jewelry',
        'Collectibles & Fine Art',
        'Computers',
        'Electronics',
        'Garden & Outdoor',
        'Grocery & Gourmet Food',
        'Handmade',
        'Health, Household & Baby Care',
        'Home & Kitchen',
        'Industrial & Scientific',
        'Kindle',
        'Luggage & Travel Gear',
        'Movies & TV',
        'Musical Instruments',
        'Office Products',
        'Pet Supplies',
        'Sports & Outdoors',
        'Tools & Home Improvement',
        'Toys & Games',
        'Video Games',
    ]


    const checkError = () => {
        let errors = 0;
        const inputListsCheck = ['productName', 'price', 'stock', 'category'];

        inputListsCheck.forEach(input => {
            const value = addProductsForm[input]
            if(value === '' || value === null){
                document.querySelector(`.addProducts #${input}`).classList.add('error')
                errors++;
            }
        })
        if(addProductsForm.images.length === 0){
            addImageLogo.current.classList.add('error');
            errors++;
        }
        return errors;

    }

    const addProduct = (e) => {
        e.preventDefault();
        if(!checkError()){
            setIsLoading(true);
            const preset = 'kopfy1vm';
            const url = 'https://api.cloudinary.com/v1_1/yutakaki/image/upload';
            try {
                let newImages = [];
                addProductsForm.images.forEach(async(img, i) => {
                    const formData = new FormData();
                    formData.append('file', img);
                    formData.append('upload_preset', preset);
                    const uploadImg = await axios.post(url, formData);
                    newImages.push(uploadImg.data.secure_url);
                    if(newImages.length === addProductsForm.images.length){
                        await axios.post('/sell-ushop/add-product', {...addProductsForm, newImages}, {headers : {token : JSON.parse(localStorage.getItem('UShop')).token}})
                        history.push('/sell-UShop');
                    }
                })  

            } catch (error) {
                console.log(error);
            }
        }   
    }

    const setAddProductsFormMethod = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        if(key === 'images'){
            if(e.target.files.length !== 0){
                const reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onload = () => {
                    setAddProductsForm({
                        ...addProductsForm,
                        [key] : [ ...addProductsForm[key] , reader.result],
                        sampleImages : [...addProductsForm.sampleImages, URL.createObjectURL(e.target.files[0])]
                    });
                }
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
            <form className={`addProductsForm ${isLoading ? 'isLoading' : ''}`} onSubmit={addProduct}>
                <p className='isLoadingTag'>wait for a moment...</p>
                <h1>Add Products</h1>
                <div className='inputContainer'>
                    <p>Product name</p>
                    <input onChange={setAddProductsFormMethod} name='productName' id='productName' type='text'/>
                </div>
                <div className='inputContainer'>
                    <p>Category</p>
                    <select id='category' name='category' onChange={setAddProductsFormMethod}>
                        <option disabled selected value> -- select category-- </option>
                        {categoryList.map(category => (
                            <option value={category}>{category}</option>
                        ))}
                        
                    </select>
                </div>
                <div className='inputContainer'>
                    <p>Price</p>
                    <input name ='price' id='price' type='number' onChange={setAddProductsFormMethod} />
                </div>
                <div className='inputContainer'>
                    <p>Stock</p>
                    <input name ='stock' id='stock' type='number' onChange={setAddProductsFormMethod} />
                </div>
                <div className='inputContainer'>
                    <p>Images</p>
                    <label htmlFor='productNameImage' ref={addImageLogo}>
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
                    <p>Description</p>
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
