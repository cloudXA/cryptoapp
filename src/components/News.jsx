import { Row, Col, Card, Select, Typography, Avatar } from 'antd';
import React, { useState } from 'react'
import { useGetCryptosNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
import demoImage from '../images/demo.jpg';
import moment from 'moment';

const { Text, Title } = Typography;
const { Option } = Select;


const News = ({ simplified }) => {
    const [newsCategory, setNewsCategory] = useState('Bitcoin')
    const { data: cryptoNews } = useGetCryptosNewsQuery({ newsCategory: newsCategory, count: simplified ? 10 : 100})
    const { data, isFetching } = useGetCryptosQuery(100);


    if(!cryptoNews?.value) return 'Loading...'

    const handleChange = (value) => {
        setNewsCategory(value.value);
    }

    return (
        <>
            { 
                !simplified &&  
                <Select
                    showSearch
                    labelInValue
                    placeholder='select news category'
                    style={{ width: 200 }}
                    onChange={handleChange}
                    defaultValue={newsCategory}
                >
                    <Option value="Cryptocurrency">Cryptocurrency</Option>
                    {
                        data?.data?.coins?.map(coin => coin.name)?.map(name => (<Option key={name} value={name}>{name}</Option>))
                    }
                </Select>
            }
            <Row gutter={[12, 12]}>
                {
                    cryptoNews?.value?.map((news, i) => (
                        <Col xs={24} sm={12} lg={8} key={i} >
                            <Card hoverable className='news-card'>
                                <a href={news.url} target="_blank" rel='noreferrer'>
                                    <div className="news-image-container">
                                        <Title className='news-title' level={4}>{news.name}</Title>
                                        <img src={news?.image?.thumbnail?.contentUrl || demoImage } alt="" width='100px' height='100px' />
                                    </div>
                                    <p>
                                        {
                                            news.description > 100 
                                                ? `${news.description.substring(0, 100)}...`
                                                : news.description
                                        }
                                    </p>
                                    <div className='provider-container'>
                                        <div>
                                            <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl} alt='news'></Avatar>
                                            <Text className='provider-name'>{news.provider[0]?.name}</Text>
                                        </div>
                                        <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                                    </div>
                                </a>
                            </Card>
                        </Col>
                    ))
                }
                
            </Row>
        </>
    )
}

export default News


/**
 * 1. 组件接受的props,根据props声明计算属性
 * 2. 根据计算属性作为请求接口入参，请求数据
 * 3. 直接渲染数据在UI层
 * 4. show detail展示更多
 * 5. 新增下拉search, 数据双向绑定,需要的数据有：
 *  1. 默认的数据源
 *  2. 下拉需要展示的数据源
 *  3. 选中下拉条获取选中的数据源，选中的数据源作为获取api的入参传递给hooks ===[select可选、]
 *  4. api获取的数据重新渲染UI层
 *  5. ---- TODO: 保证数据为空的样式优化、自适应布局、多端展示 ------
 * 
 * 6. 请求接口数据，并渲染在UI层
 */