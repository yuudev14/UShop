import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutAction } from '../../reduxStore/actions/authAction';
import { resetCartAction } from '../../reduxStore/actions/cartAction';
import axios from 'axios';

const MainNav1 = (props) => {

    const {
        auth,
        logoutDispatch,
        resetCartDispatch,

    } = props;
    const socialMedia = [
        'facebook',
        'twitter',
        'instagram'
    ]


    const logout = () => {
        logoutDispatch();
    }
    const closeNav1 = () => {
        document.querySelector('.nav1').classList.remove('openNav1');
    }

    const [category, setCategory] = useState([])

    useEffect(() => {
        (async() => {
            try {
                const category = await axios.get('/ushop/categories');
                setCategory(category.data);
                
            } catch (error) {
                console.log(error);
                
            }
        })();
    }, [])

    
    return (
        <div className='nav1'>
            <ul>
                <p>follow us on:</p>
                {socialMedia.map(social => (
                    <li><i className={ `fa fa-${social}`}></i></li>
                ))}
                
            </ul>
            <ul className='nav1-list-options'>
                <Link to='/sell-UShop'><li>Sell on UShop</li></Link>
                <li className='category'>Categories
                    <ul>
                        {category.map(li => (
                            <Link to={`/category/${li.category_name}`}><li>{li.category_name}</li></Link>
                        ))}
                    </ul>
                </li>

                {auth.isAuth ? (
                    <>
                        <li onClick={logout}>log out</li>
                        <Link to='/profile'><li>profile</li></Link>
                    </>

                ) : (
                    <Link to='/auth'><li className='account_nav'>log-in | sign-up</li></Link>

                )}
            </ul>
            <i className='fa fa-close' onClick={closeNav1}></i>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth : state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logoutDispatch : () => dispatch(logoutAction()),
        resetCartDispatch : () => dispatch(resetCartAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)
                    (MainNav1)
