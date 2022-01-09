import React from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link, Route } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';

import icon from '../images/dogo_cryp.png';

const NavBar = () => {
    return (
        <div className='nav-container' >
            <div className="logo-container">
                <Typography.Title level={2} className='logo'>
                    <Avatar src={icon} size='large' />
                    <Link to='/'>Crytoverse</Link>  
                </Typography.Title> 

                <Menu theme='dark' inlineIndent={10} style={{ height: '100vh'}}>
                    <Menu.Item icon={<HomeOutlined />}>
                        <Link to='/'>Home</Link>
                    </Menu.Item>
                    <Menu.Item icon={<FundOutlined />}>
                        <Link to='/cryptocurrencies'>cryptocurrencies</Link>
                    </Menu.Item>
                    <Menu.Item icon={<MoneyCollectOutlined />}>
                        <Link to='/exchange'>Exchanges</Link>
                    </Menu.Item>
                    <Menu.Item icon={<BulbOutlined />}>
                        <Link to='/news'>News</Link>
                    </Menu.Item>
                </Menu>
                {/* <button onClick={handleClick}>click</button> */}
            </div>
        </div>
    )
}

export default NavBar
