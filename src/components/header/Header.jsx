import React from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import AppsIcon from '@mui/icons-material/Apps';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const Header = (photoURL) => {
    console.log(photoURL);
    return (
        <div className='header'>

            <div className='header_logo'>
                {/* <img src=".\images\logo.png" /> */}
                <img className='logo' src='https://1000logos.net/wp-content/uploads/2021/04/Google-Drive-logo.png' alt='logo' />
                <span>Drive</span>
            </div>
            <div className='header_search'>
                <SearchIcon />
                <input type='text' placeholder='Search in Drive' />
                <FormatAlignCenterIcon />
            </div>
            <div className='header_icons'>
                <span>
                    <HelpOutlineIcon />
                    <SettingsIcon />
                </span>
                <span>
                    <AppsIcon />
                    <AccountCircleIcon src={photoURL}/>

                </span>
            </div>
        </div>
    )
}

export default Header