import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { filterProductsAction } from '../../reduxStore/actions/sellerAction';

const SellerViewForm = (props) => {

    const {
        filterProductsDispatch
    } = props;

    const data = require('../../json/categories.json');

    const [searchForm, setSearchForm] = useState({
        productName : '',
        category : '',
        minStock : "FLOAT8 '-infinity'",
        maxStock : "FLOAT8 '+infinity'",
        minPrice : "FLOAT8 '-infinity'",
        maxPrice : "FLOAT8 '+infinity'",
    });

    const setSearchFormMethod = (e) => {
        let value = e.target.value;
        const name = e.target.name;
        const minKeyName = ['minStock', 'minPrice'];
        const maxKeyName = ['maxStock', 'maxPrice'];
        if(minKeyName.includes(name)){
            if(value === ''){
                value = "FLOAT8 '-infinity'"
            }
        }

        if(maxKeyName.includes(name)){
            if(value === ''){
                value = "FLOAT8 '+infinity'"
            }
        }

        setSearchForm({
            ...searchForm,
            [name] : value
        })
    }

    const search = async(e) => {
        e.preventDefault();
        filterProductsDispatch(searchForm);

    }

    const resetForm = () => {
        setSearchForm({
            productName : '',
            category : '',
            minStock : "FLOAT8 '-infinity'",
            maxStock : "FLOAT8 '+infinity'",
            minPrice : "FLOAT8 '-infinity'",
            maxPrice : "FLOAT8 '+infinity'",
        })

    }
    return (
        <form className='filter' onSubmit={search}>
            <div className='filterInputContainer'>
                <div className='filterSearchProduct'>
                    <label htmlFor='productName'>Product Name</label>
                    <input id='productName' type='text' value={searchForm.productName} name='productName' onChange={setSearchFormMethod}/>
                </div>
                <div className='filterProductCategory'>
                    <label htmlFor='category'>Category</label>
                    <select id='category' value={searchForm.category} name='category' onChange={setSearchFormMethod}>
                        <option disabled value='' selected>--- select categories ---</option>
                        {data.categories.map(cat => (
                            <option val={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div className='filterSearchStock'>
                    <label>Stock</label>
                    <input type='number' value={searchForm.minStock} placeholder='min' name='minStock' onChange={setSearchFormMethod}/>
                        - 
                    <input type='number' value={searchForm.maxStock} placeholder='max' name='maxStock' onChange={setSearchFormMethod}/>
                </div>
                <div className='filterSearchPrice'>
                    <label>Price</label>
                    <input type='number' value={searchForm.minPrice} placeholder='min' name='minPrice' onChange={setSearchFormMethod}/>
                        - 
                    <input type='number' value={searchForm.maxPrice} placeholder='max' name='maxPrice' onChange={setSearchFormMethod}/>
                </div>
            </div>
            <div className='filterButtonContainer'>
                <input type='submit'/>
                <button onClick={resetForm}>Reset</button>
            </div>

        </form>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        filterProductsDispatch : (data) => dispatch(filterProductsAction(data))
    }
}

export default connect(null, mapDispatchToProps)
                (SellerViewForm)
