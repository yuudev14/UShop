import React from 'react'
import '../../styles/nav/nav.scss'
import MainNav1 from './main_nav1'
import MainNav2 from './main_nav2'

const MainNav = () => {
    
    return (
        <header>
            <nav className='main_nav'>
                <MainNav1 />
                <MainNav2 />
                

            </nav>
        </header>
    )
}

export default MainNav
