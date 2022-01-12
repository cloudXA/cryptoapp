import React, { useState, useEffect } from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link, Route } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';

import icon from '../images/dogo_cryp.png';

const NavBar = () => {
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [activeMenu, setActiveMenu] = useState(false);

    useEffect(() => {
        const handleScroll = () => setInnerWidth(window.innerWidth);

        window.addEventListener('resize', (event) => {
            handleScroll();
        })

        handleScroll();

        return () => window.removeEventListener('resize', () => handleScroll())
    }, [])

    useEffect(() => {
        if(innerWidth < 768) {
            setActiveMenu(true)
        } else {
            setActiveMenu(false)
        }
    }, [innerWidth])


    return (
        <div className='nav-container' >
            <div className="logo-container">
                <Typography.Title level={2} className='logo'>
                    <Avatar src={icon} size='large' className='avatar' />
                    <Link to='/'>Crytoverse</Link>  
                    <Button className='menu-control-container' onClick={() => setActiveMenu(!activeMenu)}>
                        <MenuOutlined color='white'/>
                    </Button>
                </Typography.Title> 
                {
                    !activeMenu &&
                    <Menu theme='dark' inlineIndent={10} className='menu-container' onClick={() => setActiveMenu(true)}>
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
                }
                
            </div>
        </div>
    )
}

export default NavBar

/**
 *  响应式设计，在移动端设备，将侧边栏进行隐藏
 * 
 * 1.  思考：多少个state, 
 * 2.  01 activeMenu 是够需要折叠菜单栏
 *     02 activeMenu的计算依据来源innerWidth,所以另一个state是innerWidth
 * 
 * 2.  页面mounted的时候,监听scroll事件,借助回调函数计算出innerWidth
 * 2. 
 * 
 */
