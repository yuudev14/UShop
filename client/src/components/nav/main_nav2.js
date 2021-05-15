import React from 'react';
import { Link } from 'react-router-dom';

const MainNav2 = () => {
    
    return (
        <div className='nav2'>
            <Link to='/'><h1>UShop</h1></Link>
            <form>
                <label>
                    <input type='search' />
                    <i className='fa fa-search'></i>
                </label>
            </form>
            <i class="fa fa-shopping-cart"></i>

        </div>
    )
}

export default MainNav2
