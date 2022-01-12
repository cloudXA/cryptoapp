import React from 'react'
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, NumberOutlined, ThunderboltFilled, TrophyFilled, ExclamationCircleFilled, CheckOutlined } from '@ant-design/icons';


import { useGetCryptoDetailsQuery } from '../services/cryptoApi';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
    const { coinId } = useParams();

    const { data, isFetching } = useGetCryptoDetailsQuery(coinId);

    const CryptoDetails = data?.data?.coin;

    console.log(CryptoDetails, 'cry')

    const times = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

    const stats = [
        {
            title: 'Price to USD', value: `$ ${CryptoDetails?.price && millify(CryptoDetails?.price || 0)}`, icon: <DollarCircleOutlined />
        },
        {
            title: 'Rank', value: `${CryptoDetails?.rank}`, icon: <NumberOutlined />
        },
        {
            title: '24h Volume', value: `$ ${CryptoDetails?.volume && millify(CryptoDetails?.volume || 0)}`, icon: <ThunderboltFilled />
        },
        {
            title: 'market Cap', value: `$ ${CryptoDetails?.marketCap && millify(CryptoDetails?.marketCap || 0)}`, icon: <DollarCircleOutlined />
        },
        {
            title: 'All-time-high(daily avg.)', value: `$ ${millify(CryptoDetails?.allTimeHigh?.price || 0)}`, icon: <TrophyFilled />
        }
    ]

    const genericStats = [
        {
            title: 'Number of Markets', value: `${CryptoDetails?.numberOfMarkets}`, icon: <FundOutlined />
        },
        {
            title: 'Number of Exchanges', value: `${CryptoDetails?.numberOfExchanges}`, icon: <MoneyCollectOutlined />
        },
        {
            title: 'Aprroved Supply', value: `${CryptoDetails?.approvedSupply ? <CheckOutlined /> : <StopOutlined />}`, icon: <MoneyCollectOutlined />
        },
        {
            title: 'Total Supply', value: `$ ${CryptoDetails?.totalSupply}`, icon: <ExclamationCircleFilled />
        },
        {
            title: 'Circulating Supply', value: `$ ${CryptoDetails?.circulatingSupply}`, icon: <ExclamationCircleFilled />
        }
    ]

    const handleChange = (value) => {
        console.log(value.value, 'value')
    }

    return (
        <>
            <Col className='coin-detail-container'>
                <Col className='coin-heading-container'>
                    <Title level={2} className='coin-name'>
                        {CryptoDetails?.name}  Price
                    </Title>
                    <p>
                        { CryptoDetails?.name } live price in US dollars.
                        View value staticstics, markert cap and supply.
                    </p>
                </Col>
            </Col>

            {
                <Select
                    showSearch
                    labelInValue
                    defaultValue={'7d'}
                    style={{ width: 200 }}
                    onChange={handleChange}
                >
                    {
                        times?.map(time => (<Option key={time} value={time}>{time}</Option>))
                    }
                </Select>
            }
            {/* line chart  */}

            <Row justify='space-between' >
                <Col className='stats-container' lg={10} sm={24} style={{ padding: '30px'}}>
                    <Col className='coin-value-statistics'>
                        <Col className='coin-value-statistics-heading'>
                            <Title level={3} className='coin-detailed'>
                                {CryptoDetails?.name} Value Statistics 
                            </Title>
                            <p>
                                An overview showing the stats of Bitcoin
                            </p>
                        </Col>
                        {
                            stats.map(({ title, value, icon }) => (
                                <Col className='coin-stats'>    
                                    <Col className='coin-stats-name'>
                                        <Text className='coin-stats-icon'>{icon}</Text>
                                        <Text>{title}</Text>
                                    </Col>
                                    <Text className='stats'>{value}</Text>
                                </Col>
                            ))
                        }
                    </Col>
                </Col>

                <Col className='generic-stats-container' lg={10} sm={24} style={{ padding: '30px'}}>
                    <Col className='coin-value-statistics'>
                        <Col className='coin-value-statistics-heading'>
                            <Title level={3} className='coin-detailed'>
                                Other Statistics 
                            </Title>
                            <p>
                                An overview showing the stats of all cryptocurrencies
                            </p>
                        </Col>
                        {
                            genericStats?.map(({ title, value, icon }) => (
                                <Col className='coin-stats'>
                                    <Col className='coin-stats-name'>
                                        <Text className='coin-stats-icon'>{icon}</Text>
                                        <Text>{title}</Text>
                                    </Col>
                                    <Text className='stats'>{value}</Text>
                                </Col>
                            ))
                        }
                    </Col>
                </Col>

            </Row>

            <Row className='coin-desc'  justify='space-between'>
                <Col lg={10} sm={24} style={{ padding: '30px'}}>
                    <Title level={3} className='coin-details-heading'>
                        What is {CryptoDetails?.name}
                    </Title> 
                    {HTMLReactParser(CryptoDetails?.description || '')}    
                </Col>
                
                <Col className='coin-links' lg={10} sm={24} style={{ padding: '30px'}}>
                    <Title levle={3} className='coin-details-heading'>
                        {CryptoDetails?.name} Links
                    </Title>
                    {
                        CryptoDetails?.links?.map((link) => (
                            <Row className='coin-link' key={link?.name}  justify='space-between' style={{ width: '100%'}}>
                                <Title level={5} className='link-name'>
                                    {link?.type}
                                </Title>
                                <a href={link?.url} target='_blank' rel='noreferrer' style={{ color: '#29afeb'}}>
                                    {link?.name}
                                </a>
                            </Row>
                        ))
                    }
                </Col>
            </Row>
        </>
        
    )
}

export default CryptoDetails

/** 
 * 作为coins 的详情页
 * 1. 数据结构 
 *      1. time stats genericStats 作为业务渲染使用
 *          1. same one icon name price ----> [{icon,name, price}...]结构
 *          2. oher one icon name price ----> [{icon,name, price}...]结构
 *          3. 左右布局(响应式设计)
 *      2. useParams钩子获取路由参数(作为组件的入参)
 *      3. 基于入参请求ajax数据，获取新的数据
 *      4. 设计state
 *      
 * 2. UI层数据渲染
 *      1. 对获取的数据进行渲染[hight： HTMLReactParser(...)]
 *      2. 使用echart渲染
 * 
 */