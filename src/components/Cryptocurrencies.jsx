import React, { useState, useEffect } from 'react'
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import millify from 'millify';

const Cryptocurrencies = ({ simplified }) => {
    const count = simplified ? 10 : 100;
    const { data, isFetching } = useGetCryptosQuery(count);
    console.log(data, 'data')
    
    const [search, setSearch] = useState('');
    const [cryptos, setCryPtos] = useState(data?.data?.coins);
  

    const searchCrypto = (event) => {
        setSearch(event.target.value);
    }

    
    useEffect(() => {
        const filteredData = data?.data?.coins?.filter(coin => coin?.name?.toLowerCase()?.includes(search?.toLowerCase()));
        setCryPtos(filteredData);
    }, [search])

    if(isFetching) return 'Loading...';

    return (
        <>
            { !simplified && <Input onPressEnter={searchCrypto} placeholder='search cryptocurriencs' size='middle' allowClear />}
            <Row gutter={[30, 30]} className='crypto-card-container' style={{ marginRight: 0}}>
                {cryptos?.map((currency) => (
                    <Col className="crypto-card" key={currency.uuid} xs={24} sm={12} lg={6} style={{ marginRight: 0, marginLeft: 0}}>
                        <Link to={`/crypto/${currency.uuid}`}>
                            <Card
                                title={`${currency.rank}. ${currency.name}`}
                                extra={<img className='crypto-img' src={currency.iconUrl} width={30} height={30} />}
                                hoverable
                            >
                                <p>Price: {millify(currency.price)}</p>
                                <p>Market Cap: {millify(currency.marketCap)}</p>
                                <p>Daily Change: {millify(currency.change)}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Cryptocurrencies


/**
 * 设计组件思路：
 * 1. 将请求的数据作为useState的初始值(请求的数据异步获取的...)
 * 2. 将state的初始值用作初始渲染ui
 * 3. 接受props--> simplified作为参数,对state状态做出改变
 * 4. 新增search,动态改变(enter改变) ---- 改变本地state状态值
 * 
 */